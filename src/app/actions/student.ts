"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient, createClient } from "@/utils/supabase/server";
import {
  getStudentSessionAction,
  studentLogoutAction,
} from "@/app/actions/auth";

type ActionResult<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: string;
    };

type StudentProfile = {
  id: string;
  classId: string;
  className: string;
  classCode: string;
  studentNumber: number;
  name: string;
  birthDate: string;
  profileImageUrl: string | null;
};

type ExamSchedule = {
  id: string;
  title: string;
  startsAt: string;
  endsAt: string;
  problemCount?: number | null;
  timeLimitSeconds?: number | null;
};

type StudentRecord = {
  id: string;
  mode: string;
  problemCount: number;
  correctCount: number;
  accuracy: number;
  elapsedSeconds: number;
  createdAt: string;
};

type RankingRow = {
  studentId: string;
  studentNumber: number;
  name: string;
  accuracy: number;
  elapsedSeconds: number;
  solvedCount: number;
  rank: number;
  isMe: boolean;
};

export type StudentWorkspace = {
  profile: StudentProfile;
  schedules: ExamSchedule[];
  nextExam: ExamSchedule | null;
  records: StudentRecord[];
  rankings: RankingRow[];
  activeExam: ExamSchedule | null;
};

type SubmitRecordInput = {
  mode: string;
  problemCount: number;
  correctCount: number;
  elapsedSeconds: number;
};

type UpdateStudentProfileInput = {
  name: string;
  profileImageUrl?: string;
};

type StudentRow = {
  id: string;
  class_id: string;
  student_number: number;
  name: string | null;
  birth_date: string | null;
  profile_image_url: string | null;
};

type ClassRow = {
  id: string;
  class_name: string;
  class_code: string;
};

type ScheduleRow = {
  id: string;
  title: string;
  starts_at: string;
  ends_at: string;
  problem_count?: number | null;
  time_limit_seconds?: number | null;
};

type RecordRow = {
  id: string;
  class_id: string;
  student_id: string;
  mode: string;
  problem_count: number;
  correct_count: number;
  accuracy: number;
  elapsed_seconds: number;
  created_at: string;
};

async function getDb() {
  if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return createAdminClient();
  }

  return createClient();
}

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "요청을 처리하지 못했습니다.";
}

function toStudentRecord(record: RecordRow): StudentRecord {
  return {
    id: record.id,
    mode: record.mode,
    problemCount: record.problem_count,
    correctCount: record.correct_count,
    accuracy: Number(record.accuracy),
    elapsedSeconds: record.elapsed_seconds,
    createdAt: record.created_at,
  };
}

function toExamSchedule(schedule: ScheduleRow): ExamSchedule {
  return {
    id: schedule.id,
    title: schedule.title,
    startsAt: schedule.starts_at,
    endsAt: schedule.ends_at,
    problemCount: schedule.problem_count ?? null,
    timeLimitSeconds: schedule.time_limit_seconds ?? null,
  };
}

function getActiveExam(schedules: ExamSchedule[]) {
  const now = Date.now();

  return (
    schedules.find((schedule) => {
      const startsAt = new Date(schedule.startsAt).getTime();
      const endsAt = new Date(schedule.endsAt).getTime();

      return startsAt <= now && now <= endsAt;
    }) ?? null
  );
}

function buildRankings({
  students,
  records,
  currentStudentId,
}: {
  students: StudentRow[];
  records: RecordRow[];
  currentStudentId: string;
}) {
  const byStudent = new Map<string, RecordRow[]>();

  records.forEach((record) => {
    byStudent.set(record.student_id, [
      ...(byStudent.get(record.student_id) ?? []),
      record,
    ]);
  });

  return students
    .map((student) => {
      const studentRecords = byStudent.get(student.id) ?? [];
      const bestRecord = studentRecords.slice().sort((a, b) => {
        if (Number(b.accuracy) !== Number(a.accuracy)) {
          return Number(b.accuracy) - Number(a.accuracy);
        }

        return a.elapsed_seconds - b.elapsed_seconds;
      })[0];

      return {
        studentId: student.id,
        studentNumber: student.student_number,
        name: student.name ?? `${student.student_number}번 학생`,
        accuracy: bestRecord ? Number(bestRecord.accuracy) : 0,
        elapsedSeconds: bestRecord?.elapsed_seconds ?? 0,
        solvedCount: studentRecords.reduce(
          (sum, record) => sum + record.problem_count,
          0,
        ),
        rank: 0,
        isMe: student.id === currentStudentId,
      };
    })
    .sort((a, b) => {
      if (b.accuracy !== a.accuracy) {
        return b.accuracy - a.accuracy;
      }

      return (
        (a.elapsedSeconds || Number.POSITIVE_INFINITY) -
        (b.elapsedSeconds || Number.POSITIVE_INFINITY)
      );
    })
    .map((ranking, index) => ({ ...ranking, rank: index + 1 }));
}

async function requireStudentSession() {
  const sessionResult = await getStudentSessionAction();

  if (!sessionResult.success) {
    throw new Error(sessionResult.error);
  }

  if (!sessionResult.data) {
    throw new Error("학생 로그인이 필요합니다.");
  }

  return sessionResult.data;
}

export async function loadStudentWorkspaceAction(): Promise<
  ActionResult<StudentWorkspace>
> {
  try {
    const session = await requireStudentSession();
    const db = await getDb();
    const { data: classRow, error: classError } = await db
      .from("classes")
      .select("id, class_name, class_code")
      .eq("id", session.classId)
      .maybeSingle<ClassRow>();

    if (classError) {
      throw new Error(classError.message);
    }

    if (!classRow) {
      // Class no longer exists (teacher deleted class). Clear student session and prompt re-login.
      await studentLogoutAction();
      throw new Error(
        "학생 로그인 정보가 유효하지 않습니다. 로그인 화면으로 이동합니다.",
      );
    }

    const { data: studentRow, error: studentError } = await db
      .from("students")
      .select(
        "id, class_id, student_number, name, birth_date, profile_image_url",
      )
      .eq("id", session.id)
      .maybeSingle<StudentRow>();

    if (studentError) {
      throw new Error(studentError.message);
    }

    if (!studentRow) {
      // Student record missing (may have been deleted). Clear session and prompt re-login.
      await studentLogoutAction();
      throw new Error(
        "학생 로그인 정보가 유효하지 않습니다. 로그인 화면으로 이동합니다.",
      );
    }

    // Run non-dependent queries in parallel to reduce overall latency.
    const timersEnabled = process.env.NODE_ENV !== "production";

    if (timersEnabled) console.time("loadStudentWorkspace:parallelQueries");

    const scheduleResp = await db
      .from("exam_schedules")
      .select("id, title, starts_at, ends_at")
      .eq("class_id", session.classId)
      .order("starts_at", { ascending: true })
      .returns<ScheduleRow[]>();

    const classStudentsResp = await db
      .from("students")
      .select(
        "id, class_id, student_number, name, birth_date, profile_image_url",
      )
      .eq("class_id", session.classId)
      .order("student_number", { ascending: true })
      .returns<StudentRow[]>();

    const recordRowsResp = await db
      .from("student_records")
      .select(
        "id, class_id, student_id, mode, problem_count, correct_count, accuracy, elapsed_seconds, created_at",
      )
      .eq("class_id", session.classId)
      .order("created_at", { ascending: false })
      .returns<RecordRow[]>();

    if (timersEnabled) console.timeEnd("loadStudentWorkspace:parallelQueries");

    const scheduleRows = scheduleResp.data ?? [];
    const classStudents = classStudentsResp.data ?? [];
    const recordRows = recordRowsResp.data ?? [];

    if (scheduleResp.error && process.env.NODE_ENV !== "production") {
      console.warn(
        "exam_schedules query warning:",
        scheduleResp.error.message ?? scheduleResp.error,
      );
    }

    if (classStudentsResp.error && process.env.NODE_ENV !== "production") {
      console.warn(
        "students query warning:",
        classStudentsResp.error.message ?? classStudentsResp.error,
      );
    }

    if (recordRowsResp.error && process.env.NODE_ENV !== "production") {
      console.warn(
        "student_records query warning:",
        recordRowsResp.error.message ?? recordRowsResp.error,
      );
    }
    const schedules = scheduleRows.map(toExamSchedule);
    const now = Date.now();
    const nextExam =
      schedules.find(
        (schedule) => new Date(schedule.startsAt).getTime() > now,
      ) ?? null;
    const myRecords = recordRows
      .filter((record) => record.student_id === session.id)
      .map(toStudentRecord);

    return {
      success: true,
      data: {
        profile: {
          id: studentRow.id,
          classId: classRow.id,
          className: classRow.class_name,
          classCode: classRow.class_code,
          studentNumber: studentRow.student_number,
          name: studentRow.name ?? `${studentRow.student_number}번 학생`,
          birthDate: studentRow.birth_date ?? "",
          profileImageUrl: studentRow.profile_image_url,
        },
        schedules,
        nextExam,
        records: myRecords,
        rankings: buildRankings({
          students: classStudents,
          records: recordRows,
          currentStudentId: session.id,
        }),
        activeExam: getActiveExam(schedules),
      },
    };
  } catch (error) {
    return { success: false, error: getErrorMessage(error) };
  }
}

export async function submitStudentRecordAction({
  mode,
  problemCount,
  correctCount,
  elapsedSeconds,
}: SubmitRecordInput): Promise<ActionResult<StudentRecord>> {
  try {
    const session = await requireStudentSession();
    const db = await getDb();
    const accuracy =
      problemCount > 0 ? Math.round((correctCount / problemCount) * 100) : 0;
    const { data, error } = await db
      .from("student_records")
      .insert({
        class_id: session.classId,
        student_id: session.id,
        mode,
        problem_count: problemCount,
        correct_count: correctCount,
        accuracy,
        elapsed_seconds: elapsedSeconds,
      })
      .select(
        "id, class_id, student_id, mode, problem_count, correct_count, accuracy, elapsed_seconds, created_at",
      )
      .single<RecordRow>();

    if (error) {
      throw new Error(error.message);
    }

    if (mode === "exam") {
      revalidatePath("/student/exam");
    } else {
      revalidatePath("/student/practice");
    }
    revalidatePath("/student/ranking");
    revalidatePath("/student");

    return { success: true, data: toStudentRecord(data) };
  } catch (error) {
    return { success: false, error: getErrorMessage(error) };
  }
}

export async function updateStudentProfileAction({
  name,
  profileImageUrl,
}: UpdateStudentProfileInput): Promise<ActionResult<StudentProfile>> {
  try {
    const session = await requireStudentSession();
    const db = await getDb();
    const { data, error } = await db
      .from("students")
      .update({
        name: name.trim() || `${session.studentNumber}번 학생`,
        profile_image_url: profileImageUrl?.trim() || null,
      })
      .eq("id", session.id)
      .select(
        "id, class_id, student_number, name, birth_date, profile_image_url",
      )
      .single<StudentRow>();

    if (error) {
      throw new Error(error.message);
    }

    revalidatePath("/student");

    return {
      success: true,
      data: {
        id: data.id,
        classId: session.classId,
        className: session.className,
        classCode: session.classCode,
        studentNumber: data.student_number,
        name: data.name ?? `${data.student_number}번 학생`,
        birthDate: data.birth_date ?? "",
        profileImageUrl: data.profile_image_url,
      },
    };
  } catch (error) {
    return { success: false, error: getErrorMessage(error) };
  }
}

export { studentLogoutAction };
