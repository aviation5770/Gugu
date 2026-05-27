"use client";

import * as S from "./TopNavbar.styles";
import Image from "next/image";

interface TopNavbarProps {
  teacherName: string;
  onToggleSidebar: () => void;
}

export default function TopNavbar({ teacherName, onToggleSidebar }: TopNavbarProps) {
  return (
    <S.NavbarHeader>
      <S.LeftSection>
        <S.ToggleButton onClick={onToggleSidebar} aria-label="메뉴 토글">
          ☰
        </S.ToggleButton>
        <S.LogoLink href="/teacher/dashboard">
          <S.LogoImageContainer>
            <Image src="/images/gugu.svg" alt="Gugu Logo" fill style={{ objectFit: "contain" }} />
          </S.LogoImageContainer>
        </S.LogoLink>
      </S.LeftSection>

      <S.RightSection>
        <S.CreateClassLink href="/teacher/class/new" title="새로운 수업 만들기">
          +
        </S.CreateClassLink>
        <S.UserProfileWrapper>
          <S.ProfileAvatar>{teacherName.slice(0, 2)}</S.ProfileAvatar>
          <S.TeacherNameText>{teacherName} 선생님</S.TeacherNameText>
        </S.UserProfileWrapper>
      </S.RightSection>
    </S.NavbarHeader>
  );
}