import styled from "styled-components";

export const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background: transparent;
  font-family: "Noto Sans KR", sans-serif;
  overflow-x: hidden;
`;

export const LanguageBar = styled.div`
  position: fixed;
  top: 18px;
  right: 18px;
  z-index: 30;
`;

export const HeroSection = styled.section`
  position: relative;
  width: 100%;
  height: 85vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

export const HeroContent = styled.div`
  position: relative;
  z-index: 10;
  text-align: center;
  max-width: 800px;
  padding: 0 24px;
`;

export const LogoContainer = styled.div`
  position: relative;
  width: 240px;
  height: 140px;
  margin: 0 auto 16px;
`;

export const MainTitle = styled.h2`
  font-size: 36px;
  font-weight: 800;
  color: #222;
  line-height: 1.4;
  margin-bottom: 20px;

  span {
    color: #f06292;
  }
`;

export const SubDescription = styled.p`
  font-size: 17px;
  color: #555;
  line-height: 1.6;
  margin-bottom: 40px;
`;

export const ValueSection = styled.section`
  width: 100%;
  background-color: #f8fafc;
  padding: 100px 24px;
  text-align: center;
`;

export const SectionTitle = styled.h2`
  font-size: 28px;
  font-weight: 700;
  color: #222;
  margin-bottom: 16px;

  span {
    color: #f06292;
  }
`;

export const SectionDesc = styled.p`
  font-size: 15px;
  color: #777;
  margin-bottom: 60px;
`;

export const GridContainer = styled.div`
  max-width: 1040px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const ValueCard = styled.div<{ $color: string }>`
  background: #ffffff;
  border-radius: 24px;
  padding: 40px 24px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
  border: 1.5px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-8px);
    border-color: ${(props) => props.$color};
  }
`;

export const CardIcon = styled.div<{ $color: string }>`
  width: 80px;
  height: 80px;
  border-radius: 20px;
  background-color: ${(props) => props.$color}15; /* 15% 투명도 */
  color: ${(props) => props.$color};
  font-size: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
`;

export const CardTitle = styled.h4`
  font-size: 18px;
  font-weight: 700;
  color: #333;
  margin-bottom: 12px;
`;

export const CardText = styled.p`
  font-size: 14px;
  color: #666;
  line-height: 1.6;
`;

export const ActionSection = styled.section`
  width: 100%;
  padding: 100px 24px;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const FlexContainer = styled.div`
  width: 100%;
  max-width: 900px;
  display: flex;
  gap: 24px;
  margin-top: 20px;

  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

export const ActionCard = styled.div<{ $isTeacher?: boolean }>`
  flex: 1;
  background: #ffffff;
  border: 2px solid #e0e0e0;
  border-radius: 24px;
  padding: 44px 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-height: 240px;
  transition: all 0.2s;

  &:hover {
    border-color: ${(props) => (props.$isTeacher ? "#f06292" : "#42a5f5")};
    box-shadow: 0 12px 30px
      ${(props) =>
        props.$isTeacher
          ? "rgba(240, 98, 146, 0.12)"
          : "rgba(66, 165, 245, 0.12)"};
  }
`;

export const ActionBtn = styled.button<{ $isTeacher?: boolean }>`
  width: 100%;
  height: 54px;
  background: ${(props) => (props.$isTeacher ? "#f06292" : "#42a5f5")};
  color: white;
  border: none;
  border-radius: 14px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: ${(props) => (props.$isTeacher ? "#e91e8c" : "#1e88e5")};
  }
`;

export const FAQSection = styled.section`
  width: 100%;
  background-color: #f8fafc;
  padding: 100px 24px;
`;

export const FAQContainer = styled.div`
  max-width: 760px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const FAQRow = styled.div`
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  padding: 20px 24px;
  text-align: left;
`;

export const FAQQuestion = styled.p`
  font-size: 15px;
  font-weight: 700;
  color: #333;
  margin-bottom: 6px;
  display: flex;
  gap: 8px;

  span {
    color: #f06292;
  }
`;

export const FAQAnswer = styled.p`
  font-size: 14px;
  color: #666;
  line-height: 1.5;
  padding-left: 21px;
`;

export const Footer = styled.footer`
  width: 100%;
  background-color: #222222;
  padding: 48px 24px;
  color: #888888;
  text-align: center;
  font-size: 13px;
  line-height: 1.6;
`;
