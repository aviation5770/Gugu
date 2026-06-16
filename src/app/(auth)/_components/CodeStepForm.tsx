'use client';

import React from 'react';
import * as S from '../login/student/student-login.style';

interface CodeStepFormProps {
  code: string;
  onChangeCode: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onRedirectTeacher: () => void;
  isPending?: boolean;
}

export default function CodeStepForm({
  code,
  onChangeCode,
  onSubmit,
  onRedirectTeacher,
  isPending = false,
}: CodeStepFormProps) {
  return (
    <>
      <S.InputForm onSubmit={onSubmit}>
        <S.CodeInput
          type="text"
          placeholder="수업 코드(ex.AA001)"
          value={code}
          onChange={(e) => onChangeCode(e.target.value)}
          required
        />
        <S.SubmitButton type="submit" disabled={isPending}>
          {isPending ? '확인 중...' : '입장'}
        </S.SubmitButton>
      </S.InputForm>

      <S.FooterArea>
        <div className="divider">
          <span>또는</span>
        </div>
        <button type="button" className="login-link" onClick={onRedirectTeacher}>
          교사 계정 로그인
        </button>
      </S.FooterArea>
    </>
  );
}
