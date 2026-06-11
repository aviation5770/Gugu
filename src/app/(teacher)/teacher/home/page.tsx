"use client";

import React from "react";
import * as S from "./home.styles";
import { MOCK_TEACHER_CLASSES } from "../../_data/mockTeacher";

export default function TeacherDashboardPage() {
  const classesData = MOCK_TEACHER_CLASSES;

  return (
    <S.DashboardContainer>
      <S.HeaderTitleSection>
        <S.PageTitle>참여 중인 수업 목록</S.PageTitle>
        <S.PageDescription>초대받은 수업은 [게스트]로 표시됩니다.</S.PageDescription>
      </S.HeaderTitleSection>

      <S.CardGrid>
        {classesData.map((item) => {
          const cardBgColor = item.header_color;

          return (
            <S.ClassCard key={item.id} href={`/teacher/class/${item.id}`}>
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
