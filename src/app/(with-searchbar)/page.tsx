import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {/* 서비스 로고 영역 */}
        <div className={styles.logo_area}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>9U9U</h2>
        </div>

        {/* 메인 소개 문구 */}
        <div className={styles.intro}>
          <h1>고학년을 위한<br />똑똑한 구구단</h1>
          <p>
            지루한 암기 대신 즐거운 실전 연습.<br />
            11단부터 41단 소수 구구단까지 정복해 보세요.
          </p>
        </div>

        {/* 버튼 영역 (교사/학생 구분) */}
        <div className={styles.ctas}>
          <a href="/login/teacher" className={styles.primary}>
            선생님으로 시작하기
          </a>
          <a href="/login/student" className={styles.secondary}>
            학생 로그인
          </a>
        </div>
      </main>
    </div>
  );
}