'use client';

import React, { useState, useTransition } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import * as S from './teacher-login.style';
import AuthBackground from '../../_components/AuthBackground';
import { teacherLoginAction } from '@/app/actions/auth';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useI18n } from '@/i18n/LocaleProvider';

export default function TeacherLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { t } = useI18n();

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    if (!email.trim() || !password.trim()) return;

    startTransition(async () => {
      const result = await teacherLoginAction({ email, password });

      if (!result.success) {
        setErrorMessage(result.error);
        return;
      }

      router.push('/teacher/dashboard');
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

        <S.InputForm onSubmit={handleLoginSubmit}>
          <S.AuthInput
            type="email"
            placeholder={t('auth.email')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <S.AuthInput
            type="password"
            placeholder={t('auth.password')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errorMessage ? <S.ErrorMessage>{errorMessage}</S.ErrorMessage> : null}
          <S.SubmitButton type="submit" disabled={isPending}>
            {isPending ? t('auth.loggingIn') : t('auth.login')}
          </S.SubmitButton>
        </S.InputForm>

        <S.FooterArea>
          <div className="divider">
            <span>{t('auth.or')}</span>
          </div>

          <div className="nav-links-row">
            <button 
              type="button" 
              className="text-link" 
              onClick={() => router.push('/find-password')}
            >
              {t('auth.findPassword')}
            </button>
            <span>|</span>
            <button 
              type="button" 
              className="text-link" 
              onClick={() => router.push('/login/student')}
            >
              {t('auth.studentLogin')}
            </button>
          </div>

          <div className="signup-prompt">
            {t('auth.newToGugu')}
            <button 
              type="button" 
              className="signup-link" 
              onClick={() => router.push('/signup')}
            >
              {t('auth.signup')}
            </button>
          </div>
        </S.FooterArea>
      </S.CardSection>
    </S.Container>
  );
}
