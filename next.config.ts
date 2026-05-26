import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,

  // 깨짐 방지를 위해 styled-components 컴파일러 설정 추가
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
