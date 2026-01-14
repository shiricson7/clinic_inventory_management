"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { navigation } from "@/lib/navigation";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border/70 bg-surface/90 backdrop-blur lg:hidden print-hidden">
      <nav className="mx-auto flex max-w-lg items-center justify-between px-4 py-2">
        {navigation.map((item) => {
          const isActive =
            item.href === "/" ? pathname === item.href : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-1 flex-col items-center gap-1 rounded-xl py-2 text-xs"
            >
              <span
                className={cn(
                  "grid h-9 w-9 place-items-center rounded-full",
                  isActive ? "bg-accent text-white" : "bg-soft text-muted"
                )}
              >
                <Icon className="h-4 w-4" />
              </span>
              <span className={cn("font-medium", isActive ? "text-ink" : "text-muted")}>{
                item.name
              }</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
