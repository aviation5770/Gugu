"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import * as S from "./student-detail.styles";
import { formatRecordTime } from "../../../../../_data/mockTeacher";
import { useTeacherClasses } from "../../../../../_context/TeacherClassContext";

function getBirthdayPasswordPreview(birthDate: string) {
  const monthDayMatch = birthDate.match(/(?:^|\D)(\d{1,2})\D+(\d{1,2})(?:\D|$)/);

  if (monthDayMatch) {
    return `${monthDayMatch[1].padStart(2, "0")}${monthDayMatch[2].padStart(2, "0")}`;
  }

  const digits = birthDate.replace(/\D/g, "");

  if (digits.length >= 4) {
    return digits.slice(-4);
  }

  if (digits.length === 3) {
    return `0${digits}`;
  }

  return digits;
}

export default function StudentDetailPage() {
  const params = useParams<{ classId: string; studentId: string }>();
  const router = useRouter();
  const {
    classes,
    students,
    updateStudent,
    resetStudentRecord,
    deleteStudent,
  } = useTeacherClasses();
  const classItem = classes.find((item) => item.id === params.classId);
  const student = students.find(
    (item) => item.id === params.studentId && item.class_id === params.classId,
  );
  const [name, setName] = useState(student?.name ?? "");
  const [birthDate, setBirthDate] = useState(student?.birth_date ?? "");
  const [memo, setMemo] = useState(student?.memo ?? "");

  if (!classItem || !student) {
    return (
      <S.StudentDetailContainer>
        <S.NotFoundPanel>
          <S.Title>학생 정보를 찾을 수 없습니다</S.Title>
          <S.Description>클래스 학생 목록에서 다시 선택해 주세요.</S.Description>
          <S.BackLink href={`/teacher/class/${params.classId}`}>클래스로 돌아가기</S.BackLink>
        </S.NotFoundPanel>
      </S.StudentDetailContainer>
    );
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateStudent(student.id, {
      name: name.trim() || `${student.student_number}번 학생`,
      birth_date: birthDate.trim(),
      memo: memo.trim(),
    });
  };

  const handleResetRecord = () => {
    resetStudentRecord(student.id);
  };

  const handleDeleteStudent = () => {
    if (!window.confirm(`${student.name} 학생을 클래스에서 삭제하시겠습니까?`)) {
      return;
    }

    deleteStudent(student.id);
    router.push(`/teacher/class/${classItem.id}`);
  };

  return (
    <S.StudentDetailContainer>
      <S.Panel>
        <S.ProfileHeader>
          <S.StudentAvatar>{student.student_number}</S.StudentAvatar>
          <S.TitleGroup>
            <S.Title>{student.name}</S.Title>
            <S.Description>
              {classItem.class_name} · {student.student_number}번 학생
            </S.Description>
          </S.TitleGroup>
        </S.ProfileHeader>

        <S.Form onSubmit={handleSubmit}>
          <S.FormGrid>
            <S.Label>
              이름
              <S.Input value={name} onChange={(event) => setName(event.target.value)} />
            </S.Label>
            <S.Label>
              생일
              <S.Input
                value={birthDate}
                onChange={(event) => setBirthDate(event.target.value)}
                placeholder="예: 7월 27일 또는 0727"
              />
              <S.HelperText>
                자동 로그인 비밀번호: {getBirthdayPasswordPreview(birthDate) || "생일 입력 시 생성"}
              </S.HelperText>
            </S.Label>
          </S.FormGrid>
          <S.Label>
            메모
            <S.TextArea
              value={memo}
              onChange={(event) => setMemo(event.target.value)}
              placeholder="학생별 특이사항이나 지도 메모를 입력하세요."
            />
          </S.Label>
          <S.PrimaryButton type="submit">학생 정보 저장</S.PrimaryButton>
        </S.Form>

        <S.BackLink href={`/teacher/class/${classItem.id}`}>클래스로 돌아가기</S.BackLink>
      </S.Panel>

      <S.Panel>
        <S.Title>학생 기록</S.Title>
        <S.Description>개별 기록 확인과 관리 작업을 진행합니다.</S.Description>
        <S.StatGrid style={{ marginTop: 18 }}>
          <S.StatCard>
            <span>정답률</span>
            <strong>{student.accuracy}%</strong>
          </S.StatCard>
          <S.StatCard>
            <span>최고 기록</span>
            <strong>{formatRecordTime(student.best_time)}</strong>
          </S.StatCard>
          <S.StatCard>
            <span>풀이 문항</span>
            <strong>{student.solved_count}문항</strong>
          </S.StatCard>
        </S.StatGrid>

        <S.ActionList>
          <S.SecondaryButton type="button" onClick={handleResetRecord}>
            개인 기록 삭제
          </S.SecondaryButton>
          <S.DangerButton type="button" onClick={handleDeleteStudent}>
            클래스에서 삭제
          </S.DangerButton>
        </S.ActionList>
      </S.Panel>
    </S.StudentDetailContainer>
  );
}
