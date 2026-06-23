"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient, createClient } from "@/utils/supabase/server";
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
  name: string | null;
  birth_date: string | null;
  memo: string | null;
  profile_image_url: string | null;
};

type TeacherRow = {
  id: string;
  email: string;
  name: string;
  profile_image_url: string | null;
};

type ExamScheduleRow = {
  id: string;
  class_id: string;
  title: string;
  starts_at: string;
  ends_at: string;
  created_at: string;
  problem_count: number | null;
  duration_seconds: number | null;
};

type StudentRecordSummaryRow = {
  id: string;
  student_id: string;
  problem_count: number;
  correct_count: number;
  accuracy: number;
  elapsed_seconds: number;
  mode: string;
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
  name: string;
  birthDate: string;
  memo: string;
  profileImageUrl?: string;
};

type CreateScheduleInput = {
  classId: string;
  title: string;
  startsAt: string;
  endsAt: string;
  problemCount?: number;
  durationSeconds?: number;
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

  const digits = birthDate.replace(/\D/g, "");

  if (digits.length === 8) {
    return digits.slice(2);
  }

  if (digits.length === 6) {
    return digits;
  }

  return "";
}

function extractGradeRoom(className: string) {
  const match = className.match(/(\d+)\D+(\d+)/);

  return {
    grade: match ? Number.parseInt(match[1], 10) : 0,
    room: match ? Number.parseInt(match[2], 10) : 0,
  };
}

function colorForId(id: string, offset = 0) {
  const seed = id
    .split("")
    .reduce((sum, char) => sum + char.charCodeAt(0), offset);

  return CLASS_THEME_COLORS[seed % CLASS_THEME_COLORS.length];
}

async function getWritableClient() {
  if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return createAdminClient();
  }

  return createClient();
}

async function getTeacherProfile(teacherId: string) {
  const supabase = await getWritableClient();
  const { data } = await supabase
    .from("teachers")
    .select("id, email, name, profile_image_url")
    .eq("id", teacherId)
    .maybeSingle<TeacherRow>();

  return data;
}

function toTeacherClass(row: ClassRow, teacherName: string): TeacherClass {
  const { grade, room } = extractGradeRoom(row.class_name);

  return {
    id: row.id,
    class_name: row.class_name,
    grade,
    room,
    teacher_name: teacherName,
    class_code: row.class_code,
    student_count: row.student_count,
    todo_alert: "",
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
    name: row.name ?? `${row.student_number}번 학생`,
    birth_date: row.birth_date ?? "",
    password: getBirthdayPassword(row.birth_date),
    memo: row.memo ?? "",
    accuracy: 0,
    best_time: 0,
    solved_count: 0,
  };
}

function toTeacherScheduleEvent(
  row: ExamScheduleRow,
  classItem: TeacherClass,
): TeacherScheduleEvent {
  return {
    id: row.id,
    class_id: row.class_id,
    class_name: classItem.class_name,
    title: row.title,
    date: row.starts_at.slice(0, 10),
    starts_at: row.starts_at,
    ends_at: row.ends_at,
    color: classItem.header_color,
    problem_count: row.problem_count,
    duration_seconds: row.duration_seconds,
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
  const { teacherId } = await getTeacherId();
  const db = await getWritableClient();
  const { data: classRow, error } = await db
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

  return { supabase: db, teacherId, classRow };
}

export async function loadTeacherWorkspaceAction(): Promise<
  ActionResult<TeacherWorkspace>
> {
  try {
    const { teacherId } = await getTeacherId();
    const db = await getWritableClient();
    const profile = await getTeacherProfile(teacherId);
    const teacherName = profile?.name ?? "선생님";
    const { data: classRows, error: classError } = await db
      .from("classes")
      .select(
        "id, class_name, class_code, created_at, student_count, teacher_id",
      )
      .eq("teacher_id", teacherId)
      .order("created_at", { ascending: false })
      .returns<ClassRow[]>();

    if (classError) {
      throw new Error(classError.message);
    }

    const classIds = classRows.map((classRow) => classRow.id);
    const { data: studentRows, error: studentError } = classIds.length
      ? await db
          .from("students")
          .select(
            "id, class_id, created_at, student_number, name, birth_date, memo, profile_image_url",
          )
          .in("class_id", classIds)
          .order("student_number", { ascending: true })
          .returns<StudentRow[]>()
      : { data: [] as StudentRow[], error: null };

    if (studentError) {
      throw new Error(studentError.message);
    }

    // Load practice records (exclude exam records) to compute student stats shown to teacher
    const studentIds = studentRows.map((s) => s.id);
    const { data: recordRows, error: recordError } = studentIds.length
      ? await db
          .from("student_records")
          .select(
            "id, student_id, problem_count, correct_count, accuracy, elapsed_seconds, mode",
          )
          .in("student_id", studentIds)
          .neq("mode", "exam")
          .returns<StudentRecordSummaryRow[]>()
      : { data: [] as StudentRecordSummaryRow[], error: null };

    if (recordError) {
      throw new Error(recordError.message);
    }

    const statsByStudent = new Map<
      string,
      { accuracy: number; best_time: number; solved_count: number }
    >();

    recordRows.forEach((r) => {
      const prev = statsByStudent.get(r.student_id) ?? {
        accuracy: 0,
        best_time: 0,
        solved_count: 0,
      };
      const totalSolved = prev.solved_count + (r.problem_count || 0);
      const totalCorrect =
        Math.round((prev.accuracy / 100) * prev.solved_count) +
        (r.correct_count || 0);
      const accuracy =
        totalSolved > 0 ? Math.round((totalCorrect / totalSolved) * 100) : 0;
      const bestTime =
        prev.best_time === 0
          ? r.elapsed_seconds || 0
          : Math.min(prev.best_time, r.elapsed_seconds || 0);

      statsByStudent.set(r.student_id, {
        accuracy,
        best_time: bestTime,
        solved_count: totalSolved,
      });
    });

    const mappedClasses = classRows.map((classRow) =>
      toTeacherClass(classRow, teacherName),
    );
    const { data: scheduleRows, error: scheduleError } = classIds.length
      ? await db
          .from("exam_schedules")
          .select(
            "id, class_id, title, starts_at, ends_at, created_at, problem_count, duration_seconds",
          )
          .in("class_id", classIds)
          .order("starts_at", { ascending: true })
          .returns<ExamScheduleRow[]>()
      : { data: [] as ExamScheduleRow[], error: null };

    if (scheduleError) {
      throw new Error(
        `시험 일정 테이블을 확인해 주세요: ${scheduleError.message}`,
      );
    }

    return {
      success: true,
      data: {
        classes: mappedClasses,
        students: studentRows.map((s) => {
          const stats = statsByStudent.get(s.id) ?? {
            accuracy: 0,
            best_time: 0,
            solved_count: 0,
          };

          return {
            ...toTeacherStudent(s),
            accuracy: stats.accuracy,
            best_time: stats.best_time,
            solved_count: stats.solved_count,
          };
        }),
        events: scheduleRows.flatMap((row) => {
          const classItem = mappedClasses.find(
            (item) => item.id === row.class_id,
          );

          return classItem ? [toTeacherScheduleEvent(row, classItem)] : [];
        }),
      },
    };
  } catch (error) {
    return { success: false, error: getErrorMessage(error) };
  }
}

export async function createClassAction({
  className,
  studentCount,
}: CreateClassInput): Promise<
  ActionResult<{ classItem: TeacherClass; students: TeacherStudent[] }>
> {
  try {
    const normalizedClassName = normalizeRequiredText(className, "클래스 이름");
    const normalizedStudentCount = safePositiveInteger(studentCount, 1);
    const { teacherId } = await getTeacherId();
    const db = await getWritableClient();
    const profile = await getTeacherProfile(teacherId);
    const classCode = createClassCode();
    const { data: classData, error: classError } = await db
      .from("classes")
      .insert({
        class_name: normalizedClassName,
        student_count: normalizedStudentCount,
        class_code: classCode,
        teacher_id: teacherId,
      })
      .select(
        "id, class_name, class_code, created_at, student_count, teacher_id",
      )
      .single<ClassRow>();

    if (classError) {
      throw new Error(classError.message);
    }

    const studentRows = Array.from(
      { length: normalizedStudentCount },
      (_, index) => ({
        class_id: classData.id,
        student_number: index + 1,
        name: `${index + 1}번 학생`,
        birth_date: null,
        memo: null,
        profile_image_url: null,
      }),
    );
    const { data: createdStudents, error: studentError } = await db
      .from("students")
      .insert(studentRows)
      .select(
        "id, class_id, created_at, student_number, name, birth_date, memo, profile_image_url",
      )
      .returns<StudentRow[]>();

    if (studentError) {
      throw new Error(studentError.message);
    }

    revalidatePath("/teacher/home");
    revalidatePath("/teacher/dashboard");

    return {
      success: true,
      data: {
        classItem: toTeacherClass(classData, profile?.name ?? "선생님"),
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
    const { teacherId } = await getTeacherId();
    const db = await getWritableClient();
    const profile = await getTeacherProfile(teacherId);
    const { data, error } = await db
      .from("classes")
      .update({ class_name: normalizedClassName })
      .eq("id", classId)
      .eq("teacher_id", teacherId)
      .select(
        "id, class_name, class_code, created_at, student_count, teacher_id",
      )
      .single<ClassRow>();

    if (error) {
      throw new Error(error.message);
    }

    revalidatePath("/teacher/home");
    revalidatePath(`/teacher/class/${classId}`);

    return {
      success: true,
      data: toTeacherClass(data, profile?.name ?? "선생님"),
    };
  } catch (error) {
    return { success: false, error: getErrorMessage(error) };
  }
}

export async function deleteClassAction(
  classId: string,
): Promise<ActionResult<null>> {
  try {
    const { teacherId } = await getTeacherId();
    const db = await getWritableClient();
    const { error: classError } = await db
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
        name: `${nextStudentNumber}번 학생`,
        birth_date: null,
        memo: null,
        profile_image_url: null,
      })
      .select(
        "id, class_id, created_at, student_number, name, birth_date, memo, profile_image_url",
      )
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
  name,
  birthDate,
  memo,
  profileImageUrl,
}: UpdateStudentInput): Promise<ActionResult<TeacherStudent>> {
  try {
    const normalizedBirthDate = birthDate.trim();

    if (!/^\d{6}$/.test(normalizedBirthDate)) {
      throw new Error("생일은 숫자 6자리로 입력해 주세요.");
    }

    const { teacherId } = await getTeacherId();
    const db = await getWritableClient();
    const { data: currentStudent, error: currentStudentError } = await db
      .from("students")
      .select(
        "id, class_id, created_at, student_number, name, birth_date, memo, profile_image_url",
      )
      .eq("id", studentId)
      .maybeSingle<StudentRow>();

    if (currentStudentError) {
      throw new Error(currentStudentError.message);
    }

    if (!currentStudent) {
      throw new Error("학생 정보를 찾을 수 없습니다.");
    }

    const { data: classRow, error: classError } = await db
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

    const { data: student, error: updateError } = await db
      .from("students")
      .update({
        name: name.trim() || `${currentStudent.student_number}번 학생`,
        birth_date: normalizedBirthDate,
        memo: memo.trim() || null,
        profile_image_url: profileImageUrl?.trim() || null,
      })
      .eq("id", studentId)
      .select(
        "id, class_id, created_at, student_number, name, birth_date, memo, profile_image_url",
      )
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

export async function deleteStudentAction(
  studentId: string,
): Promise<ActionResult<null>> {
  try {
    const { teacherId } = await getTeacherId();
    const db = await getWritableClient();
    const { data: student, error: studentError } = await db
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

    const { data: classRow, error: classError } = await db
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

    const { error: deleteError } = await db
      .from("students")
      .delete()
      .eq("id", studentId);

    if (deleteError) {
      throw new Error(deleteError.message);
    }

    const { error: countError } = await db
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

export async function createScheduleAction({
  classId,
  title,
  startsAt,
  endsAt,
  problemCount,
  durationSeconds,
}: CreateScheduleInput): Promise<ActionResult<TeacherScheduleEvent>> {
  try {
    const normalizedTitle = normalizeRequiredText(title, "시험 제목");
    const { supabase, classRow } = await assertTeacherOwnsClass(classId);
    const profile = await getTeacherProfile(classRow.teacher_id ?? "");
    const classItem = toTeacherClass(classRow, profile?.name ?? "선생님");
    const { data, error } = await supabase
      .from("exam_schedules")
      .insert({
        class_id: classId,
        title: normalizedTitle,
        starts_at: startsAt,
        ends_at: endsAt,
        problem_count: problemCount ?? null,
        duration_seconds: durationSeconds ?? null,
      })
      .select(
        "id, class_id, title, starts_at, ends_at, created_at, problem_count, duration_seconds",
      )
      .single<ExamScheduleRow>();

    if (error) {
      throw new Error(error.message);
    }

    revalidatePath("/teacher/calendar");
    revalidatePath(`/teacher/class/${classId}`);

    return { success: true, data: toTeacherScheduleEvent(data, classItem) };
  } catch (error) {
    return { success: false, error: getErrorMessage(error) };
  }
}

export async function deleteScheduleAction(
  scheduleId: string,
): Promise<ActionResult<null>> {
  try {
    const { teacherId } = await getTeacherId();
    const db = await getWritableClient();
    const { data: schedule, error: scheduleError } = await db
      .from("exam_schedules")
      .select("id, class_id")
      .eq("id", scheduleId)
      .maybeSingle<{ id: string; class_id: string }>();

    if (scheduleError) {
      throw new Error(scheduleError.message);
    }

    if (!schedule) {
      throw new Error("시험 일정을 찾을 수 없습니다.");
    }

    const { data: classRow, error: classError } = await db
      .from("classes")
      .select("id")
      .eq("id", schedule.class_id)
      .eq("teacher_id", teacherId)
      .maybeSingle<{ id: string }>();

    if (classError) {
      throw new Error(classError.message);
    }

    if (!classRow) {
      throw new Error("시험 일정을 삭제할 권한이 없습니다.");
    }

    const { error } = await db
      .from("exam_schedules")
      .delete()
      .eq("id", scheduleId);

    if (error) {
      throw new Error(error.message);
    }

    revalidatePath("/teacher/calendar");
    revalidatePath(`/teacher/class/${schedule.class_id}`);

    return { success: true, data: null };
  } catch (error) {
    return { success: false, error: getErrorMessage(error) };
  }
}
