"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import * as S from "./TopNavbar.styles";
import Image from "next/image";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useI18n } from "@/i18n/LocaleProvider";

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
  const { t } = useI18n();

  return (
    <S.NavbarHeader>
      <S.LeftSection>
        <S.ToggleButton onClick={onToggleSidebar} aria-label={t("common.dashboard")}>
          ☰
        </S.ToggleButton>
        <S.LogoLink href="/teacher/home">
          <S.LogoImageContainer>
            <Image
              src="/images/gugu.svg"
              alt="Gugu Logo"
              fill
              sizes="40px"
              style={{ objectFit: "contain" }}
            />
          </S.LogoImageContainer>
        </S.LogoLink>
      </S.LeftSection>

      <S.RightSection>
        <LanguageSwitcher />
        <S.CreateClassLink href="/teacher/class/new" title={t("common.createClass")}>
          +
        </S.CreateClassLink>
        <S.UserProfileWrapper
          type="button"
          onClick={() => setIsProfileOpen((prev) => !prev)}
          aria-expanded={isProfileOpen}
          aria-label={t("common.profile")}
        >
          <S.ProfileAvatar>{teacherName.slice(0, 2)}</S.ProfileAvatar>
          <S.TeacherNameText>{teacherName} {t("common.teacherSuffix")}</S.TeacherNameText>
        </S.UserProfileWrapper>

        {isProfileOpen ? (
          <S.ProfilePanel role="dialog" aria-label={t("common.profile")}>
            <S.ProfilePhoto>{teacherName.slice(0, 2)}</S.ProfilePhoto>
            <S.ProfileName>{teacherName}</S.ProfileName>
            <S.ProfileEmail>{teacherEmail}</S.ProfileEmail>

            <S.ProfileActionList>
              <S.ProfileActionButton
                type="button"
                onClick={() => alert("프로필 편집 화면은 다음 단계에서 연결됩니다.")}
              >
                {t("common.editProfile")}
              </S.ProfileActionButton>
              <S.ProfileActionButton
                type="button"
                onClick={() => router.push("/login/teacher")}
              >
                {t("common.logout")}
              </S.ProfileActionButton>
              <S.ProfileDangerButton
                type="button"
                onClick={() => alert("계정 삭제는 관리자 확인 후 진행되도록 연결할 예정입니다.")}
              >
                {t("common.deleteAccount")}
              </S.ProfileDangerButton>
            </S.ProfileActionList>
          </S.ProfilePanel>
        ) : null}
      </S.RightSection>
    </S.NavbarHeader>
  );
}
