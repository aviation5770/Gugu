"use client";

import React from "react";
import * as S from "./home.styles";

const MOCK_CLASS_CARDS = [
  {
    id: "class-1",
    class_name: "3학년 3반",
    todo_alert: "내일 오후 1:00 - 3단 시험",
    profile_color: "#083B4D",
  },
  {
    id: "class-2",
    class_name: "5학년 2반",
    teacher_name: "[게스트] 안형진",
    todo_alert: "이번주 금요일 - 11단 ~ 41단 50문제 시험",
    profile_color: "#9145D4",
  },
];

const HEADER_COLORS = ["#9145D4", "#FA4541", "#60C43E", "#EF466E", "#FFD165"];

export default function TeacherDashboardPage() {
  const classesData = MOCK_CLASS_CARDS;

  return (
    <S.DashboardContainer>
      <S.HeaderTitleSection>
        <S.PageTitle>참여 중인 수업 목록</S.PageTitle>
        <S.PageDescription>초대받은 수업은 [게스트]로 표시됩니다.</S.PageDescription>
      </S.HeaderTitleSection>

      <S.CardGrid>
        {classesData.map((item, index) => {
          const cardBgColor = HEADER_COLORS[index % HEADER_COLORS.length];

          return (
            <S.ClassCard key={item.id}>
              <S.CardHeader $bgColor={cardBgColor}>
                <S.ClassName>{item.class_name}</S.ClassName>
                <S.TeacherName>{item.teacher_name} 선생님</S.TeacherName>
                
                <S.ClassProfileBadge $profileColor={item.profile_color}>
                  {item.class_name.replace(/[^a-zA-Z0-9가-힣]/g, "").slice(0, 2)}
                </S.ClassProfileBadge>
              </S.CardHeader>

              <S.CardBody>
                {item.todo_alert && (
                  <S.AlertBox>
                    <S.AlertLabel>⏳ 다가오는 일정</S.AlertLabel>
                    <S.AlertText>{item.todo_alert}</S.AlertText>
                  </S.AlertBox>
                )}
              </S.CardBody>

              <S.CardFooterToolbar>
                <S.FooterButton title="학생 대시보드 바로가기">
                  <span>👤</span>
                  <S.FooterButtonText>학생 대시보드</S.FooterButtonText>
                </S.FooterButton>
                <S.MoreMenuButton title="추가 옵션">⋮</S.MoreMenuButton>
              </S.CardFooterToolbar>
            </S.ClassCard>
          );
        })}
      </S.CardGrid>
    </S.DashboardContainer>
  );
}