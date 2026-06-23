"use client";

import styled from "styled-components";
import Link from "next/link";

export const Shell = styled.main`
  position: relative;
  min-height: 100vh;
  background-color: #fafafa;
  color: #083b4d;
`;

export const ShellContent = styled.div`
  position: relative;
  z-index: 1;
  padding-top: 64px;
`;

export const StudentTopBar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 40;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  border-bottom: 1px solid #eef0f2;
`;

export const StudentLogoMark = styled.a`
  position: relative;
  width: 96px;
  height: 40px;
  display: inline-block;
`;

export const StudentBottomNav = styled.nav`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 50;
  display: flex;
  gap: 8px;
  justify-content: center;
  padding: 8px 12px;
  background-color: #ffffff;
  border-top: 1px solid #eef0f2;
`;

export const StudentBottomNavLink = styled(Link)<{ $active?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-width: 72px;
  height: 44px;
  padding: 0 12px;
  border-radius: 12px;
  text-decoration: none;
  color: ${(props) => (props.$active ? "#ffffffff" : "#083B4D")};
  background-color: ${(props) => (props.$active ? "#fbbf24" : "transparent")};
  font-weight: 900;
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
    color: #1f2937;
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
    background-color: #fffbeb;
    color: #fbbf24;
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
  color: #1f2937;
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
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  background-color: #ffffff;
  color: #1f2937;
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
    ${(props) => (props.$variant === "danger" ? "#fecdd3" : "#e5e7eb")};
  border-radius: 10px;
  background-color: ${(props) =>
    props.$variant === "primary" ? "#fbbf24" : "#ffffff"};
  color: ${(props) =>
    props.$variant === "danger"
      ? "#e11d48"
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
  color: #1f2937;
  font-size: 14px;
  outline: none;
`;

export const Select = styled.select`
  width: 100%;
  height: 42px;
  padding: 0 12px;
  border: 1px solid #d1d5db;
  border-radius: 9px;
  color: #1f2937;
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
  background-color: #fafafa;
  border: 1px solid #e5e7eb;

  strong {
    font-size: 38px;
    font-weight: 900;
    color: #1f2937;
  }
`;

export const StudentPlayContainer = styled.div`
  width: min(1180px, calc(100% - 32px));
  margin: 0 auto;
  padding: 24px 0 64px;
`;

export const StudentNotice = styled(Notice)`
  border-color: #e5e7eb;
  background-color: #ffffff;
  color: #6b7280;

  span:first-child {
    color: #1f2937;
    font-weight: 900;
  }
`;

export const PlayGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 20px;
  align-items: start;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

export const PlayMainCard = styled.section`
  overflow: hidden;
  border: 1px solid #e5e7eb;
  border-radius: 24px;
  background-color: #ffffff;
  padding: 22px;
  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.05);
`;

export const LearningHero = styled.div`
  display: grid;
  grid-template-columns: 132px minmax(0, 1fr) 104px;
  gap: 18px;
  align-items: center;
  min-height: 170px;
  margin-bottom: 18px;
  padding: 20px;
  border-radius: 22px;
  background-color: #fffbeb;
  border: 1px solid #fef3c7;

  @media (max-width: 720px) {
    grid-template-columns: 96px minmax(0, 1fr);
  }

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

export const MascotBubble = styled.div`
  position: relative;
  width: 124px;
  aspect-ratio: 1;
  border-radius: 50%;
  background-color: #fff7ed;
  border: 2px solid #db2777;

  @media (max-width: 720px) {
    width: 92px;
  }

  @media (max-width: 520px) {
    margin: 0 auto;
  }
`;

export const LearningHeroText = styled.div`
  min-width: 0;

  span {
    display: inline-flex;
    min-height: 28px;
    align-items: center;
    padding: 0 12px;
    border-radius: 999px;
    background-color: #ffffff;
    color: #fbbf24;
    font-size: 12px;
    font-weight: 900;
  }

  strong {
    display: block;
    margin-top: 12px;
    color: #1f2937;
    font-size: 30px;
    font-weight: 900;
  }

  p {
    margin-top: 8px;
    color: #6b7280;
    font-size: 14px;
    font-weight: 800;
    line-height: 1.5;
  }
`;

export const GoalRing = styled.div`
  display: grid;
  place-items: center;
  width: 96px;
  aspect-ratio: 1;
  justify-self: end;
  border: 6px solid #34d399;
  border-radius: 50%;
  background-color: #ffffff;
  color: #1f2937;

  strong {
    font-size: 28px;
    font-weight: 900;
  }

  span {
    margin-top: -16px;
    font-size: 12px;
    font-weight: 900;
    color: #6b7280;
  }

  @media (max-width: 720px) {
    display: none;
  }
`;

export const ColorSection = styled.div`
  margin-top: 16px;
`;

export const ColorSectionTitle = styled.h3`
  margin-bottom: 10px;
  color: #1f2937;
  font-size: 15px;
  font-weight: 900;
`;

export const ModeCardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const ModeCardButton = styled.button<{
  $active?: boolean;
  $tone: "mint" | "blue";
}>`
  display: flex;
  min-height: 112px;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
  padding: 18px;
  border: 2px solid ${(props) => (props.$active ? "#fbbf24" : "#e5e7eb")};
  border-radius: 18px;
  background-color: ${(props) => (props.$active ? "#fffbeb" : "#ffffff")};
  color: ${(props) => (props.$active ? "#fbbf24" : "#1f2937")};
  text-align: left;
  cursor: pointer;
  transition:
    border-color 0.15s ease,
    background-color 0.15s ease;

  span {
    font-size: 14px;
    font-weight: 900;
    opacity: 0.75;
  }

  strong {
    font-size: 20px;
    font-weight: 900;
  }

  &:hover {
    border-color: #fbbf24;
  }
`;

export const CountButtonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 10px;

  @media (max-width: 640px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

export const CountButton = styled.button<{ $active?: boolean }>`
  min-height: 64px;
  border: 2px solid ${(props) => (props.$active ? "#db2777" : "#e5e7eb")};
  border-radius: 18px;
  background-color: ${(props) => (props.$active ? "#fdf2f8" : "#ffffff")};
  color: ${(props) => (props.$active ? "#db2777" : "#374151")};
  font-size: 20px;
  font-weight: 900;
  cursor: pointer;
  transition:
    border-color 0.15s ease,
    background-color 0.15s ease;

  &:hover {
    border-color: #db2777;
  }
`;

export const TableChipGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 9px;
`;

export const TableChip = styled.button<{ $active?: boolean }>`
  min-height: 42px;
  padding: 0 14px;
  border: 1px solid ${(props) => (props.$active ? "#db2777" : "#e5e7eb")};
  border-radius: 999px;
  background-color: ${(props) => (props.$active ? "#fdf2f8" : "#ffffff")};
  color: ${(props) => (props.$active ? "#db2777" : "#374151")};
  font-size: 13px;
  font-weight: 900;
  cursor: pointer;
`;

export const ToggleLine = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
  color: #6b7280;
  font-size: 13px;
  font-weight: 900;
`;

export const PrimaryPlayActions = styled.div<{ $columns?: number }>`
  display: grid;
  grid-template-columns: repeat(${({ $columns = 2 }) => $columns}, 1fr);
  gap: 12px;
`;

export const StartButton = styled.button<{
  $tone: "purple" | "orange" | "green";
}>`
  min-height: 64px;
  border: 0;
  border-radius: 22px;
  background-color: ${(props) =>
    props.$tone === "purple"
      ? "#fbbf24"
      : props.$tone === "orange"
        ? "#db2777"
        : "#34d399"};
  color: ${(props) => (props.$tone === "orange" ? "#db2777" : "#ffffff")};
  font-size: 18px;
  font-weight: 900;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    filter: grayscale(0.4);
    opacity: 0.58;
  }
`;

export const PlayHint = styled.p`
  margin-top: 10px;
  color: #9ca3af;
  font-size: 13px;
  font-weight: 800;
  text-align: center;
`;

export const StudyStage = styled.div`
  min-height: 580px;
  border-radius: 24px;
  background-color: #fafafa;
  border: 1px solid #f3f4f6;
  padding: 20px;
`;

export const StudyTopBar = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 12px;
  align-items: center;
`;

export const ProgressPill = styled.div`
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 10px;
  align-items: center;
  min-height: 38px;
  padding: 0 12px;
  border-radius: 999px;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;

  span {
    min-width: 54px;
    border-radius: 999px;
    background-color: #db2777;
    color: #ffffff;
    font-size: 12px;
    font-weight: 900;
    line-height: 24px;
    text-align: center;
  }
`;

export const ProgressTrack = styled.div`
  overflow: hidden;
  height: 16px;
  border-radius: 999px;
  background-color: #f3f4f6;
`;

export const ProgressFill = styled.div<{ $percent: number }>`
  width: ${(props) => props.$percent}%;
  height: 100%;
  border-radius: inherit;
  background-color: #db2777;
  transition: width 0.25s ease;
`;

export const TimerBadge = styled.div`
  min-height: 38px;
  padding: 0 14px;
  border-radius: 999px;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  color: #fbbf24;
  font-size: 13px;
  font-weight: 900;
  line-height: 36px;
`;

export const StudyMetaRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: center;
  margin-top: 24px;
`;

export const LevelBadge = styled.span`
  min-height: 30px;
  padding: 0 12px;
  border-radius: 999px;
  background-color: #fffbeb;
  color: #fbbf24;
  font-size: 12px;
  font-weight: 900;
  line-height: 30px;
`;

export const BookmarkButton = styled.button<{ $active?: boolean }>`
  min-height: 34px;
  padding: 0 14px;
  border: 1px solid ${(props) => (props.$active ? "#34d399" : "#e5e7eb")};
  border-radius: 999px;
  background-color: ${(props) => (props.$active ? "#ecfdf5" : "#ffffff")};
  color: ${(props) => (props.$active ? "#047857" : "#6b7280")};
  font-size: 12px;
  font-weight: 900;
  cursor: pointer;
`;

export const MathQuestionCard = styled.div`
  display: grid;
  gap: 20px;
  min-height: 300px;
  margin-top: 16px;
  padding: 26px;
  border-radius: 24px;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
`;

export const QuestionTypeLabel = styled.span`
  justify-self: start;
  min-height: 30px;
  padding: 0 12px;
  border-radius: 999px;
  background-color: #fffbeb;
  color: #fbbf24;
  font-size: 12px;
  font-weight: 900;
  line-height: 30px;
`;

export const BigProblemText = styled.strong`
  color: #1f2937;
  font-size: 72px;
  font-weight: 900;
  text-align: center;

  @media (max-width: 560px) {
    font-size: 52px;
  }
`;

export const AnswerBubble = styled.div`
  width: min(360px, 100%);
  justify-self: center;
  padding: 4px;
  border-radius: 999px;
  background-color: #ffffff;
  border: 2px solid #db2777;
`;

export const AnswerInput = styled.input`
  width: 100%;
  height: 60px;
  border: 0;
  border-radius: 999px;
  background-color: #ffffff;
  color: #1f2937;
  font-size: 30px;
  font-weight: 900;
  text-align: center;
  outline: none;

  &::placeholder {
    color: #9ca3af;
  }
`;

export const PlayControlGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  margin-top: 18px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const ControlButton = styled.button<{
  $tone: "yellow" | "mint" | "blue";
}>`
  min-height: 78px;
  border: 0;
  border-radius: 24px;
  background-color: ${(props) =>
    props.$tone === "yellow"
      ? "#fef3c7"
      : props.$tone === "mint"
        ? "#d1fae5"
        : "#db2777"};
  color: ${(props) =>
    props.$tone === "yellow"
      ? "#92400e"
      : props.$tone === "mint"
        ? "#065f46"
        : "#ffffff"};
  font-size: 16px;
  font-weight: 900;
  cursor: pointer;
`;

export const StudentResultNotice = styled(StudentNotice)`
  margin-top: 16px;
  border-color: #a7f3d0;
  background-color: #ecfdf5;
  color: #047857;

  span:first-child {
    color: #047857;
  }
`;

export const PlaySideStack = styled.div`
  display: grid;
  gap: 16px;
`;

export const ReviewCard = styled.section`
  border: 1px solid #e5e7eb;
  border-radius: 18px;
  background-color: #ffffff;
  padding: 16px;
`;

export const ReviewHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  div {
    display: grid;
    gap: 4px;
  }

  span {
    color: #fbbf24;
    font-size: 12px;
    font-weight: 900;
  }

  strong {
    color: #1f2937;
    font-size: 24px;
    font-weight: 900;
  }
`;

export const SmallToggleButton = styled.button`
  min-height: 34px;
  padding: 0 12px;
  border: 1px solid #fef3c7;
  border-radius: 999px;
  background-color: #fffbeb;
  color: #fbbf24;
  font-size: 12px;
  font-weight: 900;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export const ReviewSummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  margin-top: 14px;
`;

export const ReviewMiniStat = styled.div`
  padding: 12px;
  border-radius: 14px;
  background-color: #fafafa;
  border: 1px solid #f3f4f6;

  span {
    color: #6b7280;
    font-size: 11px;
    font-weight: 900;
  }

  strong {
    display: block;
    margin-top: 6px;
    color: #1f2937;
    font-size: 22px;
    font-weight: 900;
  }
`;

export const ReviewList = styled.div`
  display: grid;
  gap: 10px;
  margin-top: 14px;
`;

export const ReviewItem = styled.div`
  display: grid;
  gap: 4px;
  padding: 12px;
  border-radius: 14px;
  background-color: #fdf2f8;
  border: 1px solid #fce7f3;

  strong {
    color: #db2777;
    font-size: 13px;
    font-weight: 900;
  }

  span {
    color: #6b7280;
    font-size: 12px;
    font-weight: 800;
  }

  em {
    justify-self: start;
    padding: 3px 8px;
    border-radius: 999px;
    background-color: #d1fae5;
    color: #047857;
    font-size: 11px;
    font-style: normal;
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
  background-color: ${(props) => (props.$isMe ? "#fffbeb" : "#fafafa")};
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
  border: 1px solid #db2777;
  border-radius: 12px;
  background-color: #fdf2f8;
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.06);
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
  background-color: #fafafa;
  border: 1px solid #f3f4f6;

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
    color: #1f2937;
  }
`;
