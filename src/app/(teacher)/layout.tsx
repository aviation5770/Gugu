"use client";

import React, { useState, useEffect } from "react";
import TopNavbar from "./_components/TopNavbar";
import LeftSidebar from "./_components/LeftSidebar";
import * as S from "./layout.styles";
import { MOCK_TEACHER_CLASSES } from "./_data/mockTeacher";

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  const teacherName = "어떻게 사람 이름이 정정자"; 

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    
    window.addEventListener("resize", handleResize);
    handleResize();
    
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <S.LayoutWrapper>
      <TopNavbar
        teacherName={teacherName}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <S.MainContainer>
        <LeftSidebar isOpen={isSidebarOpen} classes={MOCK_TEACHER_CLASSES} />

        <S.ContentArea>
          {children}
        </S.ContentArea>
      </S.MainContainer>
    </S.LayoutWrapper>
  );
}
