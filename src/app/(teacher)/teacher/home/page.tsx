"use client";

import { useState } from "react";
import * as S from "./home.styles";
import { useTeacherClasses } from "../../_context/TeacherClassContext";

export default function TeacherDashboardPage() {
  const { classes, deleteClass, isLoading, loadError } = useTeacherClasses();
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const handleDeleteClass = async (classId: string, className: string) => {
    if (!window.confirm(`${className} 클래스를 삭제하시겠습니까? 학생과 일정도 함께 삭제됩니다.`)) {
      return;
    }

    await deleteClass(classId);
    setOpenMenuId(null);
  };

  return (
    <S.DashboardContainer>
      <S.HeaderTitleSection>
        <S.PageTitle>참여 중인 수업 목록</S.PageTitle>
        <S.PageDescription>초대받은 수업은 [게스트]로 표시됩니다.</S.PageDescription>
      </S.HeaderTitleSection>

      {isLoading ? <S.EmptyState>수업 정보를 불러오는 중입니다.</S.EmptyState> : null}
      {loadError ? <S.EmptyState>{loadError}</S.EmptyState> : null}
      {!isLoading && !loadError && classes.length === 0 ? (
        <S.EmptyState>아직 생성된 수업이 없습니다. 상단 + 버튼으로 수업을 생성해 주세요.</S.EmptyState>
      ) : null}

      <S.CardGrid>
        {classes.map((item) => {
          const cardBgColor = item.header_color;

          return (
            <S.ClassCard key={item.id}>
              <S.CardLink href={`/teacher/class/${item.id}`}>
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
                      <S.AlertLabel>다가오는 일정</S.AlertLabel>
                      <S.AlertText>{item.todo_alert}</S.AlertText>
                    </S.AlertBox>
                  )}
                </S.CardBody>
              </S.CardLink>

              <S.CardFooterToolbar>
                <S.MoreMenuButton
                  type="button"
                  title="추가 옵션"
                  onClick={() => setOpenMenuId((prev) => (prev === item.id ? null : item.id))}
                >
                  ⋮
                </S.MoreMenuButton>
                {openMenuId === item.id && (
                  <S.MoreMenu>
                    <S.DeleteMenuButton
                      type="button"
                      onClick={() => handleDeleteClass(item.id, item.class_name)}
                    >
                      클래스 삭제
                    </S.DeleteMenuButton>
                  </S.MoreMenu>
                )}
              </S.CardFooterToolbar>
            </S.ClassCard>
          );
        })}
      </S.CardGrid>
    </S.DashboardContainer>
  );
}
