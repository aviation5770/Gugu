"use client";

import styled from "styled-components";

export const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
`;

export const PageHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Title = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #111827;
`;

export const Description = styled.p`
  font-size: 12px;
  color: #6b7280;
`;

/* 메인 레이아웃 (좌측: 달력, 우측: 일정 등록 및 목록) */
export const MainContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;

  @media (min-width: 1024px) {
    grid-template-columns: 3fr 2fr;
  }
`;

/* ─── 달력 컴포넌트 스타일 ─── */
export const CalendarCard = styled.div`
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`;

export const CalendarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const MonthTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #111827;
`;

export const NavButton = styled.button`
  background: none;
  border: 1px solid #e5e7eb;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f3f4f6;
  }
`;

export const WeekDaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  font-weight: 600;
  font-size: 12px;
  color: #6b7280;
  margin-bottom: 8px;
`;

export const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
`;

export const DayCell = styled.div<{
  $isToday?: boolean;
  $isSelected?: boolean;
}>`
  min-height: 80px;
  border: 1px solid #f3f4f6;
  border-radius: 8px;
  padding: 6px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.2s;

  background-color: ${(props) =>
    props.$isSelected ? "#eff6ff" : props.$isToday ? "#f3f4f6" : "#ffffff"};
  border-color: ${(props) => (props.$isSelected ? "#3b82f6" : "#f3f4f6")};

  &:hover {
    background-color: ${(props) => (props.$isSelected ? "#eff6ff" : "#f9fafb")};
  }
`;

export const DayNumber = styled.span<{ $isToday?: boolean }>`
  font-size: 13px;
  font-weight: ${(props) => (props.$isToday ? "700" : "500")};
  color: ${(props) => (props.$isToday ? "#2563eb" : "#374151")};
`;

export const CellEventList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-top: 4px;
  overflow: hidden;
`;

export const MiniEventDot = styled.div<{ $color: string }>`
  font-size: 10px;
  padding: 1px 4px;
  border-radius: 4px;
  background-color: ${(props) => props.$color + "15"};
  color: ${(props) => props.$color};
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

/* ─── 우측 폼 및 목록 스타일 ─── */
export const SidePanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const FormCard = styled.div`
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const FormTitle = styled.h4`
  font-size: 15px;
  font-weight: 700;
  color: #111827;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const Label = styled.label`
  font-size: 12px;
  font-weight: 600;
  color: #4b5563;
`;

export const Input = styled.input`
  padding: 10px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  outline: none;

  &:focus {
    border-color: #3b82f6;
  }
`;

export const Select = styled.select`
  padding: 10px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  background-color: #ffffff;

  &:focus {
    border-color: #3b82f6;
  }
`;

export const SubmitButton = styled.button`
  background-color: #2563eb;
  color: #ffffff;
  border: none;
  padding: 12px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #1d4ed8;
  }
`;

export const EventListCard = styled.div`
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 20px;
`;

export const EventList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 14px;
`;

export const EventItem = styled.div<{ $color: string }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  border-left: 4px solid ${(props) => props.$color};
  background-color: #f9fafb;
  border-radius: 0 8px 8px 0;
`;

export const EventInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const EventTitleText = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: #111827;
`;

export const EventClassTag = styled.span`
  font-size: 11px;
  font-weight: 500;
  color: #6b7280;
`;

export const DeleteButton = styled.button`
  background: none;
  border: none;
  color: #ef4444;
  font-size: 16px;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;

  &:hover {
    background-color: #fee2e2;
  }
`;

export const NoDataText = styled.p`
  font-size: 13px;
  color: #9ca3af;
  text-align: center;
  padding: 20px 0;
`;
