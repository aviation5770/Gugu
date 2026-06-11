"use client";

import React, { useState, useEffect } from "react";
import TopNavbar from "./_components/TopNavbar";
import LeftSidebar from "./_components/LeftSidebar";
import * as S from "./layout.styles";
import {
  TeacherClassProvider,
  useTeacherClasses,
} from "./_context/TeacherClassContext";

function TeacherLayoutShell({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { classes } = useTeacherClasses();
  
  const teacherName = "어떻게 사람 이름이 정정자"; 
  const teacherEmail = "teacher@gugu.kr";

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
        teacherEmail={teacherEmail}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <S.MainContainer>
        <LeftSidebar isOpen={isSidebarOpen} classes={classes} />

        <S.ContentArea>
          {children}
        </S.ContentArea>
      </S.MainContainer>
    </S.LayoutWrapper>
  );
}

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TeacherClassProvider>
      <TeacherLayoutShell>{children}</TeacherLayoutShell>
    </TeacherClassProvider>
  );
}
