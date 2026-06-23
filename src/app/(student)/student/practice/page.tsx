"use client";

import Image from "next/image";
import StudentAppChrome from "../_components/StudentAppChrome";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  loadStudentWorkspaceAction,
  submitStudentRecordAction,
} from "@/app/actions/student";
import type { StudentWorkspace } from "@/app/actions/student";
import * as S from "../student.styles";
import LoadingSpinner from "@/components/LoadingSpinner";

type PracticeMode = "prime_random" | "two_digit";

type Problem = {
  left: number;
  right: number;
  answer: number;
};

type AttemptedProblem = Problem & {
  index: number;
  userAnswer: string;
  isCorrect: boolean;
  bookmarked: boolean;
};

const PRIME_TABLES = [11, 13, 17, 19, 23, 29, 31, 37, 41];
const COUNTS = [10, 20, 30, 50, 100];

function formatSeconds(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(rest).padStart(2, "0")}`;
}

function makeProblem(
  mode: PracticeMode,
  selectedTables: number[],
  index: number,
  ordered: boolean,
): Problem {
  if (mode === "two_digit") {
    const left = Math.floor(10 + Math.random() * 90);
    const right = Math.floor(10 + Math.random() * 90);

    return { left, right, answer: left * right };
  }

  const tablePool = selectedTables.length ? selectedTables : PRIME_TABLES;
  const left = ordered
    ? tablePool[index % tablePool.length]
    : tablePool[Math.floor(Math.random() * tablePool.length)];
  const right = Math.floor(2 + Math.random() * 10);

  return { left, right, answer: left * right };
}

export default function StudentPracticePage() {
  const [workspace, setWorkspace] = useState<StudentWorkspace | null>(null);
  const [error, setError] = useState("");
  const [mode, setMode] = useState<PracticeMode>("prime_random");
  const [problemCount, setProblemCount] = useState(10);
  const [selectedTables, setSelectedTables] = useState<number[]>(PRIME_TABLES);
  const [isOrdered, setIsOrdered] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [isExam, setIsExam] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentProblem, setCurrentProblem] = useState<Problem | null>(null);
  const [answer, setAnswer] = useState("");
  const [correctCount, setCorrectCount] = useState(0);
  const [startedAt, setStartedAt] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [resultMessage, setResultMessage] = useState("");
  const [attempts, setAttempts] = useState<AttemptedProblem[]>([]);
  const [bookmarkedIndexes, setBookmarkedIndexes] = useState<number[]>([]);
  const [showReviewList, setShowReviewList] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;

    async function load() {
      const result = await loadStudentWorkspaceAction();

      if (!isMounted) return;

      if (!result.success) {
        if (result.error && result.error.includes("로그인")) {
          router.replace("/login/student");
          return;
        }

        setError(result.error);
        return;
      }

      setWorkspace(result.data);
    }

    load();

    return () => {
      isMounted = false;
    };
  }, [router]);

  useEffect(() => {
    if (!isRunning) return;

    const timer = window.setInterval(() => {
      setElapsed(Math.max(0, Math.floor((Date.now() - startedAt) / 1000)));
    }, 300);

    return () => window.clearInterval(timer);
  }, [isRunning, startedAt]);

  // use server-provided nextExam (computed on server) to avoid client-side date logic
  const upcomingSchedule = workspace?.nextExam ?? null;

  const wrongProblems = attempts.filter((attempt) => !attempt.isCorrect);
  const currentBookmarked = bookmarkedIndexes.includes(currentIndex);
  const progressPercent = isRunning
    ? Math.round(((currentIndex + 1) / problemCount) * 100)
    : 0;

  const startSession = (nextIsExam: boolean) => {
    if (nextIsExam && !workspace?.activeExam) {
      window.alert("현재 시험 응시 시간이 아닙니다.");
      return;
    }

    setIsExam(nextIsExam || false);
    setIsRunning(true);
    setCurrentIndex(0);
    setCorrectCount(0);
    setElapsed(0);
    setResultMessage("");
    setAttempts([]);
    setBookmarkedIndexes([]);
    setShowReviewList(false);
    setStartedAt(Date.now());
    setCurrentProblem(makeProblem(mode, selectedTables, 0, isOrdered));
  };

  // bookmark toggling kept for potential future use

  const submitAnswer = async () => {
    if (!currentProblem) return;

    const userAnswer = answer.trim();

    if (!userAnswer) {
      setResultMessage("정답을 입력해 주세요.");
      return;
    }

    const isCorrect = Number(userAnswer) === currentProblem.answer;
    const submittedAttempt: AttemptedProblem = {
      ...currentProblem,
      index: currentIndex,
      userAnswer,
      isCorrect,
      bookmarked: bookmarkedIndexes.includes(currentIndex),
    };
    const nextAttempts = [...attempts, submittedAttempt];
    const nextCorrectCount = isCorrect ? correctCount + 1 : correctCount;
    const nextIndex = currentIndex + 1;

    setAttempts(nextAttempts);
    setCorrectCount(nextCorrectCount);
    setAnswer("");
    setResultMessage("");

    if (nextIndex >= problemCount) {
      setIsRunning(false);
      setShowReviewList(nextAttempts.some((attempt) => !attempt.isCorrect));
      const totalElapsed = Math.max(1, Math.floor((Date.now() - startedAt) / 1000));
      // persist last attempts locally so 오답노트 page can show them
      try {
        const payload = {
          mode: isExam ? "exam" : mode,
          problemCount,
          correctCount: nextCorrectCount,
          elapsedSeconds: totalElapsed,
          attempts: nextAttempts,
          endedAt: Date.now(),
        };
        localStorage.setItem("last_attempts", JSON.stringify(payload));
      } catch {
        /* ignore storage errors */
      }

      const result = await submitStudentRecordAction({
        mode: isExam ? "exam" : mode,
        problemCount,
        correctCount: nextCorrectCount,
        elapsedSeconds: totalElapsed,
      });

      if (!result.success) {
        setResultMessage(result.error);
        return;
      }

      const nextWrongCount = nextAttempts.filter((attempt) => !attempt.isCorrect).length;
      setResultMessage(
        `완료! ${nextCorrectCount}/${problemCount}문항, ${formatSeconds(totalElapsed)} · 오답 ${nextWrongCount}개`,
      );
      return;
    }

    setCurrentIndex(nextIndex);
    setCurrentProblem(makeProblem(mode, selectedTables, nextIndex, isOrdered));
  };

  const toggleTable = (table: number) => {
    setSelectedTables((prev) =>
      prev.includes(table) ? prev.filter((item) => item !== table) : [...prev, table].sort((a, b) => a - b),
    );
  };

  // mark as '모르겠어요' and skip to next problem (bookmarked, incorrect)
  const markDontKnow = async () => {
    if (!currentProblem) return;

    const submittedAttempt: AttemptedProblem = {
      ...currentProblem,
      index: currentIndex,
      userAnswer: "",
      isCorrect: false,
      bookmarked: true,
    };

    const nextAttempts = [...attempts, submittedAttempt];
    const nextIndex = currentIndex + 1;

    setAttempts(nextAttempts);
    setBookmarkedIndexes((prev) => (prev.includes(currentIndex) ? prev : [...prev, currentIndex]));
    setAnswer("");

    if (nextIndex >= problemCount) {
      setIsRunning(false);
      setShowReviewList(nextAttempts.some((attempt) => !attempt.isCorrect));
      const totalElapsed = Math.max(1, Math.floor((Date.now() - startedAt) / 1000));
      // persist last attempts locally so 오답노트 page can show them
      try {
        const payload = {
          mode: isExam ? "exam" : mode,
          problemCount,
          correctCount,
          elapsedSeconds: totalElapsed,
          attempts: nextAttempts,
          endedAt: Date.now(),
        };
        localStorage.setItem("last_attempts", JSON.stringify(payload));
      } catch {
        /* ignore storage errors */
      }

      const result = await submitStudentRecordAction({
        mode: isExam ? "exam" : mode,
        problemCount,
        correctCount,
        elapsedSeconds: totalElapsed,
      });

      if (!result.success) {
        setResultMessage(result.error);
        return;
      }

      const nextWrongCount = nextAttempts.filter((attempt) => !attempt.isCorrect).length;
      setResultMessage(
        `완료! ${correctCount}/${problemCount}문항, ${formatSeconds(totalElapsed)} · 오답 ${nextWrongCount}개`,
      );
      return;
    }

    setCurrentIndex(nextIndex);
    setCurrentProblem(makeProblem(mode, selectedTables, nextIndex, isOrdered));
  };

  if (error) {
    return (
      <S.Shell>
        <S.Container>
          <S.Panel>
            <S.PanelTitle>학생 화면 오류</S.PanelTitle>
            <S.Muted>{error}</S.Muted>
          </S.Panel>
        </S.Container>
      </S.Shell>
    );
  }

  if (!workspace) {
    return (
      <S.Shell>
        <S.Container>
          <LoadingSpinner />
        </S.Container>
      </S.Shell>
    );
  }

  return (
    <S.Shell>
      <StudentAppChrome />

      <S.StudentPlayContainer>
        {upcomingSchedule ? (
          <S.StudentNotice>
            <span>다가오는 시험: {upcomingSchedule.title}</span>
            <span>
              {new Date(upcomingSchedule.startsAt).toLocaleString("ko-KR")} - {" "}
              {new Date(upcomingSchedule.endsAt).toLocaleTimeString("ko-KR", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </S.StudentNotice>
        ) : null}

        <S.PlayGrid>
          <S.PlayMainCard>
            {!isRunning ? (
              <>
                <S.LearningHero>
                  <S.MascotBubble>
                    <Image
                      src="/images/gugu.svg"
                      alt="Gugu"
                      fill
                      sizes="128px"
                      style={{ objectFit: "contain" }}
                    />
                  </S.MascotBubble>
                  <S.LearningHeroText>
                    <span>오늘의 학습</span>
                    <strong>구구단 탐험을 시작해요</strong>
                    <p>{problemCount}문제를 풀고 내 기록을 세워 보세요.</p>
                  </S.LearningHeroText>
                  <S.GoalRing>
                    <strong>{problemCount}</strong>
                    <span>문제</span>
                  </S.GoalRing>
                </S.LearningHero>

                <S.ColorSection>
                  <S.ColorSectionTitle>연습 종류</S.ColorSectionTitle>
                  <S.ModeCardGrid>
                    <S.ModeCardButton
                      type="button"
                      $active={mode === "prime_random"}
                      $tone="mint"
                      onClick={() => setMode("prime_random")}
                    >
                      <span>소수 구구단</span>
                      <strong>11단부터 41단까지</strong>
                    </S.ModeCardButton>
                    <S.ModeCardButton
                      type="button"
                      $active={mode === "two_digit"}
                      $tone="blue"
                      onClick={() => setMode("two_digit")}
                    >
                      <span>두 자릿수 곱셈</span>
                      <strong>빠르게 계산하기</strong>
                    </S.ModeCardButton>
                  </S.ModeCardGrid>
                </S.ColorSection>

                <S.ColorSection>
                  <S.ColorSectionTitle>문제 수</S.ColorSectionTitle>
                  <S.CountButtonGrid>
                    {COUNTS.map((count) => (
                      <S.CountButton
                        key={count}
                        type="button"
                        $active={problemCount === count}
                        onClick={() => setProblemCount(count)}
                      >
                        {count}
                      </S.CountButton>
                    ))}
                  </S.CountButtonGrid>
                </S.ColorSection>

                <S.ColorSection>
                  <div style={{ minHeight: 120 }}>
                    {mode === "prime_random" ? (
                      <>
                        <S.ColorSectionTitle>출제할 단</S.ColorSectionTitle>
                        <S.TableChipGrid>
                          {PRIME_TABLES.map((table) => (
                            <S.TableChip
                              key={table}
                              type="button"
                              $active={selectedTables.includes(table)}
                              onClick={() => toggleTable(table)}
                            >
                              {table}단
                            </S.TableChip>
                          ))}
                        </S.TableChipGrid>
                        <S.ToggleLine>
                          <input
                            type="checkbox"
                            checked={isOrdered}
                            onChange={(event) => setIsOrdered(event.target.checked)}
                          />
                          선택한 단 순서대로 출제
                        </S.ToggleLine>
                      </>
                    ) : null}
                  </div>
                </S.ColorSection>

                <S.PrimaryPlayActions>
                  <>
                    <S.StartButton type="button" $tone="purple" onClick={() => startSession(false)}>
                      연습하기
                    </S.StartButton>
                    {workspace.activeExam ? (
                      <S.StartButton type="button" $tone="orange" onClick={() => router.push("/student/exam")}>
                        시험보기
                      </S.StartButton>
                    ) : (
                      <S.StartButton type="button" $tone="orange" disabled>
                        시험보기
                      </S.StartButton>
                    )}
                    <S.StartButton type="button" $tone="green" onClick={() => router.push("/student/wrong")}>
                      오답노트
                    </S.StartButton>
                  </>
                </S.PrimaryPlayActions>
                {!workspace.activeExam ? (
                  <S.PlayHint>시험보기는 선생님이 지정한 시간에만 열립니다.</S.PlayHint>
                ) : null}
              </>
            ) : (
              <S.StudyStage>
                <S.StudyTopBar>
                  <S.ProgressPill>
                    <span>{currentIndex + 1}/{problemCount}</span>
                    <S.ProgressTrack>
                      <S.ProgressFill $percent={progressPercent} />
                    </S.ProgressTrack>
                  </S.ProgressPill>
                  <S.TimerBadge>{formatSeconds(elapsed)}</S.TimerBadge>
                </S.StudyTopBar>

                <S.StudyMetaRow>
                  <S.LevelBadge>
                    {isExam ? "시험" : "연습"} {currentIndex + 1}
                  </S.LevelBadge>
                  <S.BookmarkButton
                    type="button"
                    $active={currentBookmarked}
                    onClick={markDontKnow}
                  >
                    {currentBookmarked ? "책갈피 완료" : "모르겠어요"}
                  </S.BookmarkButton>
                </S.StudyMetaRow>

                <S.MathQuestionCard>
                  <S.QuestionTypeLabel>
                    {mode === "prime_random" ? "소수 구구단" : "두 자릿수 곱셈"}
                  </S.QuestionTypeLabel>
                  <S.BigProblemText>
                    {currentProblem?.left} × {currentProblem?.right}
                  </S.BigProblemText>
                  <S.AnswerBubble>
                    <S.AnswerInput
                      inputMode="numeric"
                      value={answer}
                      onChange={(event) => setAnswer(event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          void submitAnswer();
                        }
                      }}
                      placeholder="정답"
                      autoFocus
                    />
                  </S.AnswerBubble>
                </S.MathQuestionCard>

                <S.PlayControlGrid>
                  <S.ControlButton type="button" $tone="yellow" onClick={() => setAnswer("")}>
                    지우기
                  </S.ControlButton>
                  <S.ControlButton type="button" $tone="mint" onClick={markDontKnow}>
                    책갈피
                  </S.ControlButton>
                  <S.ControlButton type="button" $tone="blue" onClick={submitAnswer}>
                    다음 문제
                  </S.ControlButton>
                </S.PlayControlGrid>
              </S.StudyStage>
            )}
            {resultMessage ? <S.StudentResultNotice>{resultMessage}</S.StudentResultNotice> : null}
          </S.PlayMainCard>

          <S.PlaySideStack>
            <S.ReviewCard>
              <S.ReviewHeader>
                <div>
                  <span>오답 노트</span>
                  <strong>{wrongProblems.length}개</strong>
                </div>
                <S.SmallToggleButton
                  type="button"
                  onClick={() => setShowReviewList((prev) => !prev)}
                  disabled={wrongProblems.length === 0}
                >
                  {showReviewList ? "접기" : "틀린 문제 보기"}
                </S.SmallToggleButton>
              </S.ReviewHeader>
              {showReviewList ? (
                <S.ReviewList>
                  {wrongProblems.length === 0 ? (
                    <S.Muted>아직 틀린 문제가 없습니다.</S.Muted>
                  ) : (
                    wrongProblems.map((problem) => (
                      <S.ReviewItem key={`${problem.index}-${problem.left}-${problem.right}`}>
                        <strong>
                          {problem.index + 1}. {problem.left} × {problem.right}
                        </strong>
                        <span>
                          내 답 {problem.userAnswer} · 정답 {problem.answer}
                        </span>
                        {problem.bookmarked ? <em>책갈피</em> : null}
                      </S.ReviewItem>
                    ))
                  )}
                </S.ReviewList>
              ) : (
                <S.ReviewSummaryGrid>
                  <S.ReviewMiniStat>
                    <span>푼 문제</span>
                    <strong>{attempts.length}</strong>
                  </S.ReviewMiniStat>
                  <S.ReviewMiniStat>
                    <span>책갈피</span>
                    <strong>{bookmarkedIndexes.length}</strong>
                  </S.ReviewMiniStat>
                </S.ReviewSummaryGrid>
              )}
            </S.ReviewCard>

            <S.Panel>
              <S.PanelTitle>최근 내 기록</S.PanelTitle>
              {workspace.records.length === 0 ? (
                <S.Muted>아직 저장된 기록이 없습니다.</S.Muted>
              ) : (
                workspace.records.slice(0, 6).map((record) => (
                  <S.Notice key={record.id}>
                    {record.mode} · {record.accuracy}% · {formatSeconds(record.elapsedSeconds)}
                  </S.Notice>
                ))
              )}
            </S.Panel>
          </S.PlaySideStack>
        </S.PlayGrid>
      </S.StudentPlayContainer>
    </S.Shell>
  );
}
