"use client";

import { useEffect, useState } from "react";
import { loadStudentWorkspaceAction } from "@/app/actions/student";
import type { StudentWorkspace } from "@/app/actions/student";
import * as S from "../student.styles";

function formatSeconds(seconds: number) {
  if (!seconds) {
    return "기록 없음";
  }

  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(rest).padStart(2, "0")}`;
}

export default function StudentRankingPage() {
  const [workspace, setWorkspace] = useState<StudentWorkspace | null>(null);
  const [error, setError] = useState("");

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

  if (error) {
    return <S.Shell><S.Container><S.Panel>{error}</S.Panel></S.Container></S.Shell>;
  }

  if (!workspace) {
    return <S.Shell><S.Container><S.Panel>불러오는 중입니다...</S.Panel></S.Container></S.Shell>;
  }

  const myRanking = workspace.rankings.find((ranking) => ranking.isMe);

  return (
    <S.Shell>
      <S.Header>
        <S.Brand>
          <strong>{workspace.profile.className} 랭킹</strong>
          <span>정확도와 속도 기준</span>
        </S.Brand>
        <S.Nav>
          <S.NavLink href="/student/play">연습/시험</S.NavLink>
          <S.NavLink href="/student/ranking">랭킹보기</S.NavLink>
          <S.NavLink href="/student">내 정보</S.NavLink>
        </S.Nav>
      </S.Header>

      <S.Container>
        <S.Panel>
          <S.PanelTitle>클래스 랭킹</S.PanelTitle>
          {workspace.rankings.length === 0 ? (
            <S.Muted>아직 랭킹 기록이 없습니다.</S.Muted>
          ) : (
            workspace.rankings.map((ranking) => (
              <S.RankingRow
                key={ranking.studentId}
                href="/student"
                $isMe={ranking.isMe}
              >
                <strong>{ranking.rank}위</strong>
                <span>{ranking.studentNumber}번 {ranking.name}</span>
                <span>{ranking.accuracy}%</span>
                <span>{formatSeconds(ranking.elapsedSeconds)}</span>
              </S.RankingRow>
            ))
          )}
          {myRanking ? (
            <S.FixedMine>
              <strong>내 기록: {myRanking.rank}위</strong>
              <S.Muted>
                정확도 {myRanking.accuracy}% · 속도 {formatSeconds(myRanking.elapsedSeconds)} · 누적 {myRanking.solvedCount}문항
              </S.Muted>
            </S.FixedMine>
          ) : null}
        </S.Panel>
      </S.Container>
    </S.Shell>
  );
}
