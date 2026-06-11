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
  MOCK_TEACHER_CLASSES,
  type TeacherClass,
} from "../_data/mockTeacher";

const STORAGE_KEY = "gugu_teacher_classes";

type CreateTeacherClassInput = {
  grade: string;
  room: string;
  studentCount: string;
};

type TeacherClassContextValue = {
  classes: TeacherClass[];
  addClass: (input: CreateTeacherClassInput) => TeacherClass;
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

function readStoredClasses() {
  if (typeof window === "undefined") {
    return MOCK_TEACHER_CLASSES;
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return MOCK_TEACHER_CLASSES;
    }

    const parsed = JSON.parse(stored) as TeacherClass[];

    if (!Array.isArray(parsed) || parsed.length === 0) {
      return MOCK_TEACHER_CLASSES;
    }

    return parsed;
  } catch {
    return MOCK_TEACHER_CLASSES;
  }
}

export function TeacherClassProvider({ children }: { children: ReactNode }) {
  const [classes, setClasses] = useState<TeacherClass[]>(() => readStoredClasses());

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(classes));
  }, [classes]);

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
    };

    setClasses((prev) => [newClass, ...prev]);

    return newClass;
  }, []);

  const value = useMemo(() => ({ classes, addClass }), [addClass, classes]);

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
