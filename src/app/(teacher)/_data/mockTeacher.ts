export const CLASS_THEME_COLORS = [
  "#083B4D",
  "#60C43E",
  "#FA4541",
  "#9145D4",
  "#FFD165",
  "#EF466E",
];

export type TeacherClass = {
  id: string;
  class_name: string;
  grade: number;
  room: number;
  teacher_name: string;
  class_code: string;
  student_count: number;
  todo_alert: string;
  profile_color: string;
  header_color: string;
  description: string;
  created_at: string;
};

export type TeacherStudent = {
  id: string;
  class_id: string;
  student_number: number;
  name: string;
  birth_date: string;
  password: string;
  memo: string;
  accuracy: number;
  best_time: number;
  solved_count: number;
};

export type TeacherScheduleEvent = {
  id: string;
  class_id: string;
  class_name: string;
  title: string;
  date: string;
  starts_at?: string;
  ends_at?: string;
  color: string;
};

export const MOCK_TEACHER_CLASSES: TeacherClass[] = [];
export const MOCK_STUDENTS: TeacherStudent[] = [];
export const MOCK_EVENTS: TeacherScheduleEvent[] = [];

export function formatRecordTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds <= 0) {
    return "기록 없음";
  }

  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(rest).padStart(2, "0")}`;
}

export function getStudentsByClass(classId: string) {
  return MOCK_STUDENTS.filter((student) => student.class_id === classId);
}

export function getClassRankings(classId?: string) {
  return MOCK_STUDENTS.filter((student) => !classId || student.class_id === classId)
    .map((student) => ({
      ...student,
      class_name:
        MOCK_TEACHER_CLASSES.find((classItem) => classItem.id === student.class_id)?.class_name ??
        "알 수 없는 수업",
    }))
    .sort((a, b) => {
      if (b.accuracy !== a.accuracy) {
        return b.accuracy - a.accuracy;
      }

      return a.best_time - b.best_time;
    });
}
