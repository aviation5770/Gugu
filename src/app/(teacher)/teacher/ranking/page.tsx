"use client";

import * as S from "./ranking.styles";
import { formatRecordTime, getClassRankings } from "../../_data/mockTeacher";

export default function TeacherRankingPage() {
  const rankings = getClassRankings();

  return (
    <S.RankingContainer>
      <S.PageHeader>
        <S.Title>전체 랭킹 보드</S.Title>
        <S.Description>
          모든 클래스의 정답률과 최고 풀이 시간을 합산해 빠른 기록 순으로 보여줍니다.
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
          <S.RankingRow key={student.id} href={`/teacher/class/${student.class_id}`}>
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
