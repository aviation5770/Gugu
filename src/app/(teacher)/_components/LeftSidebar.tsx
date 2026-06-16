"use client";

import { usePathname } from "next/navigation";
import * as S from "./LeftSidebar.styles";
import { useI18n } from "@/i18n/LocaleProvider";

interface LeftSidebarProps {
  isOpen: boolean;
  onClose?: () => void;
  classes: Array<{ id: string; class_name: string }>;
}

export default function LeftSidebar({ isOpen, onClose, classes }: LeftSidebarProps) {
  const pathname = usePathname();
  const { t } = useI18n();

  return (
    <>
      <S.SidebarOverlay $isOpen={isOpen} onClick={onClose} />
      <S.SidebarAside $isOpen={isOpen}>
        <S.SidebarContainer>
          <S.MenuNav>
            <S.MenuLink href="/teacher/home" $isActive={pathname === "/teacher/home"}>
              <span>🏠</span>
              <span>{t("common.home")}</span>
            </S.MenuLink>
            <S.MenuLink href="/teacher/dashboard" $isActive={pathname === "/teacher/dashboard"}>
              <span>📊</span>
              <span>{t("common.dashboard")}</span>
            </S.MenuLink>
            <S.MenuLink href="/teacher/calendar" $isActive={pathname === "/teacher/calendar"}>
              <span>📅</span>
              <span>{t("common.calendar")}</span>
            </S.MenuLink>
            <S.MenuLink href="/teacher/ranking" $isActive={pathname === "/teacher/ranking"}>
              <span>🏆</span>
              <span>{t("common.ranking")}</span>
            </S.MenuLink>
          </S.MenuNav>

          <S.CategorySection>
            <S.CategoryTitle>{t("common.classes")}</S.CategoryTitle>
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
    </>
  );
}
