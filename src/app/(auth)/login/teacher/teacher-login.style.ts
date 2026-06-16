import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

export const LanguageArea = styled.div`
  position: fixed;
  top: 18px;
  right: 18px;
  z-index: 30;
`;

export const CardSection = styled.div`
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px;
  padding: 0 24px;
`;

export const LogoWrapper = styled.div`
  position: relative;
  width: 220px;
  height: 140px;
  margin-bottom: 40px;
`;

export const InputForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const AuthInput = styled.input`
  width: 100%;
  height: 52px;
  padding: 0 18px;
  border: 1.5px solid #e0e0e0;
  border-radius: 12px;
  font-size: 15px;
  color: #333;
  background: #fff;
  outline: none;
  box-sizing: border-box;
  transition: border-color 0.2s;

  &::placeholder {
    color: #bbb;
  }

  &:focus {
    border-color: #f06292;
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  height: 52px;
  background: #f06292;
  color: #fff;
  border: none;
  border-radius: 12px;
  font-size: 17px;
  font-weight: 700;
  cursor: pointer;
  margin-top: 4px;
  transition:
    background 0.2s,
    transform 0.1s;

  &:hover {
    background: #e91e8c;
  }

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.65;
    transform: none;
  }
`;

export const ErrorMessage = styled.p`
  padding: 10px 12px;
  border-radius: 10px;
  background-color: #fef2f2;
  color: #dc2626;
  font-size: 13px;
  line-height: 1.5;
`;

export const FooterArea = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;

  .divider {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 12px;
    color: #ccc;
    font-size: 13px;

    &::before,
    &::after {
      content: "";
      flex: 1;
      height: 1px;
      background: #e0e0e0;
    }
    span {
      white-space: nowrap;
    }
  }

  .nav-links-row {
    display: flex;
    align-items: center;
    gap: 12px;
    color: #ddd;
    font-size: 14px;
  }

  .text-link {
    background: none;
    border: none;
    color: #999;
    font-size: 14px;
    cursor: pointer;
    padding: 4px 0;
    transition: color 0.2s;

    &:hover {
      color: #f06292;
    }
  }

  .signup-prompt {
    font-size: 14px;
    color: #bbb;
    margin-top: 4px;

    .signup-link {
      background: none;
      border: none;
      color: #f06292;
      font-weight: 600;
      cursor: pointer;
      margin-left: 6px;
      text-decoration: underline;
      text-underline-offset: 2px;

      &:hover {
        color: #e91e8c;
      }
    }
  }
`;
