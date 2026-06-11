"use client";

import styled from "styled-components";
import Link from "next/link";

export const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
`;

export const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: flex-start;

  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

export const TitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
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

export const PrimaryLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 40px;
  padding: 0 14px;
  border-radius: 10px;
  background-color: #083b4d;
  color: #ffffff;
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;
  white-space: nowrap;

  &:hover {
    background-color: #0b4d64;
  }
`;

export const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const StatCard = styled.div`
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 18px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`;

export const StatLabel = styled.p`
  color: #6b7280;
  font-size: 12px;
  font-weight: 600;
`;

export const StatValue = styled.strong`
  display: block;
  margin-top: 10px;
  color: #111827;
  font-size: 26px;
  font-weight: 800;
`;

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.6fr) minmax(280px, 0.9fr);
  gap: 24px;

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
  font-size: 16px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 16px;
`;

export const ClassRows = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ClassRow = styled(Link)`
  display: grid;
  grid-template-columns: minmax(160px, 1fr) 110px 110px 96px;
  align-items: center;
  gap: 12px;
  padding: 14px;
  border: 1px solid #f3f4f6;
  border-radius: 10px;
  color: inherit;
  text-decoration: none;
  background-color: #f9fafb;

  &:hover {
    border-color: #ffd165;
    background-color: #fffaf0;
  }

  @media (max-width: 760px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export const ClassName = styled.strong`
  color: #111827;
  font-size: 14px;
`;

export const RowMetric = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  color: #6b7280;
  font-size: 11px;

  strong {
    color: #111827;
    font-size: 14px;
  }
`;

export const EventList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const EventItem = styled(Link)<{ $color: string }>`
  display: block;
  padding: 12px;
  border-left: 4px solid ${(props) => props.$color};
  border-radius: 0 10px 10px 0;
  background-color: #f9fafb;
  color: inherit;
  text-decoration: none;

  &:hover {
    background-color: #f3f4f6;
  }
`;

export const EventTitle = styled.strong`
  display: block;
  color: #111827;
  font-size: 14px;
`;

export const EventMeta = styled.span`
  display: block;
  margin-top: 4px;
  color: #6b7280;
  font-size: 12px;
`;
