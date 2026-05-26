'use client';

import React, { useState, useTransition } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import * as S from './signup.style';
import AuthBackground from '../_components/AuthBackground';
import { teacherSignupAction } from '@/app/actions/auth';

export default function TeacherSignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) return;

    if (password !== confirmPassword) {
      setErrorMessage('비밀번호가 일치하지 않습니다. 다시 확인해 주세요.');
      return;
    }

    startTransition(async () => {
      const result = await teacherSignupAction({
        name,
        email,
        password,
        confirmPassword,
      });

      if (!result.success) {
        setErrorMessage(result.error);
        return;
      }

      router.push('/login/teacher');
    });
  };

  return (
    <S.Container>
      <AuthBackground />

      <S.CardSection>
        <S.LogoWrapper>
          <Image src="/images/gugu.svg" alt="구구" fill priority />
        </S.LogoWrapper>

        <S.InputForm onSubmit={handleSignupSubmit}>
          <S.AuthInput
            type="text"
            placeholder="이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <S.AuthInput
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <S.AuthInput
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <S.AuthInput
            type="password"
            placeholder="비밀번호 확인"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {errorMessage ? <S.ErrorMessage>{errorMessage}</S.ErrorMessage> : null}
          <S.SubmitButton type="submit" disabled={isPending}>
            {isPending ? '가입 중...' : '회원가입'}
          </S.SubmitButton>
        </S.InputForm>

        <S.FooterArea>
          <div className="login-prompt">
            이미 계정이 있으신가요?
            <button 
              type="button" 
              className="login-link" 
              onClick={() => router.push('/login/teacher')}
            >
              로그인
            </button>
          </div>
        </S.FooterArea>
      </S.CardSection>
    </S.Container>
  );
}
