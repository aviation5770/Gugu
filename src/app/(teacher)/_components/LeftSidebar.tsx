"use client";

import { usePathname } from "next/navigation";
import * as S from "./LeftSidebar.styles";

interface LeftSidebarProps {
  isOpen: boolean;
  classes: Array<{ id: string; class_name: string }>;
}

export default function LeftSidebar({ isOpen, classes }: LeftSidebarProps) {
  const pathname = usePathname();

  return (
    <S.SidebarAside $isOpen={isOpen}>
      <S.SidebarContainer>
        <S.MenuNav>
          <S.MenuLink href="/teacher/home" $isActive={pathname === "/teacher/home"}>
            <span>🏠</span>
            <span>홈</span>
          </S.MenuLink>
          <S.MenuLink href="/teacher/dashboard" $isActive={pathname === "/teacher/dashboard"}>
            <span>🏆</span>
            <span>dashboard</span>
          </S.MenuLink>
          <S.MenuLink href="/teacher/calendar" $isActive={pathname === "/teacher/calendar"}>
            <span>📅</span>
            <span>Calendar</span>
          </S.MenuLink>
          <S.MenuLink href="/teacher/ranking" $isActive={pathname === "/teacher/ranking"}>
            <span>🏆</span>
            <span>전체 랭킹 보드</span>
          </S.MenuLink>
        </S.MenuNav>

        <S.CategorySection>
          <S.CategoryTitle>등록한 수업</S.CategoryTitle>
          <S.ClassListWrapper>
            {classes.map((item) => (
              <S.ClassShortcutLink key={item.id} href={`/teacher/class/${item.id}`}>
                📚 {item.class_name}
              </S.ClassShortcutLink>
            ))}
          </S.ClassListWrapper>
        </S.CategorySection>
      </S.SidebarContainer>
    </S.SidebarAside>
  );
}