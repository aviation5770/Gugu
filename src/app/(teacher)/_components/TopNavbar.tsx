"use client";

import type { DragEvent } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import * as S from "./TopNavbar.styles";
import NextImage from "next/image";
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

const PROFILE_IMAGE_SIZE = 320;

function readFileAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
        return;
      }

      reject(new Error("이미지 파일을 읽을 수 없습니다."));
    };
    reader.onerror = () => reject(new Error("이미지 파일을 읽을 수 없습니다."));
    reader.readAsDataURL(file);
  });
}

async function resizeProfileImage(file: File) {
  const dataUrl = await readFileAsDataUrl(file);

  return new Promise<string>((resolve, reject) => {
    const image = new window.Image();

    image.onload = () => {
      const scale = Math.min(
        PROFILE_IMAGE_SIZE / image.width,
        PROFILE_IMAGE_SIZE / image.height,
        1,
      );
      const width = Math.max(1, Math.round(image.width * scale));
      const height = Math.max(1, Math.round(image.height * scale));
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      if (!context) {
        reject(new Error("이미지를 처리할 수 없습니다."));
        return;
      }

      canvas.width = width;
      canvas.height = height;
      context.drawImage(image, 0, 0, width, height);
      resolve(canvas.toDataURL("image/jpeg", 0.82));
    };

    image.onerror = () => reject(new Error("이미지 파일을 불러올 수 없습니다."));
    image.src = dataUrl;
  });
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
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const [isProcessingImage, setIsProcessingImage] = useState(false);
  const [feedback, setFeedback] = useState("");
  const router = useRouter();
  const { t } = useI18n();
  const profileInitial = teacherName.trim().slice(0, 2) || "T";
  const currentProfileImageUrl = profileImageUrl ?? teacherProfileImageUrl ?? "";

  const handleProfileImageFile = async (file?: File | null) => {
    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setFeedback("이미지 파일만 업로드할 수 있습니다.");
      return;
    }

    setFeedback("");
    setIsProcessingImage(true);

    try {
      const resizedImageUrl = await resizeProfileImage(file);
      setSelectedFile(file);
      setProfileImageUrl(resizedImageUrl);
    } catch (error) {
      console.error(error);
      setFeedback("이미지를 처리하지 못했습니다. 다른 파일을 선택해 주세요.");
    } finally {
      setIsProcessingImage(false);
    }
  };

  const handleDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDragActive(false);
    void handleProfileImageFile(event.dataTransfer.files.item(0));
  };

  const handleProfileSave = async () => {
    setFeedback("");
    const finalImageUrl = profileImageUrl ?? teacherProfileImageUrl ?? "";

    if (isProcessingImage) {
      setFeedback("이미지 처리 중입니다. 잠시 후 다시 저장해 주세요.");
      return;
    }

    const result = await updateTeacherProfileAction({
      name: profileName,
      email: profileEmail,
      profileImageUrl: finalImageUrl,
    });

    if (!result.success) {
      setFeedback(result.error);
      return;
    }

    setProfileImageUrl(finalImageUrl);
    setSelectedFile(null);
    onProfileChange?.({
      name: result.data.name,
      email: result.data.email ?? "",
      profileImageUrl: finalImageUrl || result.data.profileImageUrl || null,
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
            <NextImage
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
          <S.ProfileAvatar $imageUrl={currentProfileImageUrl}>
            {currentProfileImageUrl ? null : profileInitial}
          </S.ProfileAvatar>
          <S.TeacherNameText>{teacherName} {t("common.teacherSuffix")}</S.TeacherNameText>
        </S.UserProfileWrapper>

        {isProfileOpen ? (
          <S.ProfilePanel role="dialog" aria-label={t("common.profile")}>
            {isEditingProfile ? (
              <S.ProfileEditForm>
                <S.ProfileDropZone
                  $isActive={isDragActive}
                  onDragEnter={(event) => {
                    event.preventDefault();
                    setIsDragActive(true);
                  }}
                  onDragOver={(event) => event.preventDefault()}
                  onDragLeave={() => setIsDragActive(false)}
                  onDrop={handleDrop}
                >
                  <S.ProfileDropPreview $imageUrl={currentProfileImageUrl}>
                    {currentProfileImageUrl ? null : profileInitial}
                  </S.ProfileDropPreview>
                  <S.ProfileDropText>
                    {isProcessingImage
                      ? "이미지 처리 중..."
                      : "이미지를 드래그하거나 클릭해서 업로드"}
                  </S.ProfileDropText>
                  {selectedFile ? (
                    <S.ProfileFileName>{selectedFile.name}</S.ProfileFileName>
                  ) : null}
                  <S.HiddenFileInput
                    type="file"
                    accept="image/*"
                    onChange={(event) =>
                      void handleProfileImageFile(event.target.files?.item(0))
                    }
                  />
                </S.ProfileDropZone>
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
                <S.ProfileActionButton type="button" onClick={handleProfileSave}>
                  저장
                </S.ProfileActionButton>
              </S.ProfileEditForm>
            ) : (
              <>
                <S.ProfilePhoto $imageUrl={currentProfileImageUrl}>
                  {currentProfileImageUrl ? null : profileInitial}
                </S.ProfilePhoto>
                <S.ProfileName>{teacherName}</S.ProfileName>
                <S.ProfileEmail>{teacherEmail}</S.ProfileEmail>
              </>
            )}

            {feedback ? <S.ProfileFeedback>{feedback}</S.ProfileFeedback> : null}

            <S.ProfileActionList>
              <S.ProfileActionButton
                type="button"
                onClick={() => {
                  setProfileName(teacherName);
                  setProfileEmail(teacherEmail);
                  setProfileImageUrl(teacherProfileImageUrl ?? "");
                  setSelectedFile(null);
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
