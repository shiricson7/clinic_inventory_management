import Link from "next/link";
import { Bell, Search, Sparkles } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function TopBar() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 bg-surface/60 px-6 py-5 backdrop-blur print-hidden">
      <div>
        <p className="text-xs font-semibold text-muted">오늘의 재고 운영</p>
        <h1 className="text-2xl font-semibold">병원 재고관리</h1>
      </div>
      <div className="flex w-full max-w-xl flex-1 items-center gap-3 sm:w-auto">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <Input
            placeholder="품목명, QR 코드, 로케이션 검색"
            className="pl-9"
          />
        </div>
        <Button variant="secondary" size="sm">
          <Sparkles className="h-4 w-4" />
          빠른 스캔
        </Button>
        <Button variant="outline" size="sm">
          <Bell className="h-4 w-4" />
          알림
        </Button>
        <Link
          href="/login"
          className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
        >
          로그인
        </Link>
      </div>
    </div>
  );
}
