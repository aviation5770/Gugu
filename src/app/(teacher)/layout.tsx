"use client";

import React, { useState, useEffect } from "react";
import TopNavbar from "./_components/TopNavbar";
import LeftSidebar from "./_components/LeftSidebar";
import * as S from "./layout.styles";

const MOCK_SIDEBAR_CLASSES = [
  { id: "class-1", class_name: "3학년 3반" },
  { id: "class-2", class_name: "5학년 1반" },
];

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
        <LeftSidebar isOpen={isSidebarOpen} classes={MOCK_SIDEBAR_CLASSES} />

        <S.ContentArea>
          {children}
        </S.ContentArea>
      </S.MainContainer>
    </S.LayoutWrapper>
  );
}