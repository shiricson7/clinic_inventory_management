import type { Metadata } from "next";
import type { ReactNode } from "react";

import "./globals.css";
import { MobileNav } from "@/components/layout/MobileNav";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopBar } from "@/components/layout/TopBar";

export const metadata: Metadata = {
  title: "병원 재고관리",
  description: "병원 소모품, 백신, 판매용 외용제를 통합 관리하는 클라우드 재고 시스템"
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-bg text-ink">
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex min-h-screen flex-1 flex-col">
            <TopBar />
            <main className="flex-1 px-6 pb-24 pt-8 lg:px-10">{children}</main>
          </div>
        </div>
        <MobileNav />
      </body>
    </html>
  );
}
