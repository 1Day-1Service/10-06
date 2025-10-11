import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "두더지 잡기 🔨",
  description: "클래식 아케이드 게임을 웹으로! 빠른 반응속도와 집중력을 테스트하세요.",
  verification: {
    google: "4fH6k9IRd0AGqHAYAvpCe_EN_NwmRCpFso5olHqs_MA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body className="font-pretendard antialiased">
        {children}
      </body>
    </html>
  );
}
