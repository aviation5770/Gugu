'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import * as S from './student-login.style';
import AuthBackground from '../../_components/AuthBackground';

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
    setStep('auth');
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!classNumber.trim() || !birthDate.trim()) return;
    router.push('/student/dashboard');
  };

  return (
    <S.Container>
      <AuthBackground />

      <S.CardSection>
        <S.LogoWrapper>
          <Image src="/images/gugu.svg" alt="구구플러스 로고" fill priority />
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
              <div className="divider"><span>또는</span></div>
              <button type="button" className="login-link" onClick={() => router.push('/login/teacher')}>
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
              <button type="button" className="login-link" onClick={() => setStep('code')}>
                ← 수업 코드로 돌아가기
              </button>
            </S.FooterArea>
          </>
        )}
      </S.CardSection>
    </S.Container>
  );
}