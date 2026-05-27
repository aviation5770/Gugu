"use client";

import React, { useState } from "react";
import * as S from "./calendar.styles";

const CLASS_THEME_COLORS = ["#EF466E", "#FFD165", "#9145D4", "#FA4541", "#60C43E"];

const MOCK_CLASSES = [
  { id: "class-1", class_name: "3학년 3반", color: CLASS_THEME_COLORS[0] },
  { id: "class-2", class_name: "5학년 2반", color: CLASS_THEME_COLORS[1] },
];

const INITIAL_EVENTS = [
  {
    id: "evt-1",
    class_id: "class-1",
    class_name: "3학년 3반",
    title: "3단 시험",
    date: "2026-05-28",
    color: CLASS_THEME_COLORS[2],
  },
  {
    id: "evt-2",
    class_id: "class-2",
    class_name: "5학년 2반",
    title: "11단 ~ 41단 50문제 시험",
    date: "2026-05-15",
    color: CLASS_THEME_COLORS[0],
  },
];

export default function TeacherCalendarPage() {
  const [currentYear] = useState(2026);
  const [currentMonth] = useState(5);
  const [selectedDate, setSelectedDate] = useState("2026-05-28");

  const [events, setEvents] = useState(INITIAL_EVENTS);

  const [inputTitle, setInputTitle] = useState("");
  const [selectedClassId, setSelectedClassId] = useState(MOCK_CLASSES[0].id);

  const totalDays = 31;
  const startDayOfWeek = 4;

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputTitle.trim()) return alert("일정 제목을 입력해주세요.");

    const targetClass = MOCK_CLASSES.find((c) => c.id === selectedClassId);
    if (!targetClass) return;

    const newEvent = {
      id: `evt-${Date.now()}`,
      class_id: targetClass.id,
      class_name: targetClass.class_name,
      title: inputTitle,
      date: selectedDate,
      color: targetClass.color,
    };

    setEvents([...events, newEvent]);
    setInputTitle("");
  };

  const handleDeleteEvent = (id: string) => {
    if (confirm("이 일정을 삭제하시겠습니까?")) {
      setEvents(events.filter((evt) => evt.id !== id));
    }
  };

  const activeEvents = events.filter((evt) => evt.date === selectedDate);

  return (
    <S.CalendarContainer>
      <S.PageHeader>
        <S.Title>학사 및 시험 캘린더</S.Title>
        <S.Description>각 클래스별 시험 일정을 조회하고 직접 지정할 수 있습니다.</S.Description>
      </S.PageHeader>

      <S.MainContentGrid>
        <S.CalendarCard>
          <S.CalendarHeader>
            <S.MonthTitle>{currentYear}년 {currentMonth}월</S.MonthTitle>
            <div>
              <S.NavButton style={{ marginRight: "4px" }}>이전</S.NavButton>
              <S.NavButton>다음</S.NavButton>
            </div>
          </S.CalendarHeader>

          <S.WeekDaysGrid>
            <span>일</span><span>월</span><span>화</span><span>수</span><span>목</span><span>금</span><span>토</span>
          </S.WeekDaysGrid>

          <S.DaysGrid>
            {Array.from({ length: startDayOfWeek }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}

            {Array.from({ length: totalDays }).map((_, i) => {
              const dayNum = i + 1;
              const dateString = `${currentYear}-0${currentMonth}-${dayNum < 10 ? `0${dayNum}` : dayNum}`;
              
              const dayEvents = events.filter((evt) => evt.date === dateString);
              const isSelected = selectedDate === dateString;
              const isToday = dateString === "2026-05-27";

              return (
                <S.DayCell
                  key={dateString}
                  $isSelected={isSelected}
                  $isToday={isToday}
                  onClick={() => setSelectedDate(dateString)}
                >
                  <S.DayNumber $isToday={isToday}>{dayNum}</S.DayNumber>
                  
                  <S.CellEventList>
                    {dayEvents.slice(0, 2).map((evt) => (
                      <S.MiniEventDot key={evt.id} $color={evt.color}>
                        {evt.title}
                      </S.MiniEventDot>
                    ))}
                    {dayEvents.length > 2 && (
                      <span style={{ fontSize: "9px", color: "#9ca3af", paddingLeft: "4px" }}>
                        +{dayEvents.length - 2}개 더
                      </span>
                    )}
                  </S.CellEventList>
                </S.DayCell>
              );
            })}
          </S.DaysGrid>
        </S.CalendarCard>

        <S.SidePanel>
          <S.FormCard>
            <S.FormTitle>📅 {selectedDate} 일정 추가</S.FormTitle>
            
            <form onSubmit={handleCreateEvent} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <S.FormGroup>
                <S.Label>대상 클래스 선택</S.Label>
                <S.Select
                  value={selectedClassId}
                  onChange={(e) => setSelectedClassId(e.target.value)}
                >
                  {MOCK_CLASSES.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.class_name}
                    </option>
                  ))}
                </S.Select>
              </S.FormGroup>

              <S.FormGroup>
                <S.Label>시험 및 일정 제목</S.Label>
                <S.Input
                  type="text"
                  placeholder="예: 2단원 형성평가 시행"
                  value={inputTitle}
                  onChange={(e) => setInputTitle(e.target.value)}
                />
              </S.FormGroup>

              <S.SubmitButton type="submit">일정 등록하기</S.SubmitButton>
            </form>
          </S.FormCard>

          {/* 2. 일정 조회 및 삭제 목록 */}
          <S.EventListCard>
            <S.FormTitle>🔍 {selectedDate} 등록된 시험 목록</S.FormTitle>
            <S.EventList>
              {activeEvents.length === 0 ? (
                <S.NoDataText>이 날짜에 지정된 시험 일정이 없습니다.</S.NoDataText>
              ) : (
                activeEvents.map((evt) => (
                  <S.EventItem key={evt.id} $color={evt.color}>
                    <S.EventInfo>
                      <S.EventTitleText>{evt.title}</S.EventTitleText>
                      <S.EventClassTag>{evt.class_name}</S.EventClassTag>
                    </S.EventInfo>
                    <S.DeleteButton 
                      onClick={() => handleDeleteEvent(evt.id)}
                      title="일정 삭제"
                    >
                      🗑️
                    </S.DeleteButton>
                  </S.EventItem>
                ))
              )}
            </S.EventList>
          </S.EventListCard>
        </S.SidePanel>
      </S.MainContentGrid>
    </S.CalendarContainer>
  );
}