"use client";

import styled from "styled-components";
import Link from "next/link";

export const SidebarOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 64px;
  left: 0;
  width: 100vw;
  height: calc(100vh - 64px);
  background-color: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(2px);
  z-index: 39;
  transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
  
  opacity: ${(props) => (props.$isOpen ? 1 : 0)};
  visibility: ${(props) => (props.$isOpen ? "visible" : "hidden")};

  @media (min-width: 1024px) {
    display: none;
  }
`;

export const SidebarAside = styled.aside<{ $isOpen: boolean }>`
  width: 256px;
  background-color: #ffffff;
  border-right: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-shrink: 0;
  height: calc(100vh - 64px);
  position: sticky;
  top: 64px;
  overflow-y: auto;
  z-index: 40;

  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), 
  width 0.3s cubic-bezier(0.4, 0, 0.2, 1),
  opacity 0.2s ease-in-out;

  ${(props) =>
    !props.$isOpen &&
    `
    transform: translateX(-100%);
    width: 0px;
    opacity: 0;
    border-right-color: transparent;
    pointer-events: none;
  `}

  @media (max-width: 1023px) {
    position: fixed;
    left: 0;
    box-shadow: ${(props) => (props.$isOpen ? "4px 0 24px rgba(0, 0, 0, 0.08)" : "none")};
    
    ${(props) =>
      !props.$isOpen &&
      `
      width: 256px;
      transform: translateX(-100%);
    `}
  }
`;

export const SidebarContainer = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 256px;
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
  transition: all 0.2s ease-in-out;

  background-color: ${(props) => (props.$isActive ? "#FFD165" : "transparent")};
  color: ${(props) => (props.$isActive ? "#ffffffff" : "#514437ff")};

  &:hover {
    background-color: ${(props) => (props.$isActive ? "#ffdd8fff" : "#f6f5f3ff")};
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
  transition: all 0.2s ease-in-out;

  &:hover {
    color: #60c43e;
    background-color: #f6f5f3ff;
  }
`;