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
  padding: 40px 24px;
  box-sizing: border-box;
`;

export const LogoWrapper = styled.div`
  position: relative;
  width: 180px;
  height: 110px;
  margin-bottom: 24px;
`;

export const PageTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #333333;
  margin-bottom: 24px;
  text-align: center;
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
  margin-top: 12px;
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
    background: #f3a7c2;
    cursor: not-allowed;
    transform: none;
  }
`;

export const ErrorMessage = styled.p`
  width: 100%;
  margin: 4px 0 0;
  color: #d32f2f;
  font-size: 13px;
  font-weight: 600;
`;

export const FooterArea = styled.div`
  width: 100%;
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .login-prompt {
    font-size: 14px;
    color: #bbb;

    .login-link {
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
