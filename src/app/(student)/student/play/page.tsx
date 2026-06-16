"use client";

import { useEffect, useMemo, useState } from "react";
import {
  loadStudentWorkspaceAction,
  submitStudentRecordAction,
} from "@/app/actions/student";
import type { StudentWorkspace } from "@/app/actions/student";
import * as S from "../student.styles";

type Problem = {
  left: number;
  right: number;
  answer: number;
};

const PRIME_TABLES = [11, 13, 17, 19, 23, 29, 31, 37, 41];
const COUNTS = [10, 20, 30, 50, 100];

function formatSeconds(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(rest).padStart(2, "0")}`;
}

function makeProblem(mode: string, selectedTables: number[], index: number, ordered: boolean): Problem {
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

export default function StudentPlayPage() {
  const [workspace, setWorkspace] = useState<StudentWorkspace | null>(null);
  const [error, setError] = useState("");
  const [mode, setMode] = useState("prime_random");
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

  useEffect(() => {
    let isMounted = true;

    async function load() {
      const result = await loadStudentWorkspaceAction();

      if (!isMounted) {
        return;
      }

      if (!result.success) {
        setError(result.error);
        return;
      }

      setWorkspace(result.data);
    }

    load();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!isRunning) {
      return;
    }

    const timer = window.setInterval(() => {
      setElapsed(Math.max(0, Math.floor((Date.now() - startedAt) / 1000)));
    }, 300);

    return () => window.clearInterval(timer);
  }, [isRunning, startedAt]);

  const upcomingSchedule = useMemo(() => {
    if (!workspace) {
      return null;
    }

    return workspace.schedules[0] ?? null;
  }, [workspace]);

  const startSession = (nextIsExam: boolean) => {
    if (nextIsExam && !workspace?.activeExam) {
      window.alert("현재 시험 응시 시간이 아닙니다.");
      return;
    }

    setIsExam(nextIsExam);
    setIsRunning(true);
    setCurrentIndex(0);
    setCorrectCount(0);
    setElapsed(0);
    setResultMessage("");
    setStartedAt(Date.now());
    setCurrentProblem(makeProblem(mode, selectedTables, 0, isOrdered));
  };

  const submitAnswer = async () => {
    if (!currentProblem) {
      return;
    }

    const nextCorrectCount = Number(answer) === currentProblem.answer ? correctCount + 1 : correctCount;
    const nextIndex = currentIndex + 1;

    setCorrectCount(nextCorrectCount);
    setAnswer("");

    if (nextIndex >= problemCount) {
      setIsRunning(false);
      const totalElapsed = Math.max(1, Math.floor((Date.now() - startedAt) / 1000));
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

      setResultMessage(
        `완료: ${nextCorrectCount}/${problemCount}문항, ${formatSeconds(totalElapsed)}`,
      );
      return;
    }

    setCurrentIndex(nextIndex);
    setCurrentProblem(makeProblem(mode, selectedTables, nextIndex, isOrdered));
  };

  const toggleTable = (table: number) => {
    setSelectedTables((prev) =>
      prev.includes(table)
        ? prev.filter((item) => item !== table)
        : [...prev, table].sort((a, b) => a - b),
    );
  };

  if (error) {
    return (
      <S.Shell>
        <S.Container>
          <S.Panel><S.PanelTitle>학생 화면 오류</S.PanelTitle><S.Muted>{error}</S.Muted></S.Panel>
        </S.Container>
      </S.Shell>
    );
  }

  if (!workspace) {
    return <S.Shell><S.Container><S.Panel>불러오는 중입니다...</S.Panel></S.Container></S.Shell>;
  }

  return (
    <S.Shell>
      <S.Header>
        <S.Brand>
          <strong>{workspace.profile.className}</strong>
          <span>{workspace.profile.studentNumber}번 {workspace.profile.name}</span>
        </S.Brand>
        <S.Nav>
          <S.NavLink href="/student/play">연습/시험</S.NavLink>
          <S.NavLink href="/student/ranking">랭킹보기</S.NavLink>
          <S.NavLink href="/student">내 정보</S.NavLink>
        </S.Nav>
      </S.Header>

      <S.Container>
        {upcomingSchedule ? (
          <S.Notice>
            <span>다가오는 시험: {upcomingSchedule.title}</span>
            <span>{new Date(upcomingSchedule.startsAt).toLocaleString("ko-KR")} - {new Date(upcomingSchedule.endsAt).toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" })}</span>
          </S.Notice>
        ) : (
          <S.Notice>등록된 시험 일정이 없습니다.</S.Notice>
        )}

        <S.Grid>
          <S.Panel>
            <S.PanelTitle>{isRunning ? "문제 풀이" : "연습 설정"}</S.PanelTitle>
            {!isRunning ? (
              <>
                <S.OptionGrid>
                  <S.Field>
                    연습 종류
                    <S.Select value={mode} onChange={(event) => setMode(event.target.value)}>
                      <option value="prime_random">소수 구구단 연습</option>
                      <option value="two_digit">두 자릿수 곱셈 연습</option>
                    </S.Select>
                  </S.Field>
                  <S.Field>
                    문제 수
                    <S.Select
                      value={problemCount}
                      onChange={(event) => setProblemCount(Number(event.target.value))}
                    >
                      {COUNTS.map((count) => (
                        <option key={count} value={count}>{count}문제</option>
                      ))}
                    </S.Select>
                  </S.Field>
                </S.OptionGrid>

                {mode === "prime_random" ? (
                  <S.Panel style={{ boxShadow: "none", marginBottom: 16 }}>
                    <S.Muted style={{ marginBottom: 10 }}>출제할 단 선택</S.Muted>
                    <S.ButtonRow>
                      {PRIME_TABLES.map((table) => (
                        <S.Button
                          key={table}
                          type="button"
                          $variant={selectedTables.includes(table) ? "primary" : undefined}
                          onClick={() => toggleTable(table)}
                        >
                          {table}단
                        </S.Button>
                      ))}
                    </S.ButtonRow>
                    <label style={{ display: "inline-flex", gap: 8, marginTop: 12, fontSize: 13, fontWeight: 800 }}>
                      <input
                        type="checkbox"
                        checked={isOrdered}
                        onChange={(event) => setIsOrdered(event.target.checked)}
                      />
                      선택한 단 순서대로 출제
                    </label>
                  </S.Panel>
                ) : null}

                <S.ButtonRow>
                  <S.Button type="button" $variant="primary" onClick={() => startSession(false)}>
                    연습하기
                  </S.Button>
                  <S.Button
                    type="button"
                    $variant="primary"
                    onClick={() => startSession(true)}
                    disabled={!workspace.activeExam}
                  >
                    시험보기
                  </S.Button>
                </S.ButtonRow>
                {!workspace.activeExam ? (
                  <S.Muted style={{ marginTop: 10 }}>
                    시험보기는 선생님이 지정한 시간에만 활성화됩니다.
                  </S.Muted>
                ) : null}
              </>
            ) : (
              <S.ProblemCard>
                <S.Muted>
                  {currentIndex + 1}/{problemCount} · {formatSeconds(elapsed)}
                </S.Muted>
                <strong>{currentProblem?.left} × {currentProblem?.right}</strong>
                <S.Input
                  inputMode="numeric"
                  value={answer}
                  onChange={(event) => setAnswer(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      submitAnswer();
                    }
                  }}
                  autoFocus
                />
                <S.Button type="button" $variant="primary" onClick={submitAnswer}>
                  제출
                </S.Button>
              </S.ProblemCard>
            )}
            {resultMessage ? <S.Notice style={{ marginTop: 16 }}>{resultMessage}</S.Notice> : null}
          </S.Panel>

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
        </S.Grid>
      </S.Container>
    </S.Shell>
  );
}
