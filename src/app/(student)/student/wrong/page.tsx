"use client";

import { useEffect, useState } from "react";
import StudentAppChrome from "../_components/StudentAppChrome";
import * as S from "../student.styles";

type Attempt = {
  left: number;
  right: number;
  answer: number;
  userAnswer: string;
  isCorrect: boolean;
  bookmarked: boolean;
  index: number;
};

type LastAttemptsPayload = {
  mode: string;
  problemCount: number;
  correctCount: number;
  elapsedSeconds: number;
  attempts: Attempt[];
  endedAt?: number;
};

export default function WrongNotePage() {
  const [payload, setPayload] = useState<LastAttemptsPayload | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("last_attempts");
      if (!raw) return;
      const parsed = JSON.parse(raw) as LastAttemptsPayload;
      // 
      setPayload(parsed);
    } catch (e) {
      // ignore
    }
  }, []);

  const wrongs = payload?.attempts?.filter((a) => !a.isCorrect) ?? [];

  return (
    <>
      <StudentAppChrome />

      <S.StudentPlayContainer>
        <S.PlayGrid>
          <S.PlayMainCard>
            <S.Panel>
              <S.PanelTitle>오답노트</S.PanelTitle>
              {!payload ? (
                <S.Muted>최근 세션의 기록이 없습니다.</S.Muted>
              ) : wrongs.length === 0 ? (
                <S.Muted>최근 세션에서 틀린 문제가 없습니다.</S.Muted>
              ) : (
                <S.ReviewList>
                  {wrongs.map((p) => (
                    <S.ReviewItem key={`${p.index}-${p.left}-${p.right}`}>
                      <strong>
                        {p.index + 1}. {p.left} × {p.right}
                      </strong>
                      <span>
                        내 답 {p.userAnswer || "(미응답)"} · 정답 {p.answer}
                      </span>
                      {p.bookmarked ? <em>책갈피</em> : null}
                    </S.ReviewItem>
                  ))}
                </S.ReviewList>
              )}
            </S.Panel>
          </S.PlayMainCard>

          <S.PlaySideStack>
            <S.Panel>
              <S.PanelTitle>최근 세션</S.PanelTitle>
              {payload ? (
                <>
                  <S.Notice>
                    {payload.mode} · {payload.correctCount}/{payload.problemCount} · {payload.elapsedSeconds}s
                  </S.Notice>
                </>
              ) : (
                <S.Muted>기록 없음</S.Muted>
              )}
            </S.Panel>
          </S.PlaySideStack>
        </S.PlayGrid>
      </S.StudentPlayContainer>
    </>
  );
}
