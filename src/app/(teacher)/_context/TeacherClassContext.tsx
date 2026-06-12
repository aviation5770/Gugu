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
  CLASS_THEME_COLORS,
  MOCK_EVENTS,
  MOCK_TEACHER_CLASSES,
  MOCK_STUDENTS,
  type TeacherClass,
  type TeacherScheduleEvent,
  type TeacherStudent,
} from "../_data/mockTeacher";

const CLASS_STORAGE_KEY = "gugu_teacher_classes";
const STUDENT_STORAGE_KEY = "gugu_teacher_students";
const EVENT_STORAGE_KEY = "gugu_teacher_events";

type CreateTeacherClassInput = {
  grade: string;
  room: string;
  studentCount: string;
};

type CreateScheduleEventInput = {
  classId: string;
  title: string;
  date: string;
};

type TeacherClassContextValue = {
  classes: TeacherClass[];
  students: TeacherStudent[];
  events: TeacherScheduleEvent[];
  addClass: (input: CreateTeacherClassInput) => TeacherClass;
  updateClassName: (classId: string, className: string) => void;
  deleteClass: (classId: string) => void;
  addStudent: (classId: string) => TeacherStudent | null;
  getStudentsByClass: (classId: string) => TeacherStudent[];
  getRankings: (classId?: string) => Array<TeacherStudent & { class_name: string }>;
  updateStudent: (studentId: string, input: Partial<Pick<TeacherStudent, "name" | "memo" | "birth_date">>) => void;
  resetStudentRecord: (studentId: string) => void;
  resetClassRecords: (classId: string) => void;
  deleteStudent: (studentId: string) => void;
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

function createClassCode(grade: number, room: number) {
  const suffix = Math.floor(10 + Math.random() * 90);

  return `GG-${grade}${room}${suffix}`;
}

function formatToday() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${now.getFullYear()}-${month}-${day}`;
}

function getBirthdayPassword(birthDate: string) {
  const monthDayMatch = birthDate.match(/(?:^|\D)(\d{1,2})\D+(\d{1,2})(?:\D|$)/);

  if (monthDayMatch) {
    const month = monthDayMatch[1].padStart(2, "0");
    const day = monthDayMatch[2].padStart(2, "0");

    return `${month}${day}`;
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

function normalizeClass(classItem: TeacherClass): TeacherClass {
  return {
    ...classItem,
    created_at: classItem.created_at ?? formatToday(),
  };
}

function normalizeStudent(student: TeacherStudent): TeacherStudent {
  return {
    ...student,
    password: student.password ?? getBirthdayPassword(student.birth_date ?? ""),
    memo: student.memo ?? "",
  };
}

function readStoredClasses() {
  if (typeof window === "undefined") {
    return MOCK_TEACHER_CLASSES;
  }

  try {
    const stored = window.localStorage.getItem(CLASS_STORAGE_KEY);

    if (!stored) {
      return MOCK_TEACHER_CLASSES;
    }

    const parsed = JSON.parse(stored) as TeacherClass[];

    if (!Array.isArray(parsed) || parsed.length === 0) {
      return MOCK_TEACHER_CLASSES.map(normalizeClass);
    }

    return parsed.map(normalizeClass);
  } catch {
    return MOCK_TEACHER_CLASSES.map(normalizeClass);
  }
}

function readStoredStudents() {
  if (typeof window === "undefined") {
    return MOCK_STUDENTS;
  }

  try {
    const stored = window.localStorage.getItem(STUDENT_STORAGE_KEY);

    if (!stored) {
      return MOCK_STUDENTS.map(normalizeStudent);
    }

    const parsed = JSON.parse(stored) as TeacherStudent[];

    if (!Array.isArray(parsed)) {
      return MOCK_STUDENTS.map(normalizeStudent);
    }

    return parsed.map(normalizeStudent);
  } catch {
    return MOCK_STUDENTS.map(normalizeStudent);
  }
}

function readStoredEvents() {
  if (typeof window === "undefined") {
    return MOCK_EVENTS;
  }

  try {
    const stored = window.localStorage.getItem(EVENT_STORAGE_KEY);

    if (!stored) {
      return MOCK_EVENTS;
    }

    const parsed = JSON.parse(stored) as TeacherScheduleEvent[];

    if (!Array.isArray(parsed)) {
      return MOCK_EVENTS;
    }

    return parsed;
  } catch {
    return MOCK_EVENTS;
  }
}

function createStudentsForClass(classItem: TeacherClass) {
  return Array.from({ length: classItem.student_count }, (_, index) => {
    const number = index + 1;

    return {
      id: `${classItem.id}-student-${number}`,
      class_id: classItem.id,
      student_number: number,
      name: `${number}번 학생`,
      birth_date: "",
      password: "",
      memo: "",
      accuracy: 0,
      best_time: 0,
      solved_count: 0,
    };
  });
}

export function TeacherClassProvider({ children }: { children: ReactNode }) {
  const [classes, setClasses] = useState<TeacherClass[]>(() => readStoredClasses());
  const [students, setStudents] = useState<TeacherStudent[]>(() => readStoredStudents());
  const [events, setEvents] = useState<TeacherScheduleEvent[]>(() => readStoredEvents());

  useEffect(() => {
    window.localStorage.setItem(CLASS_STORAGE_KEY, JSON.stringify(classes));
  }, [classes]);

  useEffect(() => {
    window.localStorage.setItem(STUDENT_STORAGE_KEY, JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    window.localStorage.setItem(EVENT_STORAGE_KEY, JSON.stringify(events));
  }, [events]);

  const addClass = useCallback((input: CreateTeacherClassInput) => {
    const grade = safeNumber(input.grade, 1);
    const room = safeNumber(input.room, 1);
    const studentCount = safeNumber(input.studentCount, 1);

    const newClass: TeacherClass = {
      id: `class-${Date.now()}`,
      class_name: `${grade}학년 ${room}반`,
      grade,
      room,
      teacher_name: "정정자",
      class_code: createClassCode(grade, room),
      student_count: studentCount,
      todo_alert: "새 수업 - 첫 시험 일정을 등록해 주세요",
      profile_color: CLASS_THEME_COLORS[(grade + room) % CLASS_THEME_COLORS.length],
      header_color: CLASS_THEME_COLORS[(grade + room + 2) % CLASS_THEME_COLORS.length],
      description: `새로 생성된 ${grade}학년 ${room}반 클래스입니다. 학생 번호 1번부터 ${studentCount}번까지 자동 배정되었습니다.`,
      created_at: formatToday(),
    };

    setClasses((prev) => [newClass, ...prev]);
    setStudents((prev) => [...createStudentsForClass(newClass), ...prev]);

    return newClass;
  }, []);

  const updateClassName = useCallback((classId: string, className: string) => {
    const nextClassName = className.trim();

    if (!nextClassName) {
      return;
    }

    setClasses((prev) =>
      prev.map((classItem) =>
        classItem.id === classId
          ? {
              ...classItem,
              class_name: nextClassName,
            }
          : classItem,
      ),
    );
    setEvents((prev) =>
      prev.map((event) =>
        event.class_id === classId
          ? {
              ...event,
              class_name: nextClassName,
            }
          : event,
      ),
    );
  }, []);

  const deleteClass = useCallback((classId: string) => {
    setClasses((prev) => prev.filter((classItem) => classItem.id !== classId));
    setStudents((prev) => prev.filter((student) => student.class_id !== classId));
    setEvents((prev) => prev.filter((event) => event.class_id !== classId));
  }, []);

  const addStudent = useCallback((classId: string) => {
    const classItem = classes.find((item) => item.id === classId);

    if (!classItem) {
      return null;
    }

    const nextNumber =
      students
        .filter((student) => student.class_id === classId)
        .reduce((max, student) => Math.max(max, student.student_number), 0) + 1;
    const newStudent: TeacherStudent = {
      id: `${classId}-student-${Date.now()}`,
      class_id: classId,
      student_number: nextNumber,
      name: `${nextNumber}번 학생`,
      birth_date: "",
      password: "",
      memo: "",
      accuracy: 0,
      best_time: 0,
      solved_count: 0,
    };

    setStudents((prev) => [...prev, newStudent]);
    setClasses((prev) =>
      prev.map((item) =>
        item.id === classId
          ? {
              ...item,
              student_count: item.student_count + 1,
            }
          : item,
      ),
    );

    return newStudent;
  }, [classes, students]);

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
            return (a.best_time || Number.POSITIVE_INFINITY) - (b.best_time || Number.POSITIVE_INFINITY);
          }

          return a.student_number - b.student_number;
        }),
    [classes, students],
  );

  const updateStudent = useCallback(
    (
      studentId: string,
      input: Partial<Pick<TeacherStudent, "name" | "memo" | "birth_date">>,
    ) => {
      setStudents((prev) =>
        prev.map((student) =>
          student.id === studentId
            ? {
                ...student,
                ...input,
                password:
                  input.birth_date === undefined
                    ? student.password
                    : getBirthdayPassword(input.birth_date),
              }
            : student,
        ),
      );
    },
    [],
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

  const addScheduleEvent = useCallback(
    (input: CreateScheduleEventInput) => {
      const classItem = classes.find((item) => item.id === input.classId);
      const title = input.title.trim();

      if (!classItem || !title) {
        return null;
      }

      const event: TeacherScheduleEvent = {
        id: `evt-${Date.now()}`,
        class_id: classItem.id,
        class_name: classItem.class_name,
        title,
        date: input.date,
        color: classItem.header_color,
      };

      setEvents((prev) => [...prev, event]);

      return event;
    },
    [classes],
  );

  const deleteScheduleEvent = useCallback((eventId: string) => {
    setEvents((prev) => prev.filter((event) => event.id !== eventId));
  }, []);

  const getEventsByClass = useCallback(
    (classId: string) =>
      events
        .filter((event) => event.class_id === classId)
        .sort((a, b) => a.date.localeCompare(b.date)),
    [events],
  );

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

  const deleteStudent = useCallback((studentId: string) => {
    const targetStudent = students.find((student) => student.id === studentId);

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

  const value = useMemo(
    () => ({
      classes,
      students,
      events,
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
