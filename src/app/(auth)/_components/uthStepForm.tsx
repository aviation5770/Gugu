'use client';

import React from 'react';
import * as S from '../login/student/student-login.style';

interface AuthStepFormProps {
  classNumber: string;
  birthDate: string;
  onChangeClassNumber: (value: string) => void;
  onChangeBirthDate: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
}

export default function AuthStepForm({
  classNumber,
  birthDate,
  onChangeClassNumber,
  onChangeBirthDate,
  onSubmit,
  onBack,
}: AuthStepFormProps) {
  return (
    <>
      <S.StepTitle>학생 정보를 입력해 주세요</S.StepTitle>

      <S.InputForm onSubmit={onSubmit}>
        <S.CodeInput
          type="text"
          placeholder="학반번호 (ex. 3학년 2반 15번 → 30215)"
          value={classNumber}
          onChange={(e) => onChangeClassNumber(e.target.value)}
          required
        />
        <S.CodeInput
          type="text"
          placeholder="생년월일 (ex. 150325)"
          value={birthDate}
          onChange={(e) => onChangeBirthDate(e.target.value)}
          maxLength={8}
          required
        />
        <S.SubmitButton type="submit">로그인</S.SubmitButton>
      </S.InputForm>

      <S.FooterArea>
        <button type="button" className="login-link" onClick={onBack}>
          ← 수업 코드로 돌아가기
        </button>
      </S.FooterArea>
    </>
  );
}