"use client";

import Image from "next/image";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import AuthBackground from "../_components/AuthBackground";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { requestTeacherPasswordResetAction } from "@/app/actions/auth";
import * as S from "../login/teacher/teacher-login.style";

export default function FindPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    setIsError(false);

    startTransition(async () => {
      const result = await requestTeacherPasswordResetAction({ email });

      if (!result.success) {
        setIsError(true);
        setMessage(result.error);
        return;
      }

      setMessage("비밀번호 재설정 메일을 발송했습니다.");
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
        <S.InputForm onSubmit={handleSubmit}>
          <S.AuthInput
            type="email"
            placeholder="가입 이메일"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          {message ? (
            <S.ErrorMessage style={isError ? undefined : { backgroundColor: "#f0fdf4", color: "#15803d" }}>
              {message}
            </S.ErrorMessage>
          ) : null}
          <S.SubmitButton type="submit" disabled={isPending}>
            {isPending ? "발송 중..." : "재설정 메일 발송"}
          </S.SubmitButton>
        </S.InputForm>
        <S.FooterArea>
          <button type="button" className="text-link" onClick={() => router.push("/login/teacher")}>
            로그인으로 돌아가기
          </button>
        </S.FooterArea>
      </S.CardSection>
    </S.Container>
  );
}
