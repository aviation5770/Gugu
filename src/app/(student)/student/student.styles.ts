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

export const StudentPlayContainer = styled.div`
  width: min(1180px, calc(100% - 32px));
  margin: 0 auto;
  padding: 24px 0 64px;
`;

export const StudentNotice = styled(Notice)`
  border-color: #b7e4ff;
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.86), rgba(224, 247, 255, 0.94)),
    #e0f7ff;
  color: #176b87;
  box-shadow: 0 12px 24px rgba(56, 189, 248, 0.12);
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
  border: 1px solid #c7ecff;
  border-radius: 24px;
  background:
    radial-gradient(circle at 15% 12%, rgba(255, 209, 101, 0.4), transparent 26%),
    radial-gradient(circle at 88% 10%, rgba(239, 70, 110, 0.2), transparent 28%),
    linear-gradient(180deg, #bfe6ff 0%, #e7fbff 52%, #ffffff 100%);
  padding: 22px;
  box-shadow: 0 18px 40px rgba(56, 189, 248, 0.18);
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
  background-color: rgba(255, 255, 255, 0.82);
  box-shadow: inset 0 -10px 24px rgba(186, 230, 253, 0.34);

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
  background:
    radial-gradient(circle at 30% 20%, #ffffff 0 16%, transparent 17%),
    linear-gradient(135deg, #ffd165, #ff8a65);
  box-shadow: 0 16px 28px rgba(250, 144, 65, 0.22);

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
    background-color: #ede9fe;
    color: #6d28d9;
    font-size: 12px;
    font-weight: 900;
  }

  strong {
    display: block;
    margin-top: 12px;
    color: #083b4d;
    font-size: 30px;
    font-weight: 900;
  }

  p {
    margin-top: 8px;
    color: #4b5563;
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
  border: 8px solid #8b5cf6;
  border-radius: 50%;
  background-color: #ffffff;
  color: #6d28d9;
  box-shadow: 0 12px 24px rgba(139, 92, 246, 0.2);

  strong {
    font-size: 28px;
    font-weight: 900;
  }

  span {
    margin-top: -16px;
    font-size: 12px;
    font-weight: 900;
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
  color: #083b4d;
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
  border: 3px solid ${(props) => (props.$active ? "#ffffff" : "transparent")};
  border-radius: 18px;
  background:
    ${(props) =>
      props.$tone === "mint"
        ? "linear-gradient(135deg, #4ade80, #2dd4bf)"
        : "linear-gradient(135deg, #60a5fa, #818cf8)"};
  color: #ffffff;
  text-align: left;
  box-shadow: 0 14px 24px
    ${(props) =>
      props.$tone === "mint"
        ? "rgba(45, 212, 191, 0.22)"
        : "rgba(96, 165, 250, 0.24)"};
  cursor: pointer;

  span {
    font-size: 14px;
    font-weight: 900;
  }

  strong {
    font-size: 20px;
    font-weight: 900;
  }

  &:hover {
    transform: translateY(-1px);
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
  border: 2px solid ${(props) => (props.$active ? "#8b5cf6" : "#ffffff")};
  border-radius: 18px;
  background-color: ${(props) => (props.$active ? "#8b5cf6" : "#ffffff")};
  color: ${(props) => (props.$active ? "#ffffff" : "#6d28d9")};
  font-size: 20px;
  font-weight: 900;
  box-shadow: 0 10px 20px rgba(139, 92, 246, 0.14);
  cursor: pointer;
`;

export const TableChipGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 9px;
`;

export const TableChip = styled.button<{ $active?: boolean }>`
  min-height: 42px;
  padding: 0 14px;
  border: 2px solid ${(props) => (props.$active ? "#ffd165" : "#ffffff")};
  border-radius: 999px;
  background-color: ${(props) => (props.$active ? "#ffd165" : "#ffffff")};
  color: #083b4d;
  font-size: 13px;
  font-weight: 900;
  box-shadow: 0 8px 16px rgba(255, 209, 101, 0.18);
  cursor: pointer;
`;

export const ToggleLine = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
  color: #176b87;
  font-size: 13px;
  font-weight: 900;
`;

export const PrimaryPlayActions = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  margin-top: 20px;

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

export const StartButton = styled.button<{ $tone: "purple" | "orange" }>`
  min-height: 64px;
  border: 0;
  border-radius: 22px;
  background:
    ${(props) =>
      props.$tone === "purple"
        ? "linear-gradient(135deg, #a855f7, #6366f1)"
        : "linear-gradient(135deg, #fb923c, #f43f5e)"};
  color: #ffffff;
  font-size: 18px;
  font-weight: 900;
  box-shadow: 0 16px 24px
    ${(props) =>
      props.$tone === "purple"
        ? "rgba(99, 102, 241, 0.28)"
        : "rgba(244, 63, 94, 0.22)"};
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    filter: grayscale(0.4);
    opacity: 0.58;
  }
`;

export const PlayHint = styled.p`
  margin-top: 10px;
  color: #176b87;
  font-size: 13px;
  font-weight: 800;
  text-align: center;
`;

export const StudyStage = styled.div`
  min-height: 580px;
  border-radius: 24px;
  background:
    radial-gradient(circle at 50% 100%, rgba(255, 255, 255, 0.78), transparent 28%),
    linear-gradient(180deg, #9ed5ff 0%, #caeff7 65%, #ffffff 100%);
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
  background-color: rgba(255, 255, 255, 0.7);

  span {
    min-width: 54px;
    border-radius: 999px;
    background-color: #fb923c;
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
  background-color: #e0f2fe;
`;

export const ProgressFill = styled.div<{ $percent: number }>`
  width: ${(props) => props.$percent}%;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #ffd165, #fb923c);
  transition: width 0.25s ease;
`;

export const TimerBadge = styled.div`
  min-height: 38px;
  padding: 0 14px;
  border-radius: 999px;
  background-color: #ffffff;
  color: #2563eb;
  font-size: 13px;
  font-weight: 900;
  line-height: 38px;
  box-shadow: 0 8px 16px rgba(37, 99, 235, 0.12);
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
  background-color: rgba(37, 99, 235, 0.8);
  color: #ffffff;
  font-size: 12px;
  font-weight: 900;
  line-height: 30px;
`;

export const BookmarkButton = styled.button<{ $active?: boolean }>`
  min-height: 34px;
  padding: 0 14px;
  border: 0;
  border-radius: 999px;
  background-color: ${(props) => (props.$active ? "#14b8a6" : "#ffffff")};
  color: ${(props) => (props.$active ? "#ffffff" : "#176b87")};
  font-size: 12px;
  font-weight: 900;
  box-shadow: 0 8px 16px rgba(20, 184, 166, 0.18);
  cursor: pointer;
`;

export const MathQuestionCard = styled.div`
  display: grid;
  gap: 20px;
  min-height: 300px;
  margin-top: 16px;
  padding: 26px;
  border-radius: 24px;
  background-color: rgba(255, 255, 255, 0.88);
  box-shadow: 0 18px 30px rgba(15, 23, 42, 0.1);
`;

export const QuestionTypeLabel = styled.span`
  justify-self: start;
  min-height: 30px;
  padding: 0 12px;
  border-radius: 999px;
  background-color: #dbeafe;
  color: #2563eb;
  font-size: 12px;
  font-weight: 900;
  line-height: 30px;
`;

export const BigProblemText = styled.strong`
  color: #111827;
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
  padding: 8px;
  border-radius: 999px;
  background:
    linear-gradient(135deg, rgba(255, 209, 101, 0.5), rgba(139, 92, 246, 0.32)),
    #ffffff;
`;

export const AnswerInput = styled.input`
  width: 100%;
  height: 64px;
  border: 0;
  border-radius: 999px;
  background-color: #ffffff;
  color: #111827;
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
  background:
    ${(props) =>
      props.$tone === "yellow"
        ? "linear-gradient(135deg, #ffd165, #fb923c)"
        : props.$tone === "mint"
          ? "linear-gradient(135deg, #5eead4, #14b8a6)"
          : "linear-gradient(135deg, #818cf8, #4f46e5)"};
  color: #ffffff;
  font-size: 16px;
  font-weight: 900;
  box-shadow: 0 16px 24px rgba(79, 70, 229, 0.18);
  cursor: pointer;
`;

export const StudentResultNotice = styled(StudentNotice)`
  margin-top: 16px;
  border-color: #bbf7d0;
  background:
    linear-gradient(135deg, rgba(240, 253, 244, 0.94), rgba(220, 252, 231, 0.9)),
    #f0fdf4;
  color: #166534;
`;

export const PlaySideStack = styled.div`
  display: grid;
  gap: 16px;
`;

export const ReviewCard = styled.section`
  border: 1px solid #e9d5ff;
  border-radius: 18px;
  background-color: #ffffff;
  padding: 16px;
  box-shadow: 0 12px 24px rgba(139, 92, 246, 0.1);
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
    color: #6d28d9;
    font-size: 12px;
    font-weight: 900;
  }

  strong {
    color: #111827;
    font-size: 24px;
    font-weight: 900;
  }
`;

export const SmallToggleButton = styled.button`
  min-height: 34px;
  padding: 0 12px;
  border: 0;
  border-radius: 999px;
  background-color: #ede9fe;
  color: #6d28d9;
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
  background-color: #f8fafc;

  span {
    color: #64748b;
    font-size: 11px;
    font-weight: 900;
  }

  strong {
    display: block;
    margin-top: 6px;
    color: #083b4d;
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
  background-color: #fff7ed;

  strong {
    color: #9a3412;
    font-size: 13px;
    font-weight: 900;
  }

  span {
    color: #4b5563;
    font-size: 12px;
    font-weight: 800;
  }

  em {
    justify-self: start;
    padding: 3px 8px;
    border-radius: 999px;
    background-color: #ccfbf1;
    color: #0f766e;
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
