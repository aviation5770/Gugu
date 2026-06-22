"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import * as S from "../student.styles";

const NAV_ITEMS = [
  { href: "/student/play", label: "연습", icon: "✦" },
  { href: "/student/play?variant=exam", label: "시험", icon: "●" },
  { href: "/student/ranking", label: "랭킹", icon: "▲" },
  { href: "/student", label: "내 정보", icon: "■" },
];

export default function StudentBottomNav() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <S.StudentBottomNav aria-label="학생 메뉴">
      {NAV_ITEMS.map((item) => {
        const [base, query] = item.href.split("?");
        const params = new URLSearchParams(query ?? "");
        let active = pathname === base;

        if (query) {
          for (const [k, v] of params.entries()) {
            if (searchParams.get(k) !== v) {
              active = false;
            }
          }
        }

        return (
          <S.StudentBottomNavLink key={item.href} href={item.href} $active={active}>
            <span>{item.icon}</span>
            {item.label}
          </S.StudentBottomNavLink>
        );
      })}
    </S.StudentBottomNav>
  );
}
