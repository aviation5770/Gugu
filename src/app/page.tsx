'use client';

import { Fragment } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import * as S from './landing-page.style';
import AuthBackground from './(auth)/_components/AuthBackground';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useI18n } from '@/i18n/LocaleProvider';

export default function LongLandingPage() {
  const router = useRouter();
  const { t } = useI18n();

  return (
    <S.PageWrapper>
      <S.LanguageBar>
        <LanguageSwitcher />
      </S.LanguageBar>
      
      <S.HeroSection>
        <AuthBackground />
        <S.HeroContent>
          <S.LogoContainer>
            <Image src="/images/gugu.svg" alt="구구" fill priority sizes="240px" />
          </S.LogoContainer>
          <S.MainTitle>
            {t('landing.title').split('\n').map((line) => (
              <Fragment key={line}>
                {line}
                <br />
              </Fragment>
            ))}
          </S.MainTitle>
          <S.SubDescription>
            {t('landing.description')}
          </S.SubDescription>
        </S.HeroContent>
      </S.HeroSection>

      <S.ValueSection>
        <S.SectionTitle>{t('landing.valueTitle')}</S.SectionTitle>
        <S.SectionDesc>{t('landing.valueDescription')}</S.SectionDesc>
        
        <S.GridContainer>
          <S.ValueCard $color="#f06292">
            <S.CardIcon $color="#f06292">🎯</S.CardIcon>
            <S.CardTitle>{t('landing.valueOneTitle')}</S.CardTitle>
            <S.CardText>
              {t('landing.valueOneText')}
            </S.CardText>
          </S.ValueCard>

          <S.ValueCard $color="#42a5f5">
            <S.CardIcon $color="#42a5f5">⏱️</S.CardIcon>
            <S.CardTitle>{t('landing.valueTwoTitle')}</S.CardTitle>
            <S.CardText>
              {t('landing.valueTwoText')}
            </S.CardText>
          </S.ValueCard>

          <S.ValueCard $color="#66bb6a">
            <S.CardIcon $color="#66bb6a">📊</S.CardIcon>
            <S.CardTitle>{t('landing.valueThreeTitle')}</S.CardTitle>
            <S.CardText>
              {t('landing.valueThreeText')}
            </S.CardText>
          </S.ValueCard>
        </S.GridContainer>
      </S.ValueSection>

      <S.ActionSection>
        <S.SectionTitle>{t('landing.startTitle')}</S.SectionTitle>
        <S.SectionDesc>{t('landing.startDescription')}</S.SectionDesc>
        
        <S.FlexContainer>
          <S.ActionCard onClick={() => router.push('/login/student')}>
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ fontSize: '19px', fontWeight: 700, marginBottom: '8px' }}>
                {t('landing.studentTitle')}
              </h3>
              <p style={{ fontSize: '14px', color: '#777', marginBottom: '24px' }}>
                {t('landing.studentDescription')}
              </p>
            </div>
            <S.ActionBtn type="button">{t('landing.studentButton')}</S.ActionBtn>
          </S.ActionCard>

          <S.ActionCard $isTeacher onClick={() => router.push('/login/teacher')}>
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ fontSize: '19px', fontWeight: 700, marginBottom: '8px' }}>
                {t('landing.teacherTitle')}
              </h3>
              <p style={{ fontSize: '14px', color: '#777', marginBottom: '24px' }}>
                {t('landing.teacherDescription')}
              </p>
            </div>
            <S.ActionBtn $isTeacher type="button">{t('landing.teacherButton')}</S.ActionBtn>
          </S.ActionCard>
        </S.FlexContainer>
      </S.ActionSection>

      <S.FAQSection>
        <S.SectionTitle>{t('landing.faqTitle')}</S.SectionTitle>
        <S.SectionDesc>{t('landing.faqDescription')}</S.SectionDesc>
        
        <S.FAQContainer>
          <S.FAQRow>
            <S.FAQQuestion><span>Q.</span> {t('landing.questionOne')}</S.FAQQuestion>
            <S.FAQAnswer>{t('landing.answerOne')}</S.FAQAnswer>
          </S.FAQRow>
          
          <S.FAQRow>
            <S.FAQQuestion><span>Q.</span> {t('landing.questionTwo')}</S.FAQQuestion>
            <S.FAQAnswer>{t('landing.answerTwo')}</S.FAQAnswer>
          </S.FAQRow>
        </S.FAQContainer>
      </S.FAQSection>

      <S.Footer>
        {t('landing.footer').split('\n').map((line) => (
          <span key={line}>
            {line}
            <br />
          </span>
        ))}
        <p style={{ marginTop: '16px', color: '#555' }}>{t('landing.copyright')}</p>
      </S.Footer>

    </S.PageWrapper>
  );
}
