import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
  pointer-events: none;
`;

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
