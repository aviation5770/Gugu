'use client';

import Image from 'next/image';
import * as S from './AuthBackground.style';

export default function AuthBackground() {
  return (
    <S.Container>
      <S.BgYellowEllipseTopLeft>
        <Image src="/background/YellowEllipse.svg" alt="" fill aria-hidden="true" />
      </S.BgYellowEllipseTopLeft>
      <S.BgYellowEllipseBottomRight>
        <Image src="/background/YellowEllipse.svg" alt="" fill aria-hidden="true" />
      </S.BgYellowEllipseBottomRight>

      <S.BgPinkEllipseTopLeft>
        <Image src="/background/PinkEllipse.svg" alt="" fill aria-hidden="true" />
      </S.BgPinkEllipseTopLeft>
      <S.BgPinkEllipseBottomRight>
        <Image src="/background/PinkEllipse.svg" alt="" fill aria-hidden="true" />
      </S.BgPinkEllipseBottomRight>

      <S.BgGreenCircleTopRight>
        <Image src="/background/GreenCircle.svg" alt="" fill aria-hidden="true" />
      </S.BgGreenCircleTopRight>
      <S.BgGreenCircleBottomLeft>
        <Image src="/background/GreenCircle.svg" alt="" fill aria-hidden="true" />
      </S.BgGreenCircleBottomLeft>

      <S.BgRedCircleTopRight>
        <Image src="/background/RedCircle.svg" alt="" fill aria-hidden="true" />
      </S.BgRedCircleTopRight>
      <S.BgRedCircleBottomLeft>
        <Image src="/background/RedCircle.svg" alt="" fill aria-hidden="true" />
      </S.BgRedCircleBottomLeft>

      <S.BgTriangleTopRight>
        <Image src="/background/Triangle.svg" alt="" fill aria-hidden="true" />
      </S.BgTriangleTopRight>
      <S.BgTriangleBottomLeft>
        <Image src="/background/Triangle.svg" alt="" fill aria-hidden="true" />
      </S.BgTriangleBottomLeft>
    </S.Container>
  );
}