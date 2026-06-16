"use client";

import styled from "styled-components";
import Link from "next/link";

export const Shell = styled.main`
  min-height: 100vh;
  background-color: #f9fafb;
  color: #111827;
`;

export const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  min-height: 64px;
  padding: 0 24px;
  border-bottom: 1px solid #e5e7eb;
  background-color: rgba(255, 255, 255, 0.94);
  backdrop-filter: blur(10px);
`;

export const Brand = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;

  strong {
    font-size: 17px;
    font-weight: 900;
  }

  span {
    color: #6b7280;
    font-size: 12px;
    font-weight: 700;
  }
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;

export const NavLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 36px;
  padding: 0 12px;
  border-radius: 999px;
  color: #374151;
  font-size: 13px;
  font-weight: 800;
  text-decoration: none;

  &:hover {
    background-color: #eef2ff;
    color: #083b4d;
  }
`;

export const Container = styled.div`
  width: min(1120px, calc(100% - 32px));
  margin: 0 auto;
  padding: 28px 0 56px;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 340px;
  gap: 20px;
  align-items: start;

  @media (max-width: 920px) {
    grid-template-columns: 1fr;
  }
`;

export const Panel = styled.section`
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  background-color: #ffffff;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.05);
`;

export const PanelTitle = styled.h2`
  margin-bottom: 14px;
  color: #111827;
  font-size: 18px;
  font-weight: 900;
`;

export const Muted = styled.p`
  color: #6b7280;
  font-size: 13px;
  line-height: 1.6;
`;

export const Notice = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 20px;
  padding: 14px;
  border: 1px solid #dbeafe;
  border-radius: 12px;
  background-color: #eff6ff;
  color: #1e3a8a;
  font-size: 13px;
  font-weight: 800;
`;

export const ButtonRow = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

export const Button = styled.button<{ $variant?: "primary" | "danger" }>`
  min-height: 42px;
  padding: 0 16px;
  border: 1px solid
    ${(props) => (props.$variant === "danger" ? "#fecaca" : "#e5e7eb")};
  border-radius: 10px;
  background-color: ${(props) =>
    props.$variant === "primary" ? "#083b4d" : "#ffffff"};
  color: ${(props) =>
    props.$variant === "danger"
      ? "#dc2626"
      : props.$variant === "primary"
        ? "#ffffff"
        : "#374151"};
  font-size: 13px;
  font-weight: 900;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.55;
  }
`;

export const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: 6px;
  color: #4b5563;
  font-size: 12px;
  font-weight: 900;
`;

export const Input = styled.input`
  width: 100%;
  height: 42px;
  padding: 0 12px;
  border: 1px solid #d1d5db;
  border-radius: 9px;
  color: #111827;
  font-size: 14px;
  outline: none;
`;

export const Select = styled.select`
  width: 100%;
  height: 42px;
  padding: 0 12px;
  border: 1px solid #d1d5db;
  border-radius: 9px;
  color: #111827;
  background-color: #ffffff;
  font-size: 14px;
`;

export const OptionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  margin-bottom: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const ProblemCard = styled.div`
  display: grid;
  gap: 14px;
  place-items: center;
  min-height: 220px;
  border-radius: 12px;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;

  strong {
    font-size: 38px;
    font-weight: 900;
  }
`;

export const RankingRow = styled(Link)<{ $isMe?: boolean }>`
  display: grid;
  grid-template-columns: 52px minmax(0, 1fr) 80px 80px;
  align-items: center;
  gap: 12px;
  min-height: 54px;
  padding: 0 12px;
  border-radius: 10px;
  background-color: ${(props) => (props.$isMe ? "#fff7ed" : "#f9fafb")};
  color: inherit;
  text-decoration: none;
  font-size: 13px;
  font-weight: 800;
`;

export const FixedMine = styled.div`
  position: sticky;
  bottom: 16px;
  margin-top: 18px;
  padding: 14px;
  border: 1px solid #ffd165;
  border-radius: 12px;
  background-color: #fffaf0;
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.08);
`;

export const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const StatCard = styled.div`
  padding: 14px;
  border-radius: 10px;
  background-color: #f9fafb;

  span {
    color: #6b7280;
    font-size: 12px;
    font-weight: 800;
  }

  strong {
    display: block;
    margin-top: 8px;
    font-size: 20px;
    font-weight: 900;
  }
`;
