import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Observability PLG",
  description: "Grafana, Loki, Prometheus, Promtail 기반 기본 관측성 아키텍처",
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  // 레이아웃은 전체 앱에 공통 스타일과 메타데이터를 적용하는 최소 셸 역할만 맡긴다.
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
