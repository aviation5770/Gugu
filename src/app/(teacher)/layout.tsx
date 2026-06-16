"use client";

import React, { useState, useEffect } from "react";
import TopNavbar from "./_components/TopNavbar";
import LeftSidebar from "./_components/LeftSidebar";
import * as S from "./layout.styles";
import {
  TeacherClassProvider,
  useTeacherClasses,
} from "./_context/TeacherClassContext";
import { getTeacherSessionAction } from "@/app/actions/auth";

function TeacherLayoutShell({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [teacherProfile, setTeacherProfile] = useState({
    name: "선생님",
    email: "",
    profileImageUrl: null as string | null,
  });
  const { classes } = useTeacherClasses();

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

  useEffect(() => {
    let isMounted = true;

    async function loadTeacherProfile() {
      const result = await getTeacherSessionAction();

      if (!isMounted || !result.success || !result.data) {
        return;
      }

      setTeacherProfile({
        name: result.data.name || "선생님",
        email: result.data.email ?? "",
        profileImageUrl: result.data.profileImageUrl ?? null,
      });
    }

    loadTeacherProfile();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <S.LayoutWrapper>
      <TopNavbar
        teacherName={teacherProfile.name}
        teacherEmail={teacherProfile.email}
        teacherProfileImageUrl={teacherProfile.profileImageUrl}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        onProfileChange={(profile) =>
          setTeacherProfile({
            name: profile.name,
            email: profile.email,
            profileImageUrl: profile.profileImageUrl ?? null,
          })
        }
      />

      <S.MainContainer>
        <LeftSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          classes={classes}
        />

        <S.ContentArea $isSidebarOpen={isSidebarOpen}>
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
