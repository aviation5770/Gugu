"use client";

import styled from "styled-components";

export const LayoutWrapper = styled.div`
  min-h: 100vh;
  background-color: #f9fafb; /* gray-50 */
  display: flex;
  flex-direction: column;
  font-family: sans-serif;
`;

export const MainContainer = styled.div`
  display: flex;
  flex: 1;
`;

export const ContentArea = styled.main`
  flex: 1;
  padding: 24px;
  overflow-x: hidden;

  @media (min-width: 768px) {
    padding: 32px;
  }
`;