"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import * as S from "./TopNavbar.styles";
import Image from "next/image";

interface TopNavbarProps {
  teacherName: string;
  teacherEmail: string;
  onToggleSidebar: () => void;
}

export default function TopNavbar({
  teacherName,
  teacherEmail,
  onToggleSidebar,
}: TopNavbarProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const router = useRouter();

  return (
    <S.NavbarHeader>
      <S.LeftSection>
        <S.ToggleButton onClick={onToggleSidebar} aria-label="메뉴 토글">
          ☰
        </S.ToggleButton>
        <S.LogoLink href="/teacher/home">
          <S.LogoImageContainer>
            <Image src="/images/gugu.svg" alt="Gugu Logo" fill style={{ objectFit: "contain" }} />
          </S.LogoImageContainer>
        </S.LogoLink>
      </S.LeftSection>

      <S.RightSection>
        <S.CreateClassLink href="/teacher/class/new" title="새로운 수업 만들기">
          +
        </S.CreateClassLink>
        <S.UserProfileWrapper
          type="button"
          onClick={() => setIsProfileOpen((prev) => !prev)}
          aria-expanded={isProfileOpen}
          aria-label="선생님 프로필 열기"
        >
          <S.ProfileAvatar>{teacherName.slice(0, 2)}</S.ProfileAvatar>
          <S.TeacherNameText>{teacherName} 선생님</S.TeacherNameText>
        </S.UserProfileWrapper>

        {isProfileOpen ? (
          <S.ProfilePanel role="dialog" aria-label="선생님 프로필">
            <S.ProfilePhoto>{teacherName.slice(0, 2)}</S.ProfilePhoto>
            <S.ProfileName>{teacherName}</S.ProfileName>
            <S.ProfileEmail>{teacherEmail}</S.ProfileEmail>

            <S.ProfileActionList>
              <S.ProfileActionButton
                type="button"
                onClick={() => alert("프로필 편집 화면은 다음 단계에서 연결됩니다.")}
              >
                프로필 편집
              </S.ProfileActionButton>
              <S.ProfileActionButton
                type="button"
                onClick={() => router.push("/login/teacher")}
              >
                로그아웃
              </S.ProfileActionButton>
              <S.ProfileDangerButton
                type="button"
                onClick={() => alert("계정 삭제는 관리자 확인 후 진행되도록 연결할 예정입니다.")}
              >
                계정삭제
              </S.ProfileDangerButton>
            </S.ProfileActionList>
          </S.ProfilePanel>
        ) : null}
      </S.RightSection>
    </S.NavbarHeader>
  );
}
