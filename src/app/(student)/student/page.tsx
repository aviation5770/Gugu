"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import StudentAppChrome from "./_components/StudentAppChrome";
import {
  loadStudentWorkspaceAction,
  studentLogoutAction,
  updateStudentProfileAction,
} from "@/app/actions/student";
import { supabase } from "@/utils/supabase";
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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
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
    let finalImageUrl = profileImageUrl;

    if (selectedFile && workspace) {
      try {
        const studentId = workspace.profile.id;
        const path = `profiles/students/${studentId}/${Date.now()}_${selectedFile.name}`;
        const { error: uploadError } = await supabase.storage
          .from("profiles")
          .upload(path, selectedFile, { cacheControl: "3600", upsert: true });

        if (uploadError) {
          console.error("upload error", uploadError);
          setMessage("이미지 업로드에 실패했습니다. URL 방식을 사용해 주세요.");
        } else {
          const { data } = supabase.storage.from("profiles").getPublicUrl(path);
          finalImageUrl = data.publicUrl;
        }
      } catch (err) {
        console.error(err);
        setMessage("이미지 업로드 중 오류가 발생했습니다.");
      }
    }

    const result = await updateStudentProfileAction({ name, profileImageUrl: finalImageUrl });

    if (!result.success) {
      setMessage(result.error);
      return;
    }

    setWorkspace((prev) => prev ? { ...prev, profile: result.data } : prev);
    setMessage("프로필을 저장했습니다.");
  };

  const handleFileChange = useCallback((file?: File | null) => {
    setSelectedFile(file ?? null);
    if (!file) return;
    const url = URL.createObjectURL(file);
    setProfileImageUrl(url);
  }, []);

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) handleFileChange(file);
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
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
      <StudentAppChrome />

      <S.Container>
        <S.Grid>
          <S.Panel>
            <S.PanelTitle>프로필 정보</S.PanelTitle>
            <S.Muted style={{ marginBottom: 12 }}>{workspace.profile.className} · {workspace.profile.studentNumber}번</S.Muted>
            <S.OptionGrid>
              <S.Field>
                이름
                <S.Input value={name} onChange={(event) => setName(event.target.value)} />
              </S.Field>
              <S.Field>
                프로필 사진 (업로드 또는 URL)
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  style={{ border: "1px dashed #d1d5db", padding: 8, borderRadius: 6, display: "flex", gap: 8, alignItems: "center" }}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)}
                  />
                  <S.Input
                    placeholder="이미지 URL을 직접 입력하거나 파일을 드래그하세요"
                    value={profileImageUrl}
                    onChange={(event) => setProfileImageUrl(event.target.value)}
                  />
                </div>
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
