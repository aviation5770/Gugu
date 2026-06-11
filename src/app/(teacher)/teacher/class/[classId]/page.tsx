"use client";

import { useParams } from "next/navigation";
import * as S from "./class-detail.styles";
import {
  formatRecordTime,
  getClassRankings,
  getStudentsByClass,
  MOCK_EVENTS,
} from "../../../_data/mockTeacher";
import { useTeacherClasses } from "../../../_context/TeacherClassContext";

export default function TeacherClassPage() {
  const params = useParams<{ classId: string }>();
  const { classes } = useTeacherClasses();
  const classItem = classes.find((item) => item.id === params.classId);

  if (!classItem) {
    return (
      <S.DetailContainer>
        <S.NotFoundPanel>
          <S.PanelTitle>클래스를 찾을 수 없습니다</S.PanelTitle>
          <S.BannerDescription style={{ color: "#6b7280", margin: "8px auto 0" }}>
            사이드바의 등록한 수업 목록에서 다시 선택해 주세요.
          </S.BannerDescription>
        </S.NotFoundPanel>
      </S.DetailContainer>
    );
  }

  const storedStudents = getStudentsByClass(classItem.id);
  const students =
    storedStudents.length > 0
      ? storedStudents
      : Array.from({ length: classItem.student_count }, (_, index) => ({
          id: `${classItem.id}-student-${index + 1}`,
          class_id: classItem.id,
          student_number: index + 1,
          name: `${index + 1}번 학생`,
          birth_date: "",
          accuracy: 0,
          best_time: 0,
          solved_count: 0,
        }));
  const rankings = getClassRankings(classItem.id);
  const classEvents = MOCK_EVENTS.filter((event) => event.class_id === classItem.id);
  const averageAccuracy =
    students.length > 0
      ? Math.round(
          students.reduce((sum, student) => sum + student.accuracy, 0) / students.length,
        )
      : 0;
  const fastestRecord = rankings[0]?.best_time ?? 0;

  return (
    <S.DetailContainer>
      <S.Banner $bgColor={classItem.header_color}>
        <S.BannerTitle>{classItem.class_name}</S.BannerTitle>
        <S.BannerDescription>{classItem.description}</S.BannerDescription>
        <S.CodeBadge>{classItem.class_code}</S.CodeBadge>
      </S.Banner>

      <S.TabGrid>
        <S.TabCard>
          <S.TabLabel>학생 수</S.TabLabel>
          <S.TabValue>{classItem.student_count}명</S.TabValue>
        </S.TabCard>
        <S.TabCard>
          <S.TabLabel>평균 정답률</S.TabLabel>
          <S.TabValue>{averageAccuracy}%</S.TabValue>
        </S.TabCard>
        <S.TabCard>
          <S.TabLabel>최고 기록</S.TabLabel>
          <S.TabValue>{formatRecordTime(fastestRecord)}</S.TabValue>
        </S.TabCard>
        <S.TabCard>
          <S.TabLabel>수업 코드</S.TabLabel>
          <S.TabValue>{classItem.class_code}</S.TabValue>
        </S.TabCard>
      </S.TabGrid>

      <S.MainGrid>
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <S.Panel>
            <S.PanelTitle>게시판</S.PanelTitle>
            <S.NoticeList>
              <S.NoticeItem>
                <strong>{classItem.todo_alert}</strong>
                <p>학생들은 시험 전까지 오답 노트를 정리하고 타임어택 기록을 한 번 이상 제출합니다.</p>
              </S.NoticeItem>
              {classEvents.map((event) => (
                <S.NoticeItem key={event.id}>
                  <strong>{event.title}</strong>
                  <p>{event.date}에 등록된 클래스 일정입니다. 캘린더에서 일정 추가와 삭제를 관리할 수 있습니다.</p>
                </S.NoticeItem>
              ))}
            </S.NoticeList>
          </S.Panel>

          <S.Panel>
            <S.PanelTitle>학생 목록 및 성취도</S.PanelTitle>
            <S.StudentRows>
              {students.map((student) => (
                <S.StudentRow key={student.id}>
                  <S.NumberBadge>{student.student_number}</S.NumberBadge>
                  <S.StudentName>{student.name}</S.StudentName>
                  <S.Metric>{student.accuracy}%</S.Metric>
                  <S.Metric>{formatRecordTime(student.best_time)}</S.Metric>
                </S.StudentRow>
              ))}
            </S.StudentRows>
          </S.Panel>
        </div>

        <S.Panel>
          <S.PanelTitle>클래스 설정</S.PanelTitle>
          <S.QuickLinks>
            <S.QuickLink href="/teacher/calendar">
              일정 관리
              <span>›</span>
            </S.QuickLink>
            <S.QuickLink href="/teacher/ranking">
              전체 랭킹 보기
              <span>›</span>
            </S.QuickLink>
            <S.QuickLink href="/teacher/dashboard">
              대시보드로 이동
              <span>›</span>
            </S.QuickLink>
          </S.QuickLinks>
        </S.Panel>
      </S.MainGrid>
    </S.DetailContainer>
  );
}
