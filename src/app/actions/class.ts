"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";
import type {
  TeacherClass,
  TeacherScheduleEvent,
  TeacherStudent,
} from "@/app/(teacher)/_data/mockTeacher";

type ActionResult<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: string;
    };

type ClassRow = {
  id: string;
  class_name: string;
  class_code: string;
  created_at: string;
  student_count: number;
  teacher_id: string | null;
};

type StudentRow = {
  id: string;
  class_id: string;
  created_at: string;
  student_number: number;
  birth_date: string | null;
};

type CreateClassInput = {
  className: string;
  studentCount: number;
};

type UpdateClassNameInput = {
  classId: string;
  className: string;
};

type AddStudentInput = {
  classId: string;
};

type UpdateStudentInput = {
  studentId: string;
  birthDate: string;
};

export type TeacherWorkspace = {
  classes: TeacherClass[];
  students: TeacherStudent[];
  events: TeacherScheduleEvent[];
};

const CLASS_THEME_COLORS = [
  "#083B4D",
  "#60C43E",
  "#FA4541",
  "#9145D4",
  "#FFD165",
  "#EF466E",
];

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

function safePositiveInteger(value: number, fallback: number) {
  if (!Number.isInteger(value) || value < 1) {
    return fallback;
  }

  return value;
}

function createClassCode() {
  const suffix = Math.floor(1000 + Math.random() * 9000);

  return `GG-${suffix}`;
}

function getBirthdayPassword(birthDate: string | null) {
  if (!birthDate) {
    return "";
  }

  const monthDayMatch = birthDate.match(/(?:^|\D)(\d{1,2})\D+(\d{1,2})(?:\D|$)/);

  if (monthDayMatch) {
    return `${monthDayMatch[1].padStart(2, "0")}${monthDayMatch[2].padStart(2, "0")}`;
  }

  const digits = birthDate.replace(/\D/g, "");

  if (digits.length >= 4) {
    return digits.slice(-4);
  }

  if (digits.length === 3) {
    return `0${digits}`;
  }

  return digits;
}

function extractGradeRoom(className: string) {
  const match = className.match(/(\d+)\D+(\d+)/);

  return {
    grade: match ? Number.parseInt(match[1], 10) : 0,
    room: match ? Number.parseInt(match[2], 10) : 0,
  };
}

function colorForId(id: string, offset = 0) {
  const seed = id.split("").reduce((sum, char) => sum + char.charCodeAt(0), offset);

  return CLASS_THEME_COLORS[seed % CLASS_THEME_COLORS.length];
}

function toTeacherClass(row: ClassRow): TeacherClass {
  const { grade, room } = extractGradeRoom(row.class_name);

  return {
    id: row.id,
    class_name: row.class_name,
    grade,
    room,
    teacher_name: "구구쌤",
    class_code: row.class_code,
    student_count: row.student_count,
    todo_alert: "캘린더에서 다음 시험 일정을 등록해 주세요",
    profile_color: colorForId(row.id),
    header_color: colorForId(row.id, 2),
    description: `${row.class_name} 클래스입니다. 학생 번호와 생일 기반 비밀번호로 로그인할 수 있습니다.`,
    created_at: row.created_at.slice(0, 10),
  };
}

function toTeacherStudent(row: StudentRow): TeacherStudent {
  return {
    id: row.id,
    class_id: row.class_id,
    student_number: row.student_number,
    name: `${row.student_number}번 학생`,
    birth_date: row.birth_date ?? "",
    password: getBirthdayPassword(row.birth_date),
    memo: "",
    accuracy: 0,
    best_time: 0,
    solved_count: 0,
  };
}

async function getTeacherId() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }

  if (!data.user) {
    throw new Error("교사 로그인이 필요합니다.");
  }

  return { supabase, teacherId: data.user.id };
}

async function assertTeacherOwnsClass(classId: string) {
  const { supabase, teacherId } = await getTeacherId();
  const { data: classRow, error } = await supabase
    .from("classes")
    .select("id, class_name, class_code, created_at, student_count, teacher_id")
    .eq("id", classId)
    .eq("teacher_id", teacherId)
    .maybeSingle<ClassRow>();

  if (error) {
    throw new Error(error.message);
  }

  if (!classRow) {
    throw new Error("수업을 찾을 수 없습니다.");
  }

  return { supabase, teacherId, classRow };
}

export async function loadTeacherWorkspaceAction(): Promise<ActionResult<TeacherWorkspace>> {
  try {
    const { supabase, teacherId } = await getTeacherId();
    const { data: classRows, error: classError } = await supabase
      .from("classes")
      .select("id, class_name, class_code, created_at, student_count, teacher_id")
      .eq("teacher_id", teacherId)
      .order("created_at", { ascending: false })
      .returns<ClassRow[]>();

    if (classError) {
      throw new Error(classError.message);
    }

    const classIds = classRows.map((classRow) => classRow.id);
    const { data: studentRows, error: studentError } = classIds.length
      ? await supabase
          .from("students")
          .select("id, class_id, created_at, student_number, birth_date")
          .in("class_id", classIds)
          .order("student_number", { ascending: true })
          .returns<StudentRow[]>()
      : { data: [] as StudentRow[], error: null };

    if (studentError) {
      throw new Error(studentError.message);
    }

    return {
      success: true,
      data: {
        classes: classRows.map(toTeacherClass),
        students: studentRows.map(toTeacherStudent),
        events: [],
      },
    };
  } catch (error) {
    return { success: false, error: getErrorMessage(error) };
  }
}

export async function createClassAction({
  className,
  studentCount,
}: CreateClassInput): Promise<ActionResult<{ classItem: TeacherClass; students: TeacherStudent[] }>> {
  try {
    const normalizedClassName = normalizeRequiredText(className, "클래스 이름");
    const normalizedStudentCount = safePositiveInteger(studentCount, 1);
    const { supabase, teacherId } = await getTeacherId();
    const classCode = createClassCode();
    const { data: classData, error: classError } = await supabase
      .from("classes")
      .insert({
        class_name: normalizedClassName,
        student_count: normalizedStudentCount,
        class_code: classCode,
        teacher_id: teacherId,
      })
      .select("id, class_name, class_code, created_at, student_count, teacher_id")
      .single<ClassRow>();

    if (classError) {
      throw new Error(classError.message);
    }

    const studentRows = Array.from({ length: normalizedStudentCount }, (_, index) => ({
      class_id: classData.id,
      student_number: index + 1,
      birth_date: null,
    }));
    const { data: createdStudents, error: studentError } = await supabase
      .from("students")
      .insert(studentRows)
      .select("id, class_id, created_at, student_number, birth_date")
      .returns<StudentRow[]>();

    if (studentError) {
      throw new Error(studentError.message);
    }

    revalidatePath("/teacher/home");
    revalidatePath("/teacher/dashboard");

    return {
      success: true,
      data: {
        classItem: toTeacherClass(classData),
        students: createdStudents.map(toTeacherStudent),
      },
    };
  } catch (error) {
    return { success: false, error: getErrorMessage(error) };
  }
}

export async function updateClassNameAction({
  classId,
  className,
}: UpdateClassNameInput): Promise<ActionResult<TeacherClass>> {
  try {
    const normalizedClassName = normalizeRequiredText(className, "클래스 이름");
    const { supabase, teacherId } = await getTeacherId();
    const { data, error } = await supabase
      .from("classes")
      .update({ class_name: normalizedClassName })
      .eq("id", classId)
      .eq("teacher_id", teacherId)
      .select("id, class_name, class_code, created_at, student_count, teacher_id")
      .single<ClassRow>();

    if (error) {
      throw new Error(error.message);
    }

    revalidatePath("/teacher/home");
    revalidatePath(`/teacher/class/${classId}`);

    return { success: true, data: toTeacherClass(data) };
  } catch (error) {
    return { success: false, error: getErrorMessage(error) };
  }
}

export async function deleteClassAction(classId: string): Promise<ActionResult<null>> {
  try {
    const { supabase, teacherId } = await getTeacherId();
    const { error: studentError } = await supabase
      .from("students")
      .delete()
      .eq("class_id", classId);

    if (studentError) {
      throw new Error(studentError.message);
    }

    const { error: classError } = await supabase
      .from("classes")
      .delete()
      .eq("id", classId)
      .eq("teacher_id", teacherId);

    if (classError) {
      throw new Error(classError.message);
    }

    revalidatePath("/teacher/home");
    revalidatePath("/teacher/dashboard");

    return { success: true, data: null };
  } catch (error) {
    return { success: false, error: getErrorMessage(error) };
  }
}

export async function addStudentAction({
  classId,
}: AddStudentInput): Promise<ActionResult<TeacherStudent>> {
  try {
    const { supabase, classRow } = await assertTeacherOwnsClass(classId);
    const { data: lastStudents, error: lastStudentError } = await supabase
      .from("students")
      .select("student_number")
      .eq("class_id", classId)
      .order("student_number", { ascending: false })
      .limit(1)
      .returns<Array<{ student_number: number }>>();

    if (lastStudentError) {
      throw new Error(lastStudentError.message);
    }

    const nextStudentNumber = (lastStudents[0]?.student_number ?? 0) + 1;
    const { data: student, error: studentError } = await supabase
      .from("students")
      .insert({
        class_id: classId,
        student_number: nextStudentNumber,
        birth_date: null,
      })
      .select("id, class_id, created_at, student_number, birth_date")
      .single<StudentRow>();

    if (studentError) {
      throw new Error(studentError.message);
    }

    const { error: classError } = await supabase
      .from("classes")
      .update({ student_count: classRow.student_count + 1 })
      .eq("id", classId);

    if (classError) {
      throw new Error(classError.message);
    }

    revalidatePath(`/teacher/class/${classId}`);

    return { success: true, data: toTeacherStudent(student) };
  } catch (error) {
    return { success: false, error: getErrorMessage(error) };
  }
}

export async function updateStudentAction({
  studentId,
  birthDate,
}: UpdateStudentInput): Promise<ActionResult<TeacherStudent>> {
  try {
    const { supabase, teacherId } = await getTeacherId();
    const { data: currentStudent, error: currentStudentError } = await supabase
      .from("students")
      .select("id, class_id, created_at, student_number, birth_date")
      .eq("id", studentId)
      .maybeSingle<StudentRow>();

    if (currentStudentError) {
      throw new Error(currentStudentError.message);
    }

    if (!currentStudent) {
      throw new Error("학생 정보를 찾을 수 없습니다.");
    }

    const { data: classRow, error: classError } = await supabase
      .from("classes")
      .select("id")
      .eq("id", currentStudent.class_id)
      .eq("teacher_id", teacherId)
      .maybeSingle<{ id: string }>();

    if (classError) {
      throw new Error(classError.message);
    }

    if (!classRow) {
      throw new Error("학생을 수정할 권한이 없습니다.");
    }

    const { data: student, error: updateError } = await supabase
      .from("students")
      .update({ birth_date: birthDate.trim() || null })
      .eq("id", studentId)
      .select("id, class_id, created_at, student_number, birth_date")
      .single<StudentRow>();

    if (updateError) {
      throw new Error(updateError.message);
    }

    revalidatePath(`/teacher/class/${student.class_id}`);

    return { success: true, data: toTeacherStudent(student) };
  } catch (error) {
    return { success: false, error: getErrorMessage(error) };
  }
}

export async function deleteStudentAction(studentId: string): Promise<ActionResult<null>> {
  try {
    const { supabase, teacherId } = await getTeacherId();
    const { data: student, error: studentError } = await supabase
      .from("students")
      .select("id, class_id")
      .eq("id", studentId)
      .maybeSingle<{ id: string; class_id: string }>();

    if (studentError) {
      throw new Error(studentError.message);
    }

    if (!student) {
      throw new Error("학생 정보를 찾을 수 없습니다.");
    }

    const { data: classRow, error: classError } = await supabase
      .from("classes")
      .select("id, student_count")
      .eq("id", student.class_id)
      .eq("teacher_id", teacherId)
      .maybeSingle<{ id: string; student_count: number }>();

    if (classError) {
      throw new Error(classError.message);
    }

    if (!classRow) {
      throw new Error("학생을 삭제할 권한이 없습니다.");
    }

    const { error: deleteError } = await supabase
      .from("students")
      .delete()
      .eq("id", studentId);

    if (deleteError) {
      throw new Error(deleteError.message);
    }

    const { error: countError } = await supabase
      .from("classes")
      .update({ student_count: Math.max(0, classRow.student_count - 1) })
      .eq("id", student.class_id);

    if (countError) {
      throw new Error(countError.message);
    }

    revalidatePath(`/teacher/class/${student.class_id}`);

    return { success: true, data: null };
  } catch (error) {
    return { success: false, error: getErrorMessage(error) };
  }
}
