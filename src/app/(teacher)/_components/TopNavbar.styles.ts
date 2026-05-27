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
  position: sticky;
  top: 0;
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
`;

export const LogoText = styled.span`
  font-size: 20px;
  font-weight: 700;
  color: #2563eb;
  letter-spacing: -0.025em;
`;

export const RightSection = styled.div`
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

export const UserProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding-left: 8px;
  border-left: 1px solid #e5e7eb;
`;

export const ProfileAvatar = styled.div`
  width: 32px;
  height: 32px;
  background-color: #2563eb;
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
