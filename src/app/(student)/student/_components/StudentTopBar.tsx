"use client";

import Image from "next/image";
import * as S from "../student.styles";

export default function StudentTopBar() {
  return (
    <S.StudentTopBar>
      <S.StudentLogoMark href="/student/practice" aria-label="구구 홈">
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
  );
}
