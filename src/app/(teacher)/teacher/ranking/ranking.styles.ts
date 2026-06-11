"use client";

import styled from "styled-components";
import Link from "next/link";

export const RankingContainer = styled.div`
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
  color: #6b7280;
  font-size: 12px;
`;

export const RankingBoard = styled.section`
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`;

export const BoardHeader = styled.div`
  display: grid;
  grid-template-columns: 80px minmax(160px, 1fr) 160px 120px 120px;
  gap: 12px;
  padding: 14px 18px;
  background-color: #f9fafb;
  color: #6b7280;
  font-size: 12px;
  font-weight: 700;

  @media (max-width: 760px) {
    display: none;
  }
`;

export const RankingRow = styled(Link)`
  display: grid;
  grid-template-columns: 80px minmax(160px, 1fr) 160px 120px 120px;
  align-items: center;
  gap: 12px;
  min-height: 64px;
  padding: 14px 18px;
  border-top: 1px solid #f3f4f6;
  color: inherit;
  text-decoration: none;

  &:hover {
    background-color: #fffaf0;
  }

  @media (max-width: 760px) {
    grid-template-columns: 44px 1fr;
    align-items: start;
  }
`;

export const RankBadge = styled.span<{ $rank: number }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 999px;
  background-color: ${(props) => (props.$rank <= 3 ? "#ffd165" : "#f3f4f6")};
  color: ${(props) => (props.$rank <= 3 ? "#514437" : "#4b5563")};
  font-size: 13px;
  font-weight: 800;
`;

export const StudentInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;

  strong {
    color: #111827;
    font-size: 14px;
  }

  span {
    color: #6b7280;
    font-size: 12px;
  }
`;

export const CellText = styled.span`
  color: #374151;
  font-size: 14px;
  font-weight: 600;

  @media (max-width: 760px) {
    display: none;
  }
`;

export const MobileMeta = styled.span`
  display: none;
  color: #6b7280;
  font-size: 12px;

  @media (max-width: 760px) {
    display: block;
  }
`;
