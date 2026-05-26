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

/* ─── Logo ────────────────────────────────────────────────── */

export const LogoWrapper = styled.div`
  position: relative;
  width: 220px;
  height: 140px;
  margin-bottom: 40px;
`;

/* ─── Step title (auth step) ──────────────────────────────── */

export const StepTitle = styled.p`
  font-size: 15px;
  color: #888;
  margin-bottom: 16px;
  text-align: center;
`;

/* ─── Form ────────────────────────────────────────────────── */

export const InputForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const CodeInput = styled.input`
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
`;

/* ─── Footer ──────────────────────────────────────────────── */

export const FooterArea = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

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

  .login-link {
    background: none;
    border: none;
    color: #999;
    font-size: 14px;
    cursor: pointer;
    padding: 4px 0;
    text-decoration: underline;
    text-underline-offset: 3px;
    transition: color 0.2s;

    &:hover {
      color: #f06292;
    }
  }
`;

/* ─── Background decorations ──────────────────────────────── */

const BgBase = styled.div`
  position: absolute;
  pointer-events: none;
`;

export const BgYellowEllipseTopLeft = styled(BgBase)`
  top: -80px;
  left: -185px;
  width: 540px;
  height: 540px;
`;
export const BgYellowEllipseBottomRight = styled(BgBase)`
  top: 435px;
  right: -347px;
  width: 540px;
  height: 540px;
`;

export const BgPinkEllipseTopLeft = styled(BgBase)`
  top: 135px;
  left: 280px;
  width: 150px;
  height: 150px;
`;
export const BgPinkEllipseBottomRight = styled(BgBase)`
  bottom: 70px;
  right: 196px;
  width: 50px;
  height: 50px;
`;

export const BgGreenCircleTopRight = styled(BgBase)`
  top: 72px;
  right: 43px;
  width: 45px;
  height: 45px;
`;
export const BgGreenCircleBottomLeft = styled(BgBase)`
  bottom: 46px;
  left: 60px;
  width: 30px;
  height: 30px;
`;

export const BgRedCircleTopRight = styled(BgBase)`
  top: 150px;
  right: 250px;
  width: 12px;
  height: 12px;
`;
export const BgRedCircleBottomLeft = styled(BgBase)`
  bottom: 130px;
  left: 210px;
  width: 12px;
  height: 12px;
`;

export const BgTriangleTopRight = styled(BgBase)`
  top: 40px;
  right: 40px;
  width: 28px;
  height: 28px;
`;

export const BgTriangleBottomLeft = styled(BgBase)`
  bottom: 80px;
  left: 80px;
  width: 24px;
  height: 24px;
`;

export const BgTwinkleTopRight = styled(BgBase)`
  top: 100px;
  right: 120px;
  width: 30px;
  height: 30px;
`;

export const BgTwinkleBottomLeft = styled(BgBase)`
  bottom: 140px;
  left: 140px;
  width: 20px;
  height: 20px;
`;
