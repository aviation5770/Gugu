'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import * as S from './teacher-login.style';
import AuthBackground from '../../_components/AuthBackground';

export default function TeacherLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;

    console.log('교사 로그인 요청 - 이메일:', email, '비밀번호:', password);
    router.push('/teacher/dashboard');
  };

  return (
    <S.Container>
      <AuthBackground />

      <S.CardSection>
        <S.LogoWrapper>
          <Image src="/images/gugu.svg" alt="구구" fill priority />
        </S.LogoWrapper>

        <S.InputForm onSubmit={handleLoginSubmit}>
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
          <S.SubmitButton type="submit">로그인</S.SubmitButton>
        </S.InputForm>

        <S.FooterArea>
          <div className="divider">
            <span>또는</span>
          </div>

          <div className="nav-links-row">
            <button 
              type="button" 
              className="text-link" 
              onClick={() => router.push('/find-password')}
            >
              비밀번호 찾기
            </button>
            <span>|</span>
            <button 
              type="button" 
              className="text-link" 
              onClick={() => router.push('/login/student')}
            >
              학생 로그인
            </button>
          </div>

          <div className="signup-prompt">
            구구에 처음 오셨나요?
            <button 
              type="button" 
              className="signup-link" 
              onClick={() => router.push('/signup')}
            >
              회원가입
            </button>
          </div>
        </S.FooterArea>
      </S.CardSection>
    </S.Container>
  );
}