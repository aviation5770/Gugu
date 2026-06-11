"use client";

import { useState } from "react";
import * as S from "./new-class.styles";

export default function NewClassPage() {
  const [grade, setGrade] = useState("4");
  const [room, setRoom] = useState("1");
  const [studentCount, setStudentCount] = useState("24");
  const [resultCode, setResultCode] = useState("");
  const className = `${grade}학년 ${room}반`;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResultCode("GG-4101");
  };

  return (
    <S.NewClassContainer>
      <S.FormPanel>
        <S.Title>수업 생성</S.Title>
        <S.Description>
          학급 정보를 입력하면 학생 번호가 자동으로 생성되고, 학생에게 공유할 수업 코드가 발급됩니다.
        </S.Description>

        <S.Form onSubmit={handleSubmit}>
          <S.FormGrid>
            <S.Label>
              학년
              <S.Input value={grade} onChange={(event) => setGrade(event.target.value)} />
            </S.Label>
            <S.Label>
              반
              <S.Input value={room} onChange={(event) => setRoom(event.target.value)} />
            </S.Label>
          </S.FormGrid>
          <S.Label>
            총 학생 인원
            <S.Input
              inputMode="numeric"
              value={studentCount}
              onChange={(event) => setStudentCount(event.target.value)}
            />
          </S.Label>
          <S.SubmitButton type="submit">자동 명단 생성</S.SubmitButton>
        </S.Form>

        {resultCode ? (
          <S.ResultBox>
            {className} 생성 준비 완료 · 수업 코드 {resultCode} · {studentCount}명 명단 생성
          </S.ResultBox>
        ) : null}

        <S.BackLink href="/teacher/home">홈으로 돌아가기</S.BackLink>
      </S.FormPanel>

      <S.PreviewPanel>
        <S.Title>미리보기</S.Title>
        <S.Description>생성 후 홈과 사이드바에 표시될 클래스 카드 형태입니다.</S.Description>
        <S.PreviewCard>
          <S.PreviewHeader>
            <h3>{className}</h3>
            <p>구구쌤 선생님</p>
          </S.PreviewHeader>
          <S.PreviewBody>
            학생 번호 1번부터 {studentCount || "0"}번까지 자동 배정됩니다. 학생은 수업 코드와
            학반번호, 생년월일로 로그인할 수 있습니다.
          </S.PreviewBody>
        </S.PreviewCard>
      </S.PreviewPanel>
    </S.NewClassContainer>
  );
}
