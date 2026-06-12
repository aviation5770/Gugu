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
  color: string;
};

export const MOCK_TEACHER_CLASSES: TeacherClass[] = [
  {
    id: "class-1",
    class_name: "3학년 3반",
    grade: 3,
    room: 3,
    teacher_name: "정정자",
    class_code: "GG-3301",
    student_count: 24,
    todo_alert: "내일 오후 1:00 - 3단 시험",
    profile_color: "#083B4D",
    header_color: "#9145D4",
    description: "자동 생성된 기본 클래스입니다. 학생 번호 1번부터 24번까지 배정되어 있습니다.",
    created_at: "2026-05-20",
  },
  {
    id: "class-2",
    class_name: "5학년 2반",
    grade: 5,
    room: 2,
    teacher_name: "[게스트] 안형진",
    class_code: "GG-5211",
    student_count: 28,
    todo_alert: "이번주 금요일 - 11단 ~ 41단 50문제 시험",
    profile_color: "#9145D4",
    header_color: "#FA4541",
    description: "고학년 소수 구구단과 두 자릿수 곱셈을 함께 연습하는 클래스입니다.",
    created_at: "2026-05-22",
  },
];

export const MOCK_STUDENTS: TeacherStudent[] = [
  {
    id: "student-1",
    class_id: "class-1",
    student_number: 1,
    name: "김도윤",
    birth_date: "140101",
    password: "0101",
    memo: "곱셈 속도가 안정적입니다.",
    accuracy: 98,
    best_time: 74,
    solved_count: 86,
  },
  {
    id: "student-2",
    class_id: "class-1",
    student_number: 2,
    name: "이서연",
    birth_date: "140102",
    password: "0102",
    memo: "",
    accuracy: 94,
    best_time: 82,
    solved_count: 78,
  },
  {
    id: "student-3",
    class_id: "class-1",
    student_number: 3,
    name: "박민준",
    birth_date: "140103",
    password: "0103",
    memo: "현재 반 최고 기록 보유.",
    accuracy: 100,
    best_time: 58,
    solved_count: 104,
  },
  {
    id: "student-4",
    class_id: "class-1",
    student_number: 4,
    name: "최지우",
    birth_date: "140104",
    password: "0104",
    memo: "",
    accuracy: 91,
    best_time: 96,
    solved_count: 64,
  },
  {
    id: "student-5",
    class_id: "class-1",
    student_number: 5,
    name: "정하윤",
    birth_date: "140105",
    password: "0105",
    memo: "",
    accuracy: 89,
    best_time: 112,
    solved_count: 52,
  },
  {
    id: "student-6",
    class_id: "class-2",
    student_number: 1,
    name: "강서준",
    birth_date: "120301",
    password: "0301",
    memo: "",
    accuracy: 96,
    best_time: 69,
    solved_count: 92,
  },
  {
    id: "student-7",
    class_id: "class-2",
    student_number: 2,
    name: "윤지민",
    birth_date: "120302",
    password: "0302",
    memo: "장문제 집중도가 좋습니다.",
    accuracy: 100,
    best_time: 62,
    solved_count: 117,
  },
  {
    id: "student-8",
    class_id: "class-2",
    student_number: 3,
    name: "임하람",
    birth_date: "120303",
    password: "0303",
    memo: "",
    accuracy: 93,
    best_time: 88,
    solved_count: 73,
  },
];

export const MOCK_EVENTS: TeacherScheduleEvent[] = [
  {
    id: "evt-1",
    class_id: "class-1",
    class_name: "3학년 3반",
    title: "3단 시험",
    date: "2026-05-28",
    color: CLASS_THEME_COLORS[3],
  },
  {
    id: "evt-2",
    class_id: "class-2",
    class_name: "5학년 2반",
    title: "11단 ~ 41단 50문제 시험",
    date: "2026-05-15",
    color: CLASS_THEME_COLORS[5],
  },
  {
    id: "evt-3",
    class_id: "class-1",
    class_name: "3학년 3반",
    title: "오답 노트 점검",
    date: "2026-06-12",
    color: CLASS_THEME_COLORS[1],
  },
];

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
