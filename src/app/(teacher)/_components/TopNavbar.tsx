"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import * as S from "./TopNavbar.styles";
import Image from "next/image";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useI18n } from "@/i18n/LocaleProvider";
import {
  deleteTeacherAccountAction,
  teacherLogoutAction,
  updateTeacherProfileAction,
} from "@/app/actions/auth";

interface TopNavbarProps {
  teacherName: string;
  teacherEmail: string;
  teacherProfileImageUrl?: string | null;
  onToggleSidebar: () => void;
  onProfileChange?: (profile: {
    name: string;
    email: string;
    profileImageUrl?: string | null;
  }) => void;
}

export default function TopNavbar({
  teacherName,
  teacherEmail,
  teacherProfileImageUrl,
  onToggleSidebar,
  onProfileChange,
}: TopNavbarProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileName, setProfileName] = useState(teacherName);
  const [profileEmail, setProfileEmail] = useState(teacherEmail);
  const [profileImageUrl, setProfileImageUrl] = useState(teacherProfileImageUrl ?? "");
  const [feedback, setFeedback] = useState("");
  const router = useRouter();
  const { t } = useI18n();
  const profileInitial = teacherName.trim().slice(0, 2) || "T";

  const handleProfileSave = async () => {
    setFeedback("");
    const result = await updateTeacherProfileAction({
      name: profileName,
      email: profileEmail,
      profileImageUrl,
    });

    if (!result.success) {
      setFeedback(result.error);
      return;
    }

    onProfileChange?.({
      name: result.data.name,
      email: result.data.email ?? "",
      profileImageUrl: result.data.profileImageUrl ?? null,
    });
    setIsEditingProfile(false);
  };

  const handleLogout = async () => {
    const result = await teacherLogoutAction();

    if (!result.success) {
      setFeedback(result.error);
      return;
    }

    router.push("/login/teacher");
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm("계정과 클래스 데이터를 모두 삭제하시겠습니까?")) {
      return;
    }

    const result = await deleteTeacherAccountAction();

    if (!result.success) {
      setFeedback(result.error);
      return;
    }

    router.push("/");
  };

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
          <S.ProfileAvatar>{profileInitial}</S.ProfileAvatar>
          <S.TeacherNameText>{teacherName} {t("common.teacherSuffix")}</S.TeacherNameText>
        </S.UserProfileWrapper>

        {isProfileOpen ? (
          <S.ProfilePanel role="dialog" aria-label={t("common.profile")}>
            <S.ProfilePhoto $imageUrl={teacherProfileImageUrl ?? ""}>
              {teacherProfileImageUrl ? null : profileInitial}
            </S.ProfilePhoto>
            <S.ProfileName>{teacherName}</S.ProfileName>
            <S.ProfileEmail>{teacherEmail}</S.ProfileEmail>
            {feedback ? <S.ProfileFeedback>{feedback}</S.ProfileFeedback> : null}

            {isEditingProfile ? (
              <S.ProfileEditForm>
                <S.ProfileInput
                  value={profileName}
                  onChange={(event) => setProfileName(event.target.value)}
                  placeholder="이름"
                />
                <S.ProfileInput
                  value={profileEmail}
                  onChange={(event) => setProfileEmail(event.target.value)}
                  placeholder="이메일"
                />
                <S.ProfileInput
                  value={profileImageUrl}
                  onChange={(event) => setProfileImageUrl(event.target.value)}
                  placeholder="프로필 사진 URL"
                />
                <S.ProfileActionButton type="button" onClick={handleProfileSave}>
                  저장
                </S.ProfileActionButton>
              </S.ProfileEditForm>
            ) : null}

            <S.ProfileActionList>
              <S.ProfileActionButton
                type="button"
                onClick={() => {
                  setProfileName(teacherName);
                  setProfileEmail(teacherEmail);
                  setProfileImageUrl(teacherProfileImageUrl ?? "");
                  setIsEditingProfile((prev) => !prev);
                }}
              >
                {t("common.editProfile")}
              </S.ProfileActionButton>
              <S.ProfileActionButton
                type="button"
                onClick={handleLogout}
              >
                {t("common.logout")}
              </S.ProfileActionButton>
              <S.ProfileDangerButton
                type="button"
                onClick={handleDeleteAccount}
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
