import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kim Sehan — AI Engineer",
  description: "김세한의 AI 연구·개발 포트폴리오",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
