"use client";

import styled from "styled-components";
import Link from "next/link";

export const NewClassContainer = styled.div`
  display: grid;
  grid-template-columns: minmax(320px, 520px) minmax(280px, 1fr);
  gap: 24px;
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const FormPanel = styled.section`
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`;

export const Title = styled.h2`
  color: #111827;
  font-size: 20px;
  font-weight: 800;
`;

export const Description = styled.p`
  margin-top: 6px;
  color: #6b7280;
  font-size: 12px;
  line-height: 1.55;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-top: 24px;
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
`;

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 6px;
  color: #4b5563;
  font-size: 12px;
  font-weight: 700;
`;

export const Input = styled.input`
  width: 100%;
  height: 44px;
  padding: 0 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  color: #111827;
  font-size: 14px;
  outline: none;

  &:focus {
    border-color: #ffd165;
    box-shadow: 0 0 0 3px rgba(255, 209, 101, 0.2);
  }
`;

export const SubmitButton = styled.button`
  height: 46px;
  border: none;
  border-radius: 10px;
  background-color: #083b4d;
  color: #ffffff;
  font-size: 14px;
  font-weight: 800;
  cursor: pointer;

  &:hover {
    background-color: #0b4d64;
  }
`;

export const PreviewPanel = styled.section`
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`;

export const PreviewCard = styled.div`
  overflow: hidden;
  margin-top: 18px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
`;

export const PreviewHeader = styled.div`
  min-height: 104px;
  padding: 18px;
  background-color: #60c43e;
  color: #ffffff;

  h3 {
    font-size: 18px;
    font-weight: 800;
  }

  p {
    margin-top: 6px;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.85);
  }
`;

export const PreviewBody = styled.div`
  padding: 18px;
  color: #4b5563;
  font-size: 13px;
  line-height: 1.6;
`;

export const ResultBox = styled.div`
  margin-top: 14px;
  padding: 14px;
  border-radius: 10px;
  background-color: #fffaf0;
  border: 1px solid #ffe5a3;
  color: #514437;
  font-size: 13px;
  font-weight: 700;
`;

export const BackLink = styled(Link)`
  display: inline-flex;
  margin-top: 18px;
  color: #083b4d;
  font-size: 13px;
  font-weight: 800;
  text-decoration: none;
`;
