"use client";

import { useParams } from "next/navigation";
import * as S from "../../../ranking/ranking.styles";
import { formatRecordTime } from "../../../../_data/mockTeacher";
import { useTeacherClasses } from "../../../../_context/TeacherClassContext";

export default function ClassRankingPage() {
  const params = useParams<{ classId: string }>();
  const { classes, getRankings } = useTeacherClasses();
  const classItem = classes.find((item) => item.id === params.classId);
  const rankings = getRankings(params.classId);

  return (
    <S.RankingContainer>
      <S.PageHeader>
        <S.Title>{classItem ? `${classItem.class_name} 반 랭킹` : "반 랭킹"}</S.Title>
        <S.Description>
          이 클래스 학생들의 정답률과 최고 기록을 기준으로 순위를 보여줍니다.
        </S.Description>
      </S.PageHeader>

      <S.RankingBoard>
        <S.BoardHeader>
          <span>순위</span>
          <span>학생</span>
          <span>클래스</span>
          <span>정답률</span>
          <span>최고 기록</span>
        </S.BoardHeader>

        {rankings.map((student, index) => (
          <S.RankingRow
            key={student.id}
            href={`/teacher/class/${student.class_id}/student/${student.id}`}
          >
            <S.RankBadge $rank={index + 1}>{index + 1}</S.RankBadge>
            <S.StudentInfo>
              <strong>
                {student.student_number}번 {student.name}
              </strong>
              <span>{student.solved_count}문항 풀이</span>
              <S.MobileMeta>
                {student.class_name} · 정답률 {student.accuracy}% ·{" "}
                {formatRecordTime(student.best_time)}
              </S.MobileMeta>
            </S.StudentInfo>
            <S.CellText>{student.class_name}</S.CellText>
            <S.CellText>{student.accuracy}%</S.CellText>
            <S.CellText>{formatRecordTime(student.best_time)}</S.CellText>
          </S.RankingRow>
        ))}
      </S.RankingBoard>
    </S.RankingContainer>
  );
}
