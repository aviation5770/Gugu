"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";
import {
  addStudentAction,
  createScheduleAction,
  createClassAction,
  deleteClassAction,
  deleteScheduleAction,
  deleteStudentAction,
  loadTeacherWorkspaceAction,
  updateClassNameAction,
  updateStudentAction,
} from "@/app/actions/class";
import {
  CLASS_THEME_COLORS,
  type TeacherClass,
  type TeacherScheduleEvent,
  type TeacherStudent,
} from "../_data/mockTeacher";

type CreateTeacherClassInput = {
  grade: string;
  room: string;
  studentCount: string;
};

type CreateScheduleEventInput = {
  classId: string;
  title: string;
  date: string;
  startTime?: string;
  endTime?: string;
  problemCount?: number;
  durationSeconds?: number;
};

type TeacherClassContextValue = {
  classes: TeacherClass[];
  students: TeacherStudent[];
  events: TeacherScheduleEvent[];
  isLoading: boolean;
  loadError: string;
  addClass: (input: CreateTeacherClassInput) => Promise<TeacherClass | null>;
  updateClassName: (classId: string, className: string) => Promise<void>;
  deleteClass: (classId: string) => Promise<void>;
  addStudent: (classId: string) => Promise<TeacherStudent | null>;
  getStudentsByClass: (classId: string) => TeacherStudent[];
  getRankings: (classId?: string) => Array<TeacherStudent & { class_name: string }>;
  updateStudent: (
    studentId: string,
    input: Partial<Pick<TeacherStudent, "name" | "memo" | "birth_date">>,
  ) => Promise<boolean>;
  resetStudentRecord: (studentId: string) => void;
  resetClassRecords: (classId: string) => void;
  deleteStudent: (studentId: string) => Promise<void>;
  addScheduleEvent: (input: CreateScheduleEventInput) => TeacherScheduleEvent | null;
  deleteScheduleEvent: (eventId: string) => void;
  getEventsByClass: (classId: string) => TeacherScheduleEvent[];
};

const TeacherClassContext = createContext<TeacherClassContextValue | null>(null);

function safeNumber(value: string, fallback: number) {
  const parsed = Number.parseInt(value, 10);

  if (!Number.isFinite(parsed) || parsed < 1) {
    return fallback;
  }

  return parsed;
}

function getBirthdayPassword(birthDate: string) {
  const digits = birthDate.replace(/\D/g, "");

  if (digits.length === 8) {
    return digits.slice(2);
  }

  if (digits.length === 6) {
    return digits;
  }

  return "";
}

function createOptimisticClass(input: CreateTeacherClassInput): TeacherClass {
  const grade = safeNumber(input.grade, 1);
  const room = safeNumber(input.room, 1);
  const studentCount = safeNumber(input.studentCount, 1);

  return {
    id: `pending-${Date.now()}`,
    class_name: `${grade}학년 ${room}반`,
    grade,
    room,
    teacher_name: "선생님",
    class_code: "생성 중",
    student_count: studentCount,
    todo_alert: "",
    profile_color: CLASS_THEME_COLORS[(grade + room) % CLASS_THEME_COLORS.length],
    header_color: CLASS_THEME_COLORS[(grade + room + 2) % CLASS_THEME_COLORS.length],
    description: `${grade}학년 ${room}반 클래스입니다.`,
    created_at: new Date().toISOString().slice(0, 10),
  };
}

export function TeacherClassProvider({ children }: { children: ReactNode }) {
  const [classes, setClasses] = useState<TeacherClass[]>([]);
  const [students, setStudents] = useState<TeacherStudent[]>([]);
  const [events, setEvents] = useState<TeacherScheduleEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadWorkspace() {
      setIsLoading(true);
      const result = await loadTeacherWorkspaceAction();

      if (!isMounted) {
        return;
      }

      if (!result.success) {
        setLoadError(result.error);
        setIsLoading(false);
        return;
      }

      setClasses(result.data.classes);
      setStudents(result.data.students);
      setLoadError("");
      setIsLoading(false);
    }

    loadWorkspace();

    return () => {
      isMounted = false;
    };
  }, []);

  const addClass = useCallback(async (input: CreateTeacherClassInput) => {
    const optimisticClass = createOptimisticClass(input);

    setClasses((prev) => [optimisticClass, ...prev]);

    const result = await createClassAction({
      className: optimisticClass.class_name,
      studentCount: optimisticClass.student_count,
    });

    if (!result.success) {
      setClasses((prev) => prev.filter((classItem) => classItem.id !== optimisticClass.id));
      window.alert(result.error);
      return null;
    }

    setClasses((prev) => [
      result.data.classItem,
      ...prev.filter((classItem) => classItem.id !== optimisticClass.id),
    ]);
    setStudents((prev) => [...result.data.students, ...prev]);

    return result.data.classItem;
  }, []);

  const updateClassName = useCallback(async (classId: string, className: string) => {
    const result = await updateClassNameAction({ classId, className });

    if (!result.success) {
      window.alert(result.error);
      return;
    }

    setClasses((prev) =>
      prev.map((classItem) => (classItem.id === classId ? result.data : classItem)),
    );
    setEvents((prev) =>
      prev.map((event) =>
        event.class_id === classId
          ? {
              ...event,
              class_name: result.data.class_name,
            }
          : event,
      ),
    );
  }, []);

  const deleteClass = useCallback(async (classId: string) => {
    const result = await deleteClassAction(classId);

    if (!result.success) {
      window.alert(result.error);
      return;
    }

    setClasses((prev) => prev.filter((classItem) => classItem.id !== classId));
    setStudents((prev) => prev.filter((student) => student.class_id !== classId));
    setEvents((prev) => prev.filter((event) => event.class_id !== classId));
  }, []);

  const addStudent = useCallback(async (classId: string) => {
    const result = await addStudentAction({ classId });

    if (!result.success) {
      window.alert(result.error);
      return null;
    }

    setStudents((prev) => [...prev, result.data]);
    setClasses((prev) =>
      prev.map((classItem) =>
        classItem.id === classId
          ? {
              ...classItem,
              student_count: classItem.student_count + 1,
            }
          : classItem,
      ),
    );

    return result.data;
  }, []);

  const getStudentsByClass = useCallback(
    (classId: string) =>
      students
        .filter((student) => student.class_id === classId)
        .sort((a, b) => a.student_number - b.student_number),
    [students],
  );

  const getRankings = useCallback(
    (classId?: string) =>
      students
        .filter((student) => !classId || student.class_id === classId)
        .map((student) => ({
          ...student,
          class_name:
            classes.find((classItem) => classItem.id === student.class_id)?.class_name ??
            "알 수 없는 수업",
        }))
        .sort((a, b) => {
          if (b.accuracy !== a.accuracy) {
            return b.accuracy - a.accuracy;
          }

          if (a.best_time !== b.best_time) {
            return (
              (a.best_time || Number.POSITIVE_INFINITY) -
              (b.best_time || Number.POSITIVE_INFINITY)
            );
          }

          return a.student_number - b.student_number;
        }),
    [classes, students],
  );

  const updateStudent = useCallback(
    async (
      studentId: string,
      input: Partial<Pick<TeacherStudent, "name" | "memo" | "birth_date">>,
    ) => {
      const targetStudent = students.find((student) => student.id === studentId);
      const nextBirthDate = input.birth_date ?? targetStudent?.birth_date ?? "";
      const result = await updateStudentAction({
        studentId,
        name: input.name ?? targetStudent?.name ?? "",
        birthDate: nextBirthDate,
        memo: input.memo ?? targetStudent?.memo ?? "",
      });

      if (!result.success) {
        window.alert(result.error);
        return false;
      }

      setStudents((prev) =>
        prev.map((student) =>
          student.id === studentId
            ? {
                ...student,
                ...input,
                birth_date: result.data.birth_date,
                password: getBirthdayPassword(result.data.birth_date),
              }
          : student,
        ),
      );
      return true;
    },
    [students],
  );

  const resetStudentRecord = useCallback((studentId: string) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === studentId
          ? {
              ...student,
              accuracy: 0,
              best_time: 0,
              solved_count: 0,
            }
          : student,
      ),
    );
  }, []);

  const resetClassRecords = useCallback((classId: string) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.class_id === classId
          ? {
              ...student,
              accuracy: 0,
              best_time: 0,
              solved_count: 0,
            }
          : student,
      ),
    );
  }, []);

  const deleteStudent = useCallback(async (studentId: string) => {
    const targetStudent = students.find((student) => student.id === studentId);
    const result = await deleteStudentAction(studentId);

    if (!result.success) {
      window.alert(result.error);
      return;
    }

    setStudents((prev) => prev.filter((student) => student.id !== studentId));
    if (targetStudent) {
      setClasses((prev) =>
        prev.map((classItem) =>
          classItem.id === targetStudent.class_id
            ? {
                ...classItem,
                student_count: Math.max(0, classItem.student_count - 1),
              }
            : classItem,
        ),
      );
    }
  }, [students]);

  const addScheduleEvent = useCallback(
    (input: CreateScheduleEventInput) => {
      const classItem = classes.find((item) => item.id === input.classId);
      const title = input.title.trim();

      if (!classItem || !title) {
        return null;
      }

      const startsAt = `${input.date}T${input.startTime || "09:00"}:00+09:00`;
      const endsAt = `${input.date}T${input.endTime || "10:00"}:00+09:00`;
      const event: TeacherScheduleEvent = {
        id: `pending-${Date.now()}`,
        class_id: classItem.id,
        class_name: classItem.class_name,
        title,
        date: input.date,
        starts_at: startsAt,
        ends_at: endsAt,
        color: classItem.header_color,
        problem_count: input.problemCount,
        duration_seconds: input.durationSeconds,
      };

      setEvents((prev) => [...prev, event]);
      createScheduleAction({
        classId: classItem.id,
        title,
        startsAt,
        endsAt,
        problemCount: input.problemCount,
        durationSeconds: input.durationSeconds,
      }).then((result) => {
        if (!result.success) {
          setEvents((prev) => prev.filter((item) => item.id !== event.id));
          window.alert(result.error);
          return;
        }

        setEvents((prev) =>
          prev.map((item) => (item.id === event.id ? result.data : item)),
        );
      });

      return event;
    },
    [classes],
  );

  const deleteScheduleEvent = useCallback((eventId: string) => {
    setEvents((prev) => prev.filter((event) => event.id !== eventId));
    deleteScheduleAction(eventId).then((result) => {
      if (!result.success) {
        window.alert(result.error);
      }
    });
  }, []);

  const getEventsByClass = useCallback(
    (classId: string) =>
      events
        .filter((event) => event.class_id === classId)
        .sort((a, b) => a.date.localeCompare(b.date)),
    [events],
  );

  const value = useMemo(
    () => ({
      classes,
      students,
      events,
      isLoading,
      loadError,
      addClass,
      updateClassName,
      deleteClass,
      addStudent,
      getStudentsByClass,
      getRankings,
      updateStudent,
      resetStudentRecord,
      resetClassRecords,
      deleteStudent,
      addScheduleEvent,
      deleteScheduleEvent,
      getEventsByClass,
    }),
    [
      addClass,
      addScheduleEvent,
      addStudent,
      classes,
      deleteClass,
      deleteScheduleEvent,
      deleteStudent,
      events,
      getEventsByClass,
      getRankings,
      getStudentsByClass,
      isLoading,
      loadError,
      resetClassRecords,
      resetStudentRecord,
      students,
      updateClassName,
      updateStudent,
    ],
  );

  return (
    <TeacherClassContext.Provider value={value}>{children}</TeacherClassContext.Provider>
  );
}

export function useTeacherClasses() {
  const context = useContext(TeacherClassContext);

  if (!context) {
    throw new Error("useTeacherClasses must be used inside TeacherClassProvider.");
  }

  return context;
}
