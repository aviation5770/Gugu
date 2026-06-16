"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { createAdminClient, createClient } from "@/utils/supabase/server";

type ActionResult<T = undefined> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: string;
    };

interface TeacherSignupInput {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface TeacherLoginInput {
  email: string;
  password: string;
}

interface TeacherProfileInput {
  name: string;
  email: string;
  profileImageUrl?: string;
}

interface PasswordResetInput {
  email: string;
}

interface StudentCodeInput {
  code: string;
}

interface StudentLoginInput {
  code: string;
  classNumber: string;
  birthDate: string;
}

interface TeacherSession {
  id: string;
  email: string | null;
  name: string;
  profileImageUrl?: string | null;
}

interface ClassSummary {
  id: string;
  className: string;
  classCode: string;
  studentCount: number;
}

interface StudentSession {
  id: string;
  classId: string;
  className: string;
  classCode: string;
  studentNumber: number;
  classNumber: string;
}

type ClassRow = {
  id: string;
  class_name: string | null;
  class_code: string | null;
  student_count: number | null;
};

type StudentRow = {
  id: string;
  class_id: string;
  student_number: number | null;
  birth_date: string | null;
};

type TeacherProfileRow = {
  name: string;
  email: string;
  profile_image_url: string | null;
};

const STUDENT_SESSION_COOKIE = "gugu_student_session";

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "요청을 처리하지 못했습니다.";
}

function normalizeRequiredText(value: string, fieldName: string) {
  const trimmed = value.trim();

  if (!trimmed) {
    throw new Error(`${fieldName}을(를) 입력해 주세요.`);
  }

  return trimmed;
}

function normalizeClassCode(code: string) {
  return normalizeRequiredText(code, "수업 코드").toUpperCase();
}

function normalizeBirthDate(birthDate: string) {
  const digits = normalizeRequiredText(birthDate, "생년월일").replace(/\D/g, "");

  if (digits.length !== 6 && digits.length !== 8) {
    throw new Error("생년월일은 6자리 또는 8자리 숫자로 입력해 주세요.");
  }

  return digits.length === 8 ? digits.slice(2) : digits;
}

function parseStudentNumber(classNumber: string) {
  const digits = normalizeRequiredText(classNumber, "학반번호").replace(/\D/g, "");

  if (!digits) {
    throw new Error("학반번호는 숫자로 입력해 주세요.");
  }

  const studentNumberText = digits.length > 2 ? digits.slice(-2) : digits;
  const studentNumber = Number.parseInt(studentNumberText, 10);

  if (!Number.isInteger(studentNumber) || studentNumber < 1) {
    throw new Error("올바른 학반번호를 입력해 주세요.");
  }

  return { classNumber: digits, studentNumber };
}

function toClassSummary(classRow: ClassRow): ClassSummary {
  return {
    id: classRow.id,
    className: classRow.class_name ?? "이름 없는 수업",
    classCode: classRow.class_code ?? "",
    studentCount: classRow.student_count ?? 0,
  };
}

async function getWritableClient() {
  if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return createAdminClient();
  }

  return createClient();
}

async function upsertTeacherProfile({
  id,
  email,
  name,
  profileImageUrl,
}: {
  id: string;
  email: string;
  name: string;
  profileImageUrl?: string | null;
}) {
  const db = await getWritableClient();
  const { error } = await db.from("teachers").upsert(
    {
      id,
      email,
      name,
      profile_image_url: profileImageUrl ?? null,
    },
    { onConflict: "id" },
  );

  if (error) {
    throw new Error(`선생님 정보 저장 실패: ${error.message}`);
  }
}

async function findClassByCode(code: string) {
  const supabase = await getWritableClient();
  const normalizedCode = normalizeClassCode(code);
  const { data, error } = await supabase
    .from("classes")
    .select("id, class_name, class_code, student_count")
    .ilike("class_code", normalizedCode)
    .maybeSingle<ClassRow>();

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error("수업 코드를 찾을 수 없습니다.");
  }

  return data;
}

export async function teacherSignupAction({
  name,
  email,
  password,
  confirmPassword,
}: TeacherSignupInput): Promise<ActionResult<TeacherSession>> {
  try {
    const normalizedName = normalizeRequiredText(name, "이름");
    const normalizedEmail = normalizeRequiredText(
      email,
      "이메일",
    ).toLowerCase();
    const normalizedPassword = normalizeRequiredText(password, "비밀번호");

    if (normalizedPassword !== confirmPassword) {
      throw new Error("비밀번호가 일치하지 않습니다.");
    }

    const supabase = await getWritableClient();

    // [1단계] Supabase Auth(인증 시스템)에 계정 생성
    const { data, error } = await supabase.auth.signUp({
      email: normalizedEmail,
      password: normalizedPassword,
      options: {
        data: {
          name: normalizedName,
          role: "teacher",
        },
      },
    });

    if (error) {
      throw new Error(error.message);
    }

    if (!data.user) {
      throw new Error("회원가입 결과를 확인할 수 없습니다.");
    }

    await upsertTeacherProfile({
      id: data.user.id,
      email: normalizedEmail,
      name: normalizedName,
    });

    return {
      success: true,
      data: {
        id: data.user.id,
        email: data.user.email ?? null,
        name: normalizedName,
      },
    };
  } catch (error) {
    return { success: false, error: getErrorMessage(error) };
  }
}

export async function teacherLoginAction({
  email,
  password,
}: TeacherLoginInput): Promise<ActionResult<TeacherSession>> {
  try {
    const normalizedEmail = normalizeRequiredText(email, "이메일").toLowerCase();
    const normalizedPassword = normalizeRequiredText(password, "비밀번호");
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: normalizedEmail,
      password: normalizedPassword,
    });

    if (error) {
      throw new Error(error.message);
    }

    if (!data.user) {
      throw new Error("로그인 정보를 확인할 수 없습니다.");
    }

    revalidatePath("/teacher/dashboard");

    const { data: profile } = await supabase
      .from("teachers")
      .select("name, email, profile_image_url")
      .eq("id", data.user.id)
      .maybeSingle<TeacherProfileRow>();

    return {
      success: true,
      data: {
        id: data.user.id,
        email: profile?.email ?? data.user.email ?? null,
        name: profile?.name ?? String(data.user.user_metadata?.name ?? ""),
        profileImageUrl: profile?.profile_image_url ?? null,
      },
    };
  } catch (error) {
    return { success: false, error: getErrorMessage(error) };
  }
}

export async function teacherLogoutAction(): Promise<ActionResult<null>> {
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw new Error(error.message);
    }

    revalidatePath("/teacher/dashboard");

    return { success: true, data: null };
  } catch (error) {
    return { success: false, error: getErrorMessage(error) };
  }
}

export async function requestTeacherPasswordResetAction({
  email,
}: PasswordResetInput): Promise<ActionResult<null>> {
  try {
    const normalizedEmail = normalizeRequiredText(email, "이메일").toLowerCase();
    const supabase = await createClient();
    const redirectTo = `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/login/teacher`;
    const { error } = await supabase.auth.resetPasswordForEmail(normalizedEmail, {
      redirectTo,
    });

    if (error) {
      throw new Error(error.message);
    }

    return { success: true, data: null };
  } catch (error) {
    return { success: false, error: getErrorMessage(error) };
  }
}

export async function updateTeacherProfileAction({
  name,
  email,
  profileImageUrl,
}: TeacherProfileInput): Promise<ActionResult<TeacherSession>> {
  try {
    const normalizedName = normalizeRequiredText(name, "이름");
    const normalizedEmail = normalizeRequiredText(email, "이메일").toLowerCase();
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();

    if (error) {
      throw new Error(error.message);
    }

    if (!data.user) {
      throw new Error("로그인이 필요합니다.");
    }

    if (data.user.email !== normalizedEmail) {
      const { error: updateEmailError } = await supabase.auth.updateUser({
        email: normalizedEmail,
      });

      if (updateEmailError) {
        throw new Error(updateEmailError.message);
      }
    }

    await upsertTeacherProfile({
      id: data.user.id,
      email: normalizedEmail,
      name: normalizedName,
      profileImageUrl: profileImageUrl?.trim() || null,
    });

    revalidatePath("/teacher/home");
    revalidatePath("/teacher/dashboard");

    return {
      success: true,
      data: {
        id: data.user.id,
        email: normalizedEmail,
        name: normalizedName,
        profileImageUrl: profileImageUrl?.trim() || null,
      },
    };
  } catch (error) {
    return { success: false, error: getErrorMessage(error) };
  }
}

export async function deleteTeacherAccountAction(): Promise<ActionResult<null>> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();

    if (error) {
      throw new Error(error.message);
    }

    if (!data.user) {
      throw new Error("로그인이 필요합니다.");
    }

    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error("계정 삭제에는 SUPABASE_SERVICE_ROLE_KEY 환경 변수가 필요합니다.");
    }

    const admin = await createAdminClient();
    const { error: profileError } = await admin
      .from("teachers")
      .delete()
      .eq("id", data.user.id);

    if (profileError) {
      throw new Error(profileError.message);
    }

    const { error: deleteUserError } = await admin.auth.admin.deleteUser(data.user.id);

    if (deleteUserError) {
      throw new Error(deleteUserError.message);
    }

    await supabase.auth.signOut();
    revalidatePath("/");

    return { success: true, data: null };
  } catch (error) {
    return { success: false, error: getErrorMessage(error) };
  }
}

export async function getTeacherSessionAction(): Promise<ActionResult<TeacherSession | null>> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();

    if (error) {
      throw new Error(error.message);
    }

    if (!data.user) {
      return { success: true, data: null };
    }

    const { data: profile } = await supabase
      .from("teachers")
      .select("name, email, profile_image_url")
      .eq("id", data.user.id)
      .maybeSingle<TeacherProfileRow>();

    return {
      success: true,
      data: {
        id: data.user.id,
        email: profile?.email ?? data.user.email ?? null,
        name: profile?.name ?? String(data.user.user_metadata?.name ?? ""),
        profileImageUrl: profile?.profile_image_url ?? null,
      },
    };
  } catch (error) {
    return { success: false, error: getErrorMessage(error) };
  }
}

export async function verifyStudentClassCodeAction({
  code,
}: StudentCodeInput): Promise<ActionResult<ClassSummary>> {
  try {
    const classRow = await findClassByCode(code);

    return {
      success: true,
      data: toClassSummary(classRow),
    };
  } catch (error) {
    return { success: false, error: getErrorMessage(error) };
  }
}

export async function studentLoginAction({
  code,
  classNumber,
  birthDate,
}: StudentLoginInput): Promise<ActionResult<StudentSession>> {
  try {
    const classRow = await findClassByCode(code);
    const { studentNumber, classNumber: normalizedClassNumber } = parseStudentNumber(classNumber);
    const normalizedBirthDate = normalizeBirthDate(birthDate);
    const supabase = await createClient();
    const { data: student, error } = await supabase
      .from("students")
      .select("id, class_id, student_number, birth_date")
      .eq("class_id", classRow.id)
      .eq("student_number", studentNumber)
      .maybeSingle<StudentRow>();

    if (error) {
      throw new Error(error.message);
    }

    if (!student) {
      throw new Error("해당 수업에서 학생 번호를 찾을 수 없습니다.");
    }

    const savedBirthDate = student.birth_date ? normalizeBirthDate(student.birth_date) : null;

    if (savedBirthDate && savedBirthDate !== normalizedBirthDate) {
      throw new Error("생년월일이 일치하지 않습니다.");
    }

    if (!savedBirthDate) {
      const { error: updateError } = await supabase
        .from("students")
        .update({ birth_date: normalizedBirthDate })
        .eq("id", student.id);

      if (updateError) {
        throw new Error(updateError.message);
      }
    }

    const session: StudentSession = {
      id: student.id,
      classId: classRow.id,
      className: classRow.class_name ?? "이름 없는 수업",
      classCode: classRow.class_code ?? normalizeClassCode(code),
      studentNumber,
      classNumber: normalizedClassNumber,
    };
    const cookieStore = await cookies();

    cookieStore.set(STUDENT_SESSION_COOKIE, encodeURIComponent(JSON.stringify(session)), {
      httpOnly: true,
      maxAge: 60 * 60 * 6,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    revalidatePath("/student/play");
    revalidatePath("/student/ranking");

    return { success: true, data: session };
  } catch (error) {
    return { success: false, error: getErrorMessage(error) };
  }
}

export async function getStudentSessionAction(): Promise<ActionResult<StudentSession | null>> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(STUDENT_SESSION_COOKIE)?.value;

    if (!sessionCookie) {
      return { success: true, data: null };
    }

    return {
      success: true,
      data: JSON.parse(decodeURIComponent(sessionCookie)) as StudentSession,
    };
  } catch (error) {
    return { success: false, error: getErrorMessage(error) };
  }
}

export async function studentLogoutAction(): Promise<ActionResult<null>> {
  try {
    const cookieStore = await cookies();
    cookieStore.delete(STUDENT_SESSION_COOKIE);
    revalidatePath("/student/play");
    revalidatePath("/student/ranking");

    return { success: true, data: null };
  } catch (error) {
    return { success: false, error: getErrorMessage(error) };
  }
}
