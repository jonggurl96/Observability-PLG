import type { NextConfig } from "next";

// standalone 출력을 활성화해 Docker 런타임 이미지를 단순하게 유지한다.
const nextConfig: NextConfig = {
  output: "standalone",
};

export default nextConfig;
