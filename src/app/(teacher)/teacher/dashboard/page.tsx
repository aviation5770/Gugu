"use client";

import * as S from "./dashboard.styles";
import { formatRecordTime } from "../../_data/mockTeacher";
import { useTeacherClasses } from "../../_context/TeacherClassContext";

export default function TeacherDashboardPage() {
  const { classes, events, getRankings, getStudentsByClass } = useTeacherClasses();
  const totalStudents = classes.reduce(
    (sum, classItem) => sum + classItem.student_count,
    0,
  );
  const allRankings = getRankings();
  const averageAccuracy =
    allRankings.length > 0
      ? Math.round(
          allRankings.reduce((sum, student) => sum + student.accuracy, 0) /
            allRankings.length,
        )
      : 0;
  const fastestRecord = allRankings.reduce(
    (fastest, student) => Math.min(fastest, student.best_time),
    Number.POSITIVE_INFINITY,
  );

  return (
    <S.DashboardContainer>
      <S.PageHeader>
        <S.TitleGroup>
          <S.PageTitle>선생님 대시보드</S.PageTitle>
          <S.PageDescription>
            등록된 클래스의 학습 현황, 예정 일정, 랭킹 기록을 한눈에 확인합니다.
          </S.PageDescription>
        </S.TitleGroup>
        <S.PrimaryLink href="/teacher/class/new">+ 수업 생성</S.PrimaryLink>
      </S.PageHeader>

      <S.StatGrid>
        <S.StatCard>
          <S.StatLabel>운영 클래스</S.StatLabel>
          <S.StatValue>{classes.length}개</S.StatValue>
        </S.StatCard>
        <S.StatCard>
          <S.StatLabel>전체 학생</S.StatLabel>
          <S.StatValue>{totalStudents}명</S.StatValue>
        </S.StatCard>
        <S.StatCard>
          <S.StatLabel>평균 정답률</S.StatLabel>
          <S.StatValue>{averageAccuracy}%</S.StatValue>
        </S.StatCard>
        <S.StatCard>
          <S.StatLabel>최고 기록</S.StatLabel>
          <S.StatValue>{formatRecordTime(fastestRecord)}</S.StatValue>
        </S.StatCard>
      </S.StatGrid>

      <S.ContentGrid>
        <S.Panel>
          <S.PanelTitle>클래스별 학습 현황</S.PanelTitle>
          <S.ClassRows>
            {classes.map((classItem) => {
              const students = getStudentsByClass(classItem.id);
              const classAverage =
                students.length > 0
                  ? Math.round(
                      students.reduce((sum, student) => sum + student.accuracy, 0) /
                        students.length,
                    )
                  : 0;
              const classFastest = students.reduce(
                (fastest, student) => Math.min(fastest, student.best_time),
                Number.POSITIVE_INFINITY,
              );

              return (
                <S.ClassRow key={classItem.id} href={`/teacher/class/${classItem.id}`}>
                  <S.ClassName>{classItem.class_name}</S.ClassName>
                  <S.RowMetric>
                    학생 수
                    <strong>{classItem.student_count}명</strong>
                  </S.RowMetric>
                  <S.RowMetric>
                    정답률
                    <strong>{classAverage}%</strong>
                  </S.RowMetric>
                  <S.RowMetric>
                    최고 기록
                    <strong>{formatRecordTime(classFastest)}</strong>
                  </S.RowMetric>
                </S.ClassRow>
              );
            })}
          </S.ClassRows>
        </S.Panel>

        <S.Panel>
          <S.PanelTitle>다가오는 일정</S.PanelTitle>
          <S.EventList>
            {events.map((event) => (
              <S.EventItem key={event.id} href="/teacher/calendar" $color={event.color}>
                <S.EventTitle>{event.title}</S.EventTitle>
                <S.EventMeta>
                  {event.date} · {event.class_name}
                </S.EventMeta>
              </S.EventItem>
            ))}
          </S.EventList>
        </S.Panel>
      </S.ContentGrid>
    </S.DashboardContainer>
  );
}
