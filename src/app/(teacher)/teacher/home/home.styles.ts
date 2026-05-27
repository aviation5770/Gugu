"use client";

import styled from "styled-components";

export const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const HeaderTitleSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const PageTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #111827;
`;

export const PageDescription = styled.p`
  font-size: 12px;
  color: #6b7280;
`;

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const ClassCard = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 256px;
  justify-content: space-between;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition:
    transform 0.2s,
    box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }
`;

export const CardHeader = styled.div<{ $bgColor: string }>`
  padding: 20px;
  background-color: ${(props) =>
    props.$bgColor}; /* 🔑 전달받은 단색을 배경색으로 지정 */
  color: #ffffff;
  position: relative;
  height: 112px;
  flex-shrink: 0;
`;

export const ClassName = styled.h3`
  font-size: 18px;
  font-weight: 700;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  letter-spacing: -0.025em;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export const TeacherName = styled.p`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
  margin-top: 4px;
`;

export const ClassProfileBadge = styled.div<{ $profileColor: string }>`
  position: absolute;
  right: 16px;
  bottom: -20px;
  width: 48px;
  height: 48px;
  border: 4px solid #ffffff;
  color: #ffffff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  background-color: ${(props) => props.$profileColor};
`;

export const CardBody = styled.div`
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 8px;
`;

export const AlertBox = styled.div`
  font-size: 12px;
  color: #4b5563;
  background-color: #f9fafb;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #f3f4f6;
`;

export const AlertLabel = styled.p`
  font-weight: 600;
  color: #083b4d;
  margin-bottom: 2px;
`;

export const AlertText = styled.p`
  color: rgba(71, 77, 88, 1);
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const CardFooterToolbar = styled.div`
  padding: 12px 16px;
  background-color: rgba(249, 250, 251, 0.5);
  border-t: 1px solid #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #6b7280;
`;

export const FooterButton = styled.button`
  background: none;
  border: none;
  padding: 6px;
  border-radius: 8px;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 6px;
  color: #083b4d;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #f3f4f6;
    color: #2563eb;
  }
`;

export const FooterButtonText = styled.span`
  font-size: 12px;
  font-weight: 600;
`;

export const MoreMenuButton = styled.button`
  background: none;
  border: none;
  padding: 6px;
  border-radius: 8px;
  color: #4b5563;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f3f4f6;
  }
`;