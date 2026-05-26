'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import * as S from './student-login.style';

type Step = 'code' | 'auth';

export default function StudentLoginPage() {
  const [step, setStep] = useState<Step>('code');
  const [code, setCode] = useState('');
  const [classNumber, setClassNumber] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const router = useRouter();

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;
    // TODO: validate class code with API
    console.log('입력된 수업 코드:', code);
    setStep('auth');
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!classNumber.trim() || !birthDate.trim()) return;
    // TODO: authenticate student with API
    console.log('학반번호:', classNumber, '생년월일:', birthDate);
    router.push('/student/dashboard');
  };

  const handleBack = () => {
    setStep('code');
  };

  const handleTeacherLoginRedirect = () => {
    router.push('/login/teacher');
  };

  return (
    <S.Container>
      {/* Background decorations */}
      <S.BgYellowEllipse>
        <Image src="/background/YellowEllipse.svg" alt="" fill aria-hidden="true" />
      </S.BgYellowEllipse>
      <S.BgPinkEllipse>
        <Image src="/background/PinkEllipse.svg" alt="" fill aria-hidden="true" />
      </S.BgPinkEllipse>
      <S.BgGreenCircleTopRight>
        <Image src="/background/GreenCircle.svg" alt="" fill aria-hidden="true" />
      </S.BgGreenCircleTopRight>
      <S.BgRedCircleBottomRight>
        <Image src="/background/RedCircle.svg" alt="" fill aria-hidden="true" />
      </S.BgRedCircleBottomRight>
      <S.BgTriangleTopRight>
        <Image src="/background/Triangle.svg" alt="" fill aria-hidden="true" />
      </S.BgTriangleTopRight>
      <S.BgTriangleBottomLeft>
        <Image src="/background/Triangle.svg" alt="" fill aria-hidden="true" />
      </S.BgTriangleBottomLeft>
      <S.BgTwinkleTopRight>
        <Image src="/background/Twinkle.svg" alt="" fill aria-hidden="true" />
      </S.BgTwinkleTopRight>
      <S.BgTwinkleBottomLeft>
        <Image src="/background/Twinkle.svg" alt="" fill aria-hidden="true" />
      </S.BgTwinkleBottomLeft>

      <S.CardSection>
        <S.LogoWrapper>
          <Image
            src="/images/gugu.svg"
            alt="구구플러스 로고"
            fill
            priority
          />
        </S.LogoWrapper>

        {step === 'code' ? (
          <>
            <S.InputForm onSubmit={handleCodeSubmit}>
              <S.CodeInput
                type="text"
                placeholder="수업 코드(ex.AA001)"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
              />
              <S.SubmitButton type="submit">입장</S.SubmitButton>
            </S.InputForm>

            <S.FooterArea>
              <div className="divider">
                <span>또는</span>
              </div>
              <button
                type="button"
                className="login-link"
                onClick={handleTeacherLoginRedirect}
              >
                교사 계정 로그인
              </button>
            </S.FooterArea>
          </>
        ) : (
          <>
            <S.StepTitle>학생 정보를 입력해 주세요</S.StepTitle>

            <S.InputForm onSubmit={handleAuthSubmit}>
              <S.CodeInput
                type="text"
                placeholder="학반번호 (ex. 3학년 2반 15번 → 320015)"
                value={classNumber}
                onChange={(e) => setClassNumber(e.target.value)}
                required
              />
              <S.CodeInput
                type="text"
                placeholder="생년월일 (ex. 20150325)"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                maxLength={8}
                required
              />
              <S.SubmitButton type="submit">로그인</S.SubmitButton>
            </S.InputForm>

            <S.FooterArea>
              <button type="button" className="login-link" onClick={handleBack}>
                ← 수업 코드로 돌아가기
              </button>
            </S.FooterArea>
          </>
        )}
      </S.CardSection>
    </S.Container>
  );
}