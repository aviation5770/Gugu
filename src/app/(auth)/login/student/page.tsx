'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import * as S from './student-login.style';
import AuthBackground from '../../_components/AuthBackground';

import CodeStepForm from '../../_components/CodeStepForm';
import AuthStepForm from '../../_components/uthStepForm';

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

    if (code.trim() === 'aviation5770') {
      console.log('테스트 코드가 확인되었습니다. 학생 로그인 단계로 이동합니다.');
      setStep('auth');
    } else {
      console.log('입력된 수업 코드:', code);
      setStep('auth'); 
    }
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!classNumber.trim() || !birthDate.trim()) return;
    
    console.log('학반번호:', classNumber, '생년월일:', birthDate);
    router.push('/student/dashboard');
  };

  return (
    <S.Container>
      <AuthBackground />

      <S.CardSection>
        <S.LogoWrapper>
          <Image src="/images/gugu.svg" alt="구구" fill priority />
        </S.LogoWrapper>

        {step === 'code' ? (
          <CodeStepForm
            code={code}
            onChangeCode={setCode}
            onSubmit={handleCodeSubmit}
            onRedirectTeacher={() => router.push('/login/teacher')}
          />
        ) : (
          <AuthStepForm
            classNumber={classNumber}
            birthDate={birthDate}
            onChangeClassNumber={setClassNumber}
            onChangeBirthDate={setBirthDate}
            onSubmit={handleAuthSubmit}
            onBack={() => setStep('code')}
          />
        )}
      </S.CardSection>
    </S.Container>
  );
}