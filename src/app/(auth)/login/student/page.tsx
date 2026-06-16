'use client';

import React, { useState, useTransition } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import * as S from './student-login.style';
import AuthBackground from '../../_components/AuthBackground';
import {
  studentLoginAction,
  verifyStudentClassCodeAction,
} from '@/app/actions/auth';
import LanguageSwitcher from '@/components/LanguageSwitcher';

import CodeStepForm from '../../_components/CodeStepForm';
import AuthStepForm from '../../_components/uthStepForm';

type Step = 'code' | 'auth';

export default function StudentLoginPage() {
  const [step, setStep] = useState<Step>('code');
  const [code, setCode] = useState('');
  const [classNumber, setClassNumber] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    if (!code.trim()) return;

    startTransition(async () => {
      const result = await verifyStudentClassCodeAction({ code });

      if (!result.success) {
        setErrorMessage(result.error);
        return;
      }

      setStep('auth');
    });
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    if (!classNumber.trim() || !birthDate.trim()) return;

    startTransition(async () => {
      const result = await studentLoginAction({ code, classNumber, birthDate });

      if (!result.success) {
        setErrorMessage(result.error);
        return;
      }

      router.push('/student/play');
    });
  };

  return (
    <S.Container>
      <AuthBackground />
      <S.LanguageArea>
        <LanguageSwitcher />
      </S.LanguageArea>

      <S.CardSection>
        <S.LogoWrapper>
          <Image src="/images/gugu.svg" alt="구구" fill priority sizes="220px" />
        </S.LogoWrapper>

        {errorMessage ? <S.ErrorMessage>{errorMessage}</S.ErrorMessage> : null}
        {step === 'code' ? (
          <CodeStepForm
            code={code}
            onChangeCode={setCode}
            onSubmit={handleCodeSubmit}
            onRedirectTeacher={() => router.push('/login/teacher')}
            isPending={isPending}
          />
        ) : (
          <AuthStepForm
            classNumber={classNumber}
            birthDate={birthDate}
            onChangeClassNumber={setClassNumber}
            onChangeBirthDate={setBirthDate}
            onSubmit={handleAuthSubmit}
            onBack={() => setStep('code')}
            isPending={isPending}
          />
        )}
      </S.CardSection>
    </S.Container>
  );
}
