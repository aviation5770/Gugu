"use client";

import styled from "styled-components";
import Link from "next/link";

export const NavbarHeader = styled.header`
  height: 64px;
  background-color: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
`;

export const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const ToggleButton = styled.button`
  padding: 8px;
  background: none;
  border: none;
  border-radius: 50%;
  color: #4b5563;
  font-size: 20px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f3f4f6;
  }
`;

export const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  height: 100%;

  opacity: 1;
  transition: opacity 0.2s ease-in-out;
  &:hover {
    opacity: 0.85;
  }
`;

export const LogoImageContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 50px;
  height: 50px;
`;

export const RightSection = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const CreateClassLink = styled(Link)`
  padding: 8px;
  background: none;
  border: none;
  border-radius: 50%;
  color: #4b5563;
  font-size: 24px;
  font-weight: 300;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f3f4f6;
  }
`;

export const UserProfileWrapper = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding-left: 8px;
  border-left: 1px solid #e5e7eb;
  border-top: 0;
  border-right: 0;
  border-bottom: 0;
  background: none;
  cursor: pointer;
  font: inherit;
  border-radius: 999px;

  &:hover {
    opacity: 0.85;
  }
`;

export const ProfileAvatar = styled.div<{ $imageUrl?: string }>`
  width: 32px;
  height: 32px;
  background:
    ${(props) =>
      props.$imageUrl
        ? `url(${props.$imageUrl}) center / cover`
        : "#2563eb"};
  color: #ffffff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 12px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  cursor: pointer;
`;

export const TeacherNameText = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #374151;

  @media (max-width: 640px) {
    display: none;
  }
`;

export const ProfilePanel = styled.div`
  position: absolute;
  top: 48px;
  right: 0;
  z-index: 70;
  width: 280px;
  padding: 20px;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  background-color: #ffffff;
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.14);
`;

export const ProfilePhoto = styled.div<{ $imageUrl?: string }>`
  position: relative;
  overflow: hidden;
  width: 64px;
  height: 64px;
  margin: 0 auto 12px;
  border-radius: 50%;
  background:
    ${(props) => (props.$imageUrl ? `url(${props.$imageUrl}) center / cover` : "linear-gradient(135deg, #2563eb, #9145d4)")};
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 800;
  box-shadow: 0 8px 18px rgba(37, 99, 235, 0.22);
`;

export const ProfileFeedback = styled.p`
  margin-top: 10px;
  padding: 8px 10px;
  border-radius: 8px;
  background-color: #fef2f2;
  color: #dc2626;
  font-size: 12px;
  line-height: 1.45;
`;

export const ProfileEditForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 14px;
`;

export const ProfileInput = styled.input`
  width: 100%;
  height: 38px;
  padding: 0 10px;
  border: 1px solid #e5e7eb;
  border-radius: 9px;
  color: #111827;
  font-size: 13px;
  outline: none;

  &:focus {
    border-color: #083b4d;
    box-shadow: 0 0 0 3px rgba(8, 59, 77, 0.12);
  }
`;

export const ProfileName = styled.strong`
  display: block;
  color: #111827;
  font-size: 16px;
  font-weight: 800;
  text-align: center;
`;

export const ProfileEmail = styled.span`
  display: block;
  margin-top: 4px;
  color: #6b7280;
  font-size: 13px;
  text-align: center;
`;

export const ProfileActionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 18px;
`;

export const ProfileActionButton = styled.button`
  width: 100%;
  min-height: 40px;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  background-color: #ffffff;
  color: #374151;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    background-color: #f9fafb;
  }
`;

export const ProfileDangerButton = styled(ProfileActionButton)`
  color: #dc2626;

  &:hover {
    border-color: #fecaca;
    background-color: #fef2f2;
  }
`;
