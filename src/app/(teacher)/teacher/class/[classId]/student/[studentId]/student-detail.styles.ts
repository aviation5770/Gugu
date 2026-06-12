"use client";

import styled from "styled-components";
import Link from "next/link";

export const StudentDetailContainer = styled.div`
  display: grid;
  grid-template-columns: minmax(320px, 1fr) 320px;
  gap: 24px;
  align-items: start;

  @media (max-width: 940px) {
    grid-template-columns: 1fr;
  }
`;

export const Panel = styled.section`
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`;

export const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
`;

export const StudentAvatar = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 999px;
  background-color: #083b4d;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 800;
`;

export const TitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Title = styled.h2`
  color: #111827;
  font-size: 20px;
  font-weight: 800;
`;

export const Description = styled.p`
  color: #6b7280;
  font-size: 12px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 6px;
  color: #4b5563;
  font-size: 12px;
  font-weight: 800;
`;

export const Input = styled.input`
  width: 100%;
  height: 44px;
  padding: 0 12px;
  border: 1px solid #d1d5db;
  border-radius: 9px;
  color: #111827;
  font-size: 14px;
  outline: none;

  &:focus {
    border-color: #ffd165;
    box-shadow: 0 0 0 3px rgba(255, 209, 101, 0.2);
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  min-height: 112px;
  padding: 12px;
  border: 1px solid #d1d5db;
  border-radius: 9px;
  color: #111827;
  font-size: 14px;
  line-height: 1.5;
  resize: vertical;
  outline: none;

  &:focus {
    border-color: #ffd165;
    box-shadow: 0 0 0 3px rgba(255, 209, 101, 0.2);
  }
`;

export const HelperText = styled.p`
  color: #6b7280;
  font-size: 12px;
  line-height: 1.5;
`;

export const PrimaryButton = styled.button`
  min-height: 44px;
  border: none;
  border-radius: 10px;
  background-color: #083b4d;
  color: #ffffff;
  font-size: 14px;
  font-weight: 800;
  cursor: pointer;

  &:hover {
    background-color: #0b4d64;
  }
`;

export const SecondaryButton = styled.button`
  min-height: 40px;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  background-color: #ffffff;
  color: #374151;
  font-size: 13px;
  font-weight: 800;
  cursor: pointer;

  &:hover {
    background-color: #f9fafb;
  }
`;

export const DangerButton = styled(SecondaryButton)`
  color: #dc2626;

  &:hover {
    border-color: #fecaca;
    background-color: #fef2f2;
  }
`;

export const StatGrid = styled.div`
  display: grid;
  gap: 12px;
`;

export const StatCard = styled.div`
  padding: 16px;
  border-radius: 10px;
  background-color: #f9fafb;

  span {
    color: #6b7280;
    font-size: 12px;
    font-weight: 700;
  }

  strong {
    display: block;
    margin-top: 8px;
    color: #111827;
    font-size: 22px;
    font-weight: 800;
  }
`;

export const ActionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 16px;
`;

export const BackLink = styled(Link)`
  display: inline-flex;
  margin-top: 18px;
  color: #083b4d;
  font-size: 13px;
  font-weight: 800;
  text-decoration: none;
`;

export const NotFoundPanel = styled(Panel)`
  grid-column: 1 / -1;
  text-align: center;
`;
