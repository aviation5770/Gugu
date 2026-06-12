"use client";

import styled from "styled-components";

export const LayoutWrapper = styled.div`
  min-h: 100vh;
  background-color: #f9fafb; /* gray-50 */
  display: flex;
  flex-direction: column;
  font-family: sans-serif;
  padding-top: 64px;
`;

export const MainContainer = styled.div`
  display: flex;
  flex: 1;
`;

export const ContentArea = styled.main<{ $isSidebarOpen: boolean }>`
  flex: 1;
  padding: 24px;
  overflow-x: hidden;
  transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  @media (min-width: 768px) {
    padding: 32px;
  }

  @media (min-width: 1024px) {
    margin-left: ${(props) => (props.$isSidebarOpen ? "256px" : "0")};
  }
`;
