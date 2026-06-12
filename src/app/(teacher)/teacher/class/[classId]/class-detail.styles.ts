"use client";

import styled from "styled-components";
import Link from "next/link";

export const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const Banner = styled.section<{ $bgColor: string }>`
  position: relative;
  overflow: hidden;
  min-height: 188px;
  border-radius: 12px;
  padding: 28px;
  background-color: ${(props) => props.$bgColor};
  color: #ffffff;

  &::after {
    content: "";
    position: absolute;
    right: -40px;
    top: -34px;
    width: 190px;
    height: 190px;
    border-radius: 32px;
    background-color: rgba(0, 0, 0, 0.16);
    transform: rotate(25deg);
  }
`;

export const BannerTitle = styled.h2`
  position: relative;
  z-index: 1;
  font-size: 28px;
  font-weight: 800;
`;

export const BannerDescription = styled.p`
  position: relative;
  z-index: 1;
  max-width: 560px;
  margin-top: 10px;
  font-size: 14px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.88);
`;

export const CodeBadge = styled.span`
  position: absolute;
  right: 24px;
  bottom: 24px;
  z-index: 1;
  padding: 8px 12px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 999px;
  font-size: 13px;
  font-weight: 800;
`;

export const TabGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;

  @media (max-width: 760px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

export const TabCard = styled.div`
  min-height: 92px;
  padding: 16px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  background-color: #ffffff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`;

export const TabLabel = styled.span`
  color: #6b7280;
  font-size: 12px;
  font-weight: 700;
`;

export const TabValue = styled.strong`
  display: block;
  margin-top: 8px;
  color: #111827;
  font-size: 22px;
  font-weight: 800;
`;

export const MainGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 24px;
  align-items: start;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

export const Panel = styled.section`
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`;

export const PanelTitle = styled.h3`
  color: #111827;
  font-size: 16px;
  font-weight: 800;
  margin-bottom: 16px;
`;

export const NoticeList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const NoticeItem = styled.div`
  padding: 14px;
  border-radius: 10px;
  background-color: #f9fafb;
  border: 1px solid #f3f4f6;

  strong {
    display: block;
    color: #111827;
    font-size: 14px;
  }

  p {
    margin-top: 6px;
    color: #6b7280;
    font-size: 13px;
    line-height: 1.55;
  }
`;

export const StudentRows = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const StudentListHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 16px;

  @media (max-width: 640px) {
    align-items: flex-start;
    flex-direction: column;
  }
`;

export const PanelActions = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

export const UtilityButton = styled.button`
  min-height: 36px;
  padding: 0 12px;
  border: 1px solid #e5e7eb;
  border-radius: 9px;
  background-color: #ffffff;
  color: #374151;
  font-size: 12px;
  font-weight: 800;
  cursor: pointer;

  &:hover {
    background-color: #f9fafb;
  }
`;

export const DangerButton = styled(UtilityButton)`
  color: #dc2626;

  &:hover {
    border-color: #fecaca;
    background-color: #fef2f2;
  }
`;

export const StudentRow = styled(Link)`
  display: grid;
  grid-template-columns: 44px minmax(120px, 1fr) 90px 90px;
  align-items: center;
  gap: 12px;
  min-height: 50px;
  padding: 10px 12px;
  border-radius: 10px;
  background-color: #f9fafb;
  color: inherit;
  text-decoration: none;

  &:hover {
    background-color: #fffaf0;
  }

  @media (max-width: 640px) {
    grid-template-columns: 44px 1fr;
  }
`;

export const NumberBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 999px;
  background-color: #ffd165;
  color: #514437;
  font-size: 12px;
  font-weight: 800;
`;

export const StudentName = styled.strong`
  color: #111827;
  font-size: 14px;
`;

export const Metric = styled.span`
  color: #4b5563;
  font-size: 13px;
  font-weight: 700;

  @media (max-width: 640px) {
    display: none;
  }
`;

export const QuickLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const QuickLink = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 44px;
  padding: 0 12px;
  border-radius: 10px;
  background-color: #f9fafb;
  color: #374151;
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;

  &:hover {
    background-color: #fffaf0;
    color: #083b4d;
  }
`;

export const NotFoundPanel = styled(Panel)`
  text-align: center;
  padding: 48px 20px;
`;

export const SettingsForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 18px;
`;

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 6px;
  color: #4b5563;
  font-size: 12px;
  font-weight: 800;
`;

export const TextInput = styled.input`
  width: 100%;
  height: 42px;
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

export const MetaList = styled.dl`
  display: grid;
  gap: 10px;
  margin: 18px 0;
  padding: 14px;
  border-radius: 10px;
  background-color: #f9fafb;

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }

  dt {
    color: #6b7280;
    font-size: 12px;
    font-weight: 800;
  }

  dd {
    color: #111827;
    font-size: 12px;
    font-weight: 800;
  }
`;

export const SettingsDivider = styled.div`
  height: 1px;
  margin: 18px 0;
  background-color: #f3f4f6;
`;
