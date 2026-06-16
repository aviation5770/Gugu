'use client';

import React, { useState, useTransition } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import * as S from './signup.style';
import AuthBackground from '../_components/AuthBackground';
import { teacherSignupAction } from '@/app/actions/auth';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useI18n } from '@/i18n/LocaleProvider';

export default function TeacherSignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { t } = useI18n();

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) return;

    if (password !== confirmPassword) {
      setErrorMessage(t('auth.passwordMismatch'));
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
      <S.LanguageArea>
        <LanguageSwitcher />
      </S.LanguageArea>

      <S.CardSection>
        <S.LogoWrapper>
          <Image src="/images/gugu.svg" alt="구구" fill priority sizes="180px" />
        </S.LogoWrapper>

        <S.InputForm onSubmit={handleSignupSubmit}>
          <S.AuthInput
            type="text"
            placeholder={t('auth.name')}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
          <S.AuthInput
            type="password"
            placeholder={t('auth.confirmPassword')}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {errorMessage ? <S.ErrorMessage>{errorMessage}</S.ErrorMessage> : null}
          <S.SubmitButton type="submit" disabled={isPending}>
            {isPending ? t('auth.signingUp') : t('auth.signup')}
          </S.SubmitButton>
        </S.InputForm>

        <S.FooterArea>
          <div className="login-prompt">
            {t('auth.alreadyHaveAccount')}
            <button 
              type="button" 
              className="login-link" 
              onClick={() => router.push('/login/teacher')}
            >
              {t('auth.login')}
            </button>
          </div>
        </S.FooterArea>
      </S.CardSection>
    </S.Container>
  );
}
