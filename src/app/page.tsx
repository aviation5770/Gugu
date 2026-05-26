'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import * as S from './landing-page.style';
import AuthBackground from './(auth)/_components/AuthBackground';

export default function LongLandingPage() {
  const router = useRouter();

  return (
    <S.PageWrapper>
      
      <S.HeroSection>
        <AuthBackground />
        <S.HeroContent>
          <S.LogoContainer>
            <Image src="/images/gugu.svg" alt="구구" fill priority />
          </S.LogoContainer>
          <S.MainTitle>
            초등 고학년을 위한<br />특별한 소수 구구단 놀이터, <span>'구구'</span>
          </S.MainTitle>
          <S.SubDescription>
            유치한 유아용 연산 프로그램은 이제 그만! 고학년 맞춤형 무채색 톤 디자인에서<br />
            11단부터 41단까지 소수 곱셈과 타임 어택으로 수학 근육을 키워보세요.
          </S.SubDescription>
        </S.HeroContent>
      </S.HeroSection>

      <S.ValueSection>
        <S.SectionTitle>왜 <span>구구</span>와 함께 해야 할까요?</S.SectionTitle>
        <S.SectionDesc>고학년 학생의 흥미 유발과 선생님의 효율적인 학습 운영을 동시 보장합니다.</S.SectionDesc>
        
        <S.GridContainer>
          <S.ValueCard $color="#f06292">
            <S.CardIcon $color="#f06292">🎯</S.CardIcon>
            <S.CardTitle>고학년 특화 문제셋</S.CardTitle>
            <S.CardText>
              1단부터 9단까지의 단순 반복을 넘어, 11단~41단 소수 구구단 및 두 자릿수 곱셈을 수록하여 고난도 사고력을 길러줍니다.
            </S.CardText>
          </S.ValueCard>

          <S.ValueCard $color="#42a5f5">
            <S.CardIcon $color="#42a5f5">⏱️</S.CardIcon>
            <S.CardTitle>시간 측정 및 랭킹 시스템</S.CardTitle>
            <S.CardText>
              정답을 모두 맞출 때까지의 시간을 측정하는 타임 기록제와 학급 실시간 랭킹 제도를 도입해 승부욕과 몰입감을 선사합니다.
            </S.CardText>
          </S.ValueCard>

          <S.ValueCard $color="#66bb6a">
            <S.CardIcon $color="#66bb6a">📊</S.CardIcon>
            <S.CardTitle>번거롭지 않은 자동화 행정</S.CardTitle>
            <S.CardText>
              교사가 학생 수만 입력하면 자동으로 명단과 학번이 할당되며, 즉각적인 채점과 피드백 리포트가 시스템에서 자동 생성됩니다.
            </S.CardText>
          </S.ValueCard>
        </S.GridContainer>
      </S.ValueSection>

      <S.ActionSection>
        <S.SectionTitle>지금 바로 <span>구구</span>를 시작하세요</S.SectionTitle>
        <S.SectionDesc>원하시는 로그인 모드를 선택하시면 해당 서비스로 즉시 연결됩니다.</S.SectionDesc>
        
        <S.FlexContainer>
          <S.ActionCard onClick={() => router.push('/login/student')}>
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ fontSize: '19px', fontWeight: 700, marginBottom: '8px' }}>🙋‍♂️ 학생으로 입장하기</h3>
              <p style={{ fontSize: '14px', color: '#777', marginBottom: '24px' }}>회원가입 없이 발급받은 수업 코드로 즉시 진입</p>
            </div>
            <S.ActionBtn type="button">클래스 입장하기</S.ActionBtn>
          </S.ActionCard>

          <S.ActionCard $isTeacher onClick={() => router.push('/login/teacher')}>
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ fontSize: '19px', fontWeight: 700, marginBottom: '8px' }}>👩‍🏫 선생님 공간</h3>
              <p style={{ fontSize: '14px', color: '#777', marginBottom: '24px' }}>학급 생성, 명단 발급 및 실시간 종합 관리 환경</p>
            </div>
            <S.ActionBtn $isTeacher type="button">교사 로그인 / 가입</S.ActionBtn>
          </S.ActionCard>
        </S.FlexContainer>
      </S.ActionSection>

      <S.FAQSection>
        <S.SectionTitle>자주 묻는 질문 <span>FAQ</span></S.SectionTitle>
        <S.SectionDesc>서비스 이용 전 궁금한 핵심 사항을 미리 확인해보세요.</S.SectionDesc>
        
        <S.FAQContainer>
          <S.FAQRow>
            <S.FAQQuestion><span>Q.</span> 학생들도 개별 회원가입을 해야 하나요?</S.FAQQuestion>
            <S.FAQAnswer>아닙니다. 학생은 번거로운 절차 없이 교사가 공유해 준 고유 '수업 코드'와 배정된 학번만 입력하면 비밀번호 설정 후 간편하게 접속할 수 있습니다.</S.FAQAnswer>
          </S.FAQRow>
          
          <S.FAQRow>
            <S.FAQQuestion><span>Q.</span> 11단~41단 문제는 초등학생에게 너무 어렵지 않을까요?</S.FAQQuestion>
            <S.FAQAnswer>본 서비스는 원리의 이해와 놀이형 타임어택 방식을 결합하여 고학년(3~5학년) 수준에서 충분히 도전감을 느끼며 수학적 몰입감을 배울 수 있도록 구성되었습니다.</S.FAQAnswer>
          </S.FAQRow>
        </S.FAQContainer>
      </S.FAQSection>

      <S.Footer>
        주소: 대구광역시 북구 대학로 80 | 대표번호: 123-4567<br />
        사업자등록번호: 000-00-00000 | 통신판매업신고: 제 2026-대구북구-0000호<br />
        <p style={{ marginTop: '16px', color: '#555' }}>© 2026 구구플러스(gugu+). All rights reserved.</p>
      </S.Footer>

    </S.PageWrapper>
  );
}