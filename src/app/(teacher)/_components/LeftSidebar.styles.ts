"use client";

import styled from "styled-components";
import Link from "next/link";

export const SidebarAside = styled.aside<{ $isOpen: boolean }>`
  width: 256px;
  background-color: #ffffff;
  border-right: 1px solid #e5e7eb;
  display: ${(props) => (props.$isOpen ? "flex" : "none")};
  flex-direction: column;
  justify-content: space-between;
  flex-shrink: 0;
  height: calc(100vh - 64px);
  position: sticky;
  top: 64px;
  overflow-y: auto;
  z-index: 40;
`;

export const SidebarContainer = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const MenuNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const MenuLink = styled(Link)<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s;

  background-color: ${(props) => (props.$isActive ? "#eff6ff" : "transparent")};
  color: ${(props) => (props.$isActive ? "#2563eb" : "#374151")};

  &:hover {
    background-color: ${(props) => (props.$isActive ? "#eff6ff" : "#f3f4f6")};
  }
`;

export const CategorySection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const CategoryTitle = styled.p`
  padding: 0 16px;
  font-size: 12px;
  font-weight: 600;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const ClassListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const ClassShortcutLink = styled(Link)`
  display: block;
  padding: 8px 16px;
  font-size: 14px;
  color: #4b5563;
  text-decoration: none;
  border-radius: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: all 0.2s;

  &:hover {
    color: #2563eb;
    background-color: #f9fafb;
  }
`;
