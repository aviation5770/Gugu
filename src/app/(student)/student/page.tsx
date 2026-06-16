"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  loadStudentWorkspaceAction,
  studentLogoutAction,
  updateStudentProfileAction,
} from "@/app/actions/student";
import type { StudentWorkspace } from "@/app/actions/student";
import * as S from "./student.styles";

function formatSeconds(seconds: number) {
  if (!seconds) {
    return "기록 없음";
  }

  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(rest).padStart(2, "0")}`;
}

export default function StudentInfoPage() {
  const router = useRouter();
  const [workspace, setWorkspace] = useState<StudentWorkspace | null>(null);
  const [name, setName] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function load() {
      const result = await loadStudentWorkspaceAction();

      if (!isMounted) {
        return;
      }

      if (!result.success) {
        setMessage(result.error);
        return;
      }

      setWorkspace(result.data);
      setName(result.data.profile.name);
      setProfileImageUrl(result.data.profile.profileImageUrl ?? "");
    }

    load();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSave = async () => {
    const result = await updateStudentProfileAction({ name, profileImageUrl });

    if (!result.success) {
      setMessage(result.error);
      return;
    }

    setWorkspace((prev) => prev ? { ...prev, profile: result.data } : prev);
    setMessage("프로필을 저장했습니다.");
  };

  const handleLogout = async () => {
    await studentLogoutAction();
    router.push("/login/student");
  };

  if (!workspace) {
    return <S.Shell><S.Container><S.Panel>{message || "불러오는 중입니다..."}</S.Panel></S.Container></S.Shell>;
  }

  const myRanking = workspace.rankings.find((ranking) => ranking.isMe);
  const bestRecord = workspace.records
    .slice()
    .sort((a, b) => {
      if (b.accuracy !== a.accuracy) {
        return b.accuracy - a.accuracy;
      }

      return a.elapsedSeconds - b.elapsedSeconds;
    })[0];

  return (
    <S.Shell>
      <S.Header>
        <S.Brand>
          <strong>내 정보</strong>
          <span>{workspace.profile.className} · {workspace.profile.studentNumber}번</span>
        </S.Brand>
        <S.Nav>
          <S.NavLink href="/student/play">연습/시험</S.NavLink>
          <S.NavLink href="/student/ranking">랭킹보기</S.NavLink>
          <S.NavLink href="/student">내 정보</S.NavLink>
        </S.Nav>
      </S.Header>

      <S.Container>
        <S.Grid>
          <S.Panel>
            <S.PanelTitle>프로필 정보</S.PanelTitle>
            <S.OptionGrid>
              <S.Field>
                이름
                <S.Input value={name} onChange={(event) => setName(event.target.value)} />
              </S.Field>
              <S.Field>
                프로필 사진 URL
                <S.Input
                  value={profileImageUrl}
                  onChange={(event) => setProfileImageUrl(event.target.value)}
                />
              </S.Field>
            </S.OptionGrid>
            {message ? <S.Notice>{message}</S.Notice> : null}
            <S.ButtonRow>
              <S.Button type="button" $variant="primary" onClick={handleSave}>
                프로필 저장
              </S.Button>
              <S.Button type="button" $variant="danger" onClick={handleLogout}>
                로그아웃
              </S.Button>
            </S.ButtonRow>
          </S.Panel>

          <S.Panel>
            <S.PanelTitle>내 기록</S.PanelTitle>
            <S.StatGrid>
              <S.StatCard>
                <span>랭킹</span>
                <strong>{myRanking ? `${myRanking.rank}위` : "기록 없음"}</strong>
              </S.StatCard>
              <S.StatCard>
                <span>최고 정확도</span>
                <strong>{bestRecord ? `${bestRecord.accuracy}%` : "0%"}</strong>
              </S.StatCard>
              <S.StatCard>
                <span>최고 속도</span>
                <strong>{bestRecord ? formatSeconds(bestRecord.elapsedSeconds) : "기록 없음"}</strong>
              </S.StatCard>
            </S.StatGrid>
          </S.Panel>
        </S.Grid>
      </S.Container>
    </S.Shell>
  );
}
