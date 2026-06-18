"use client";

import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import * as S from "./class-detail.styles";
import { formatRecordTime } from "../../../_data/mockTeacher";
import { useTeacherClasses } from "../../../_context/TeacherClassContext";

export default function TeacherClassPage() {
  const params = useParams<{ classId: string }>();
  const router = useRouter();
  const [sortMode, setSortMode] = useState<"numberAsc" | "numberDesc" | "accuracy">(
    "numberAsc",
  );
  const [isStudentListExpanded, setIsStudentListExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const {
    classes,
    addStudent,
    deleteClass,
    getEventsByClass,
    getStudentsByClass,
    getRankings,
    resetClassRecords,
    updateClassName,
  } = useTeacherClasses();
  const classItem = classes.find((item) => item.id === params.classId);
  const students = useMemo(() => {
    const classStudents = getStudentsByClass(params.classId);

    return [...classStudents].sort((a, b) => {
      if (sortMode === "numberDesc") {
        return b.student_number - a.student_number;
      }

      if (sortMode === "accuracy") {
        if (b.accuracy !== a.accuracy) {
          return b.accuracy - a.accuracy;
        }

        return (a.best_time || Number.POSITIVE_INFINITY) - (b.best_time || Number.POSITIVE_INFINITY);
      }

      return a.student_number - b.student_number;
    });
  }, [getStudentsByClass, params.classId, sortMode]);
  const rankings = getRankings(params.classId);
  const displayedStudents = isStudentListExpanded ? students : students.slice(0, 5);

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

  const classEvents = getEventsByClass(classItem.id);
  const averageAccuracy =
    students.length > 0
      ? Math.round(
          students.reduce((sum, student) => sum + student.accuracy, 0) / students.length,
        )
      : 0;
  const fastestRecord = rankings[0]?.best_time ?? 0;

  const handleRenameClass = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const className = String(formData.get("className") ?? "").trim();

    if (!className) {
      window.alert("클래스 이름을 입력해 주세요.");
      return;
    }

    await updateClassName(classItem.id, className);
  };

  const handleCopyClassCode = async () => {
    if (!classItem?.class_code) return;

    try {
      await navigator.clipboard.writeText(classItem.class_code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.alert("복사에 실패했습니다. 수업 코드를 수동으로 복사해 주세요.");
    }
  };

  const handleAddStudent = async () => {
    const newStudent = await addStudent(classItem.id);

    if (newStudent) {
      router.push(`/teacher/class/${classItem.id}/student/${newStudent.id}`);
    }
  };

  const handleDeleteClass = async () => {
    if (!window.confirm(`${classItem.class_name} 클래스를 삭제하시겠습니까? 학생과 일정도 함께 삭제됩니다.`)) {
      return;
    }

    await deleteClass(classItem.id);
    router.push("/teacher/home");
  };

  return (
    <S.DetailContainer>
      <S.Banner $bgColor={classItem.header_color}>
        <S.BannerTitle>{classItem.class_name}</S.BannerTitle>
        <S.BannerDescription>{classItem.description}</S.BannerDescription>
        <S.CodeBadge
          type="button"
          onClick={handleCopyClassCode}
          title="수업 코드 복사"
        >
          {copied ? `${classItem.class_code} · 복사됨` : classItem.class_code}
        </S.CodeBadge>
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
              {classEvents.length === 0 ? (
                <S.NoticeItem>
                  <strong>등록된 클래스 일정이 없습니다</strong>
                  <p>캘린더에서 학급 일정을 추가하면 이 게시판에도 함께 표시됩니다.</p>
                </S.NoticeItem>
              ) : (
                classEvents.map((event) => (
                  <S.NoticeItem key={event.id}>
                    <strong>{event.title}</strong>
                    <p>{event.date}에 등록된 클래스 일정입니다. 캘린더에서 일정 추가와 삭제를 관리할 수 있습니다.</p>
                  </S.NoticeItem>
                ))
              )}
            </S.NoticeList>
          </S.Panel>

          <S.Panel>
            <S.StudentListHeader>
              <S.PanelTitle style={{ marginBottom: 0 }}>학생 목록 및 성취도</S.PanelTitle>
              <S.PanelActions>
                <S.UtilityButton type="button" onClick={handleAddStudent}>
                  학생 추가
                </S.UtilityButton>
                <S.FilterSelect
                  value={sortMode}
                  onChange={(event) =>
                    setSortMode(event.target.value as "numberAsc" | "numberDesc" | "accuracy")
                  }
                >
                  <option value="numberAsc">번호 오름차순</option>
                  <option value="numberDesc">번호 내림차순</option>
                  <option value="accuracy">정확도순</option>
                </S.FilterSelect>
                <S.DangerButton
                  type="button"
                  onClick={() => resetClassRecords(classItem.id)}
                >
                  반 전체 기록 초기화
                </S.DangerButton>
              </S.PanelActions>
            </S.StudentListHeader>
            <S.StudentRows>
              {displayedStudents.map((student) => (
                <S.StudentRow
                  key={student.id}
                  href={`/teacher/class/${classItem.id}/student/${student.id}`}
                >
                  <S.NumberBadge>{student.student_number}</S.NumberBadge>
                  <S.StudentName>{student.name}</S.StudentName>
                  <S.Metric>{student.accuracy}%</S.Metric>
                  <S.Metric>{formatRecordTime(student.best_time)}</S.Metric>
                </S.StudentRow>
              ))}
            </S.StudentRows>
            {students.length > 5 ? (
              <S.ListToggleButton
                type="button"
                onClick={() => setIsStudentListExpanded((prev) => !prev)}
              >
                {isStudentListExpanded ? "리스트 접기" : `더보기 (${students.length - 5}명)`}
              </S.ListToggleButton>
            ) : null}
          </S.Panel>
        </div>

        <S.Panel>
          <S.PanelTitle>클래스 설정</S.PanelTitle>
          <S.SettingsForm onSubmit={handleRenameClass}>
            <S.Label>
              클래스 이름
              <S.TextInput name="className" defaultValue={classItem.class_name} />
            </S.Label>
            <S.UtilityButton type="submit">클래스 이름 저장</S.UtilityButton>
          </S.SettingsForm>
          <S.MetaList>
            <div>
              <dt>생성일</dt>
              <dd>{classItem.created_at}</dd>
            </div>
            <div>
              <dt>학생 수</dt>
              <dd>{classItem.student_count}명</dd>
            </div>
            <div>
              <dt>수업 코드</dt>
              <dd>{classItem.class_code}</dd>
            </div>
          </S.MetaList>
          <S.QuickLinks>
            <S.QuickLink href="/teacher/calendar">
              일정 관리
              <span>›</span>
            </S.QuickLink>
            <S.QuickLink href={`/teacher/class/${classItem.id}/ranking`}>
              반 랭킹 보기
              <span>›</span>
            </S.QuickLink>
            <S.QuickLink href="/teacher/dashboard">
              대시보드로 이동
              <span>›</span>
            </S.QuickLink>
          </S.QuickLinks>
          <S.SettingsDivider />
          <S.DangerButton type="button" onClick={handleDeleteClass}>
            클래스 삭제
          </S.DangerButton>
        </S.Panel>
      </S.MainGrid>
    </S.DetailContainer>
  );
}
