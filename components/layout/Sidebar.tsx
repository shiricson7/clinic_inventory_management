"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building2 } from "lucide-react";

import { navigation } from "@/lib/navigation";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-72 flex-col border-r border-border/60 bg-surface/70 px-6 py-8 lg:flex print-hidden">
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-2xl bg-accent text-white shadow-soft">
          <Building2 className="h-5 w-5" />
        </span>
        <div>
          <p className="text-xs font-semibold text-muted">병원 재고관리</p>
          <p className="text-base font-semibold">Clinic Inventory</p>
        </div>
      </div>

      <nav className="mt-10 flex flex-1 flex-col gap-2">
        {navigation.map((item) => {
          const isActive =
            item.href === "/" ? pathname === item.href : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group rounded-2xl border border-transparent px-4 py-3 transition",
                isActive
                  ? "border-accent/30 bg-accent/10 text-ink"
                  : "hover:border-border/80 hover:bg-soft/70"
              )}
            >
              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    "grid h-9 w-9 place-items-center rounded-xl",
                    isActive ? "bg-accent text-white" : "bg-soft text-muted"
                  )}
                >
                  <Icon className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-semibold">{item.name}</p>
                  <p className="text-xs text-muted">{item.description}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="rounded-2xl border border-border/70 bg-soft/60 p-4">
        <p className="text-xs font-semibold text-muted">로그인 사용자</p>
        <p className="text-sm font-semibold">김원장 · 관리자</p>
        <p className="text-xs text-muted">서울 닥터 클리닉</p>
      </div>
    </aside>
  );
}
