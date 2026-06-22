"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import * as S from "../student.styles";

const NAV_ITEMS = [
  { href: "/student/play", label: "연습", icon: "✦" },
  { href: "/student/exam", label: "시험", icon: "●" },
  { href: "/student/ranking", label: "랭킹", icon: "▲" },
  { href: "/student", label: "내 정보", icon: "■" },
];

export default function StudentAppChrome() {
  const pathname = usePathname();

  return (
    <>
      <S.StudentTopBar>
        <S.StudentLogoMark href="/student/play" aria-label="구구 홈">
          <Image
            src="/images/gugu.svg"
            alt="구구"
            fill
            sizes="72px"
            style={{ objectFit: "contain" }}
            priority
          />
        </S.StudentLogoMark>
      </S.StudentTopBar>

      <S.StudentBottomNav aria-label="학생 메뉴">
        {NAV_ITEMS.map((item) => (
          <S.StudentBottomNavLink
            key={item.href}
            href={item.href}
            $active={pathname === item.href}
          >
            <span>{item.icon}</span>
            {item.label}
          </S.StudentBottomNavLink>
        ))}
      </S.StudentBottomNav>
    </>
  );
}
