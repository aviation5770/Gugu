export const LOCALE_COOKIE = "gugu_locale";
export const DEFAULT_LOCALE = "ko";
export const LOCALES = ["ko", "en"] as const;

export type Locale = (typeof LOCALES)[number];

type DictionaryValue = string | Dictionary;

interface Dictionary {
  [key: string]: DictionaryValue;
}

export const dictionaries = {
  ko: {
    common: {
      appName: "구구",
      studentMode: "학생 모드",
      teacherMode: "교사 모드",
      korean: "한국어",
      english: "English",
      language: "언어",
      loading: "불러오는 중입니다",
      retry: "다시 시도",
      home: "홈",
      dashboard: "대시보드",
      calendar: "캘린더",
      ranking: "전체 랭킹 보드",
      classes: "등록한 수업",
      createClass: "새로운 수업 만들기",
      profile: "선생님 프로필",
      editProfile: "프로필 편집",
      logout: "로그아웃",
      deleteAccount: "계정삭제",
      teacherSuffix: "선생님",
    },
    landing: {
      title: "초등 고학년을 위한\n특별한 소수 구구단 놀이터, '구구'",
      description:
        "유치한 유아용 연산 프로그램은 이제 그만! 고학년 맞춤형 무채색 톤 디자인에서 11단부터 41단까지 소수 곱셈과 타임 어택으로 수학 근육을 키워보세요.",
      valueTitle: "왜 구구와 함께 해야 할까요?",
      valueDescription:
        "고학년 학생의 흥미 유발과 선생님의 효율적인 학습 운영을 동시 보장합니다.",
      valueOneTitle: "고학년 특화 문제셋",
      valueOneText:
        "1단부터 9단까지의 단순 반복을 넘어, 11단~41단 소수 구구단 및 두 자릿수 곱셈을 수록하여 고난도 사고력을 길러줍니다.",
      valueTwoTitle: "시간 측정 및 랭킹 시스템",
      valueTwoText:
        "정답을 모두 맞출 때까지의 시간을 측정하는 타임 기록제와 학급 실시간 랭킹 제도를 도입해 승부욕과 몰입감을 선사합니다.",
      valueThreeTitle: "번거롭지 않은 자동화 행정",
      valueThreeText:
        "교사가 학생 수만 입력하면 자동으로 명단과 학번이 할당되며, 즉각적인 채점과 피드백 리포트가 시스템에서 자동 생성됩니다.",
      startTitle: "지금 바로 구구를 시작하세요",
      startDescription: "원하시는 로그인 모드를 선택하시면 해당 서비스로 즉시 연결됩니다.",
      studentTitle: "학생으로 입장하기",
      studentDescription: "회원가입 없이 발급받은 수업 코드로 즉시 진입",
      studentButton: "클래스 입장하기",
      teacherTitle: "선생님 공간",
      teacherDescription: "학급 생성, 명단 발급 및 실시간 종합 관리 환경",
      teacherButton: "교사 로그인 / 가입",
      faqTitle: "자주 묻는 질문 FAQ",
      faqDescription: "서비스 이용 전 궁금한 핵심 사항을 미리 확인해보세요.",
      questionOne: "학생들도 개별 회원가입을 해야 하나요?",
      answerOne:
        "아닙니다. 학생은 번거로운 절차 없이 교사가 공유해 준 고유 '수업 코드'와 배정된 학번만 입력하면 비밀번호 설정 후 간편하게 접속할 수 있습니다.",
      questionTwo: "11단~41단 문제는 초등학생에게 너무 어렵지 않을까요?",
      answerTwo:
        "본 서비스는 원리의 이해와 놀이형 타임어택 방식을 결합하여 고학년 수준에서 충분히 도전감을 느끼며 수학적 몰입감을 배울 수 있도록 구성되었습니다.",
      footer:
        "주소: 대구광역시 북구 대학로 80 | 대표번호: 123-4567\n사업자등록번호: 000-00-00000 | 통신판매업신고: 제 2026-대구북구-0000호",
      copyright: "© 2026 구구플러스(gugu+). All rights reserved.",
    },
    auth: {
      teacherLogin: "교사 로그인",
      login: "로그인",
      loggingIn: "로그인 중...",
      signup: "회원가입",
      signingUp: "가입 중...",
      email: "이메일",
      password: "비밀번호",
      confirmPassword: "비밀번호 확인",
      name: "이름",
      or: "또는",
      findPassword: "비밀번호 찾기",
      studentLogin: "학생 로그인",
      newToGugu: "구구에 처음 오셨나요?",
      alreadyHaveAccount: "이미 계정이 있으신가요?",
      passwordMismatch: "비밀번호가 일치하지 않습니다. 다시 확인해 주세요.",
    },
    system: {
      notFoundTitle: "페이지를 찾을 수 없습니다",
      notFoundDescription: "주소가 바뀌었거나 더 이상 제공되지 않는 화면입니다.",
      errorTitle: "문제가 발생했습니다",
      errorDescription: "잠시 후 다시 시도해 주세요.",
    },
  },
  en: {
    common: {
      appName: "Gugu",
      studentMode: "Student Mode",
      teacherMode: "Teacher Mode",
      korean: "한국어",
      english: "English",
      language: "Language",
      loading: "Loading",
      retry: "Try again",
      home: "Home",
      dashboard: "Dashboard",
      calendar: "Calendar",
      ranking: "Ranking Board",
      classes: "My Classes",
      createClass: "Create class",
      profile: "Teacher profile",
      editProfile: "Edit profile",
      logout: "Log out",
      deleteAccount: "Delete account",
      teacherSuffix: "teacher",
    },
    landing: {
      title: "A smarter multiplication playground\nfor upper elementary students, 'Gugu'",
      description:
        "Move beyond childish drill tools. Practice prime multiplication from 11 to 41 and two-digit products in a clean, focused interface built for older students.",
      valueTitle: "Why learn with Gugu?",
      valueDescription:
        "Gugu keeps older students engaged while giving teachers a faster way to manage practice.",
      valueOneTitle: "Advanced problem sets",
      valueOneText:
        "Students go beyond 1 to 9 times tables with prime multiplication from 11 to 41 and two-digit multiplication practice.",
      valueTwoTitle: "Timed records and rankings",
      valueTwoText:
        "Timed solving and class rankings turn repeated practice into focused, measurable progress.",
      valueThreeTitle: "Automated class setup",
      valueThreeText:
        "Teachers enter the class size once, and Gugu creates student numbers and a class code automatically.",
      startTitle: "Start using Gugu today",
      startDescription: "Choose the mode that fits how you want to enter the service.",
      studentTitle: "Enter as a student",
      studentDescription: "Join instantly with a class code from your teacher.",
      studentButton: "Enter class",
      teacherTitle: "Teacher workspace",
      teacherDescription: "Create classes, issue rosters, and monitor progress in one place.",
      teacherButton: "Teacher login / signup",
      faqTitle: "Frequently Asked Questions",
      faqDescription: "Quick answers before you start.",
      questionOne: "Do students need individual accounts?",
      answerOne:
        "No. Students can join with a class code, assigned student number, and birthday-based password.",
      questionTwo: "Are 11 to 41 times tables too hard for elementary students?",
      answerTwo:
        "Gugu combines concept practice with timed play so older elementary students can feel challenged without losing focus.",
      footer:
        "Address: 80 Daehak-ro, Buk-gu, Daegu | Tel: 123-4567\nBusiness registration: 000-00-00000 | Mail-order report: 2026-DaeguBukgu-0000",
      copyright: "© 2026 Gugu Plus. All rights reserved.",
    },
    auth: {
      teacherLogin: "Teacher login",
      login: "Log in",
      loggingIn: "Logging in...",
      signup: "Sign up",
      signingUp: "Signing up...",
      email: "Email",
      password: "Password",
      confirmPassword: "Confirm password",
      name: "Name",
      or: "or",
      findPassword: "Find password",
      studentLogin: "Student login",
      newToGugu: "New to Gugu?",
      alreadyHaveAccount: "Already have an account?",
      passwordMismatch: "Passwords do not match. Please check again.",
    },
    system: {
      notFoundTitle: "Page not found",
      notFoundDescription: "This page may have moved or no longer exists.",
      errorTitle: "Something went wrong",
      errorDescription: "Please try again in a moment.",
    },
  },
} satisfies Record<Locale, Dictionary>;

export function isLocale(value: string | undefined): value is Locale {
  return LOCALES.includes(value as Locale);
}

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}
