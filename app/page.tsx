import Link from "next/link";
import {
  ArrowUpRight,
  Boxes,
  CalendarClock,
  ClipboardList,
  QrCode,
  ScanLine,
  ShieldAlert
} from "lucide-react";

import { PageHeader } from "@/components/layout/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { alerts, inventoryItems, stockMovements } from "@/lib/sample-data";
import { formatDate, formatNumber, isWithinDays } from "@/lib/format";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
  const lowStockItems = inventoryItems.filter((item) => item.stock <= item.min);
  const expiringSoon = inventoryItems.filter((item) => isWithinDays(item.expiry, 30));
  const totalStockValue = inventoryItems.reduce(
    (acc, item) => acc + item.price * item.stock,
    0
  );

  return (
    <div className="space-y-10">
      <PageHeader
        eyebrow="운영 대시보드"
        title="오늘의 재고 흐름을 한 눈에"
        description="입출고 기록, 기준선 경고, 라벨 출력 현황을 빠르게 파악하세요."
        actions={
          <>
            <Link
              href="/scan"
              className={buttonVariants({ variant: "default", size: "sm" })}
            >
              <ScanLine className="h-4 w-4" />
              스캔 시작
            </Link>
            <Link
              href="/labels"
              className={buttonVariants({ variant: "outline", size: "sm" })}
            >
              <QrCode className="h-4 w-4" />
              라벨 출력
            </Link>
          </>
        }
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          {
            title: "기준선 이하",
            value: `${lowStockItems.length}건`,
            description: "즉시 발주가 필요한 품목",
            icon: ShieldAlert
          },
          {
            title: "유효기간 30일 이내",
            value: `${expiringSoon.length}건`,
            description: "폐기/소진 우선 관리",
            icon: CalendarClock
          },
          {
            title: "전체 품목",
            value: `${inventoryItems.length}개`,
            description: "재고 단위 기준",
            icon: Boxes
          },
          {
            title: "총 재고 가치",
            value: `${formatNumber(totalStockValue)}원`,
            description: "판매용 외용제 포함",
            icon: ClipboardList
          }
        ].map((card, index) => {
          const Icon = card.icon;
          return (
            <Card
              key={card.title}
              className={cn(
                "border border-border/70 bg-surface/80 p-6 animate-fade-up",
                index === 0 && "animate-delay-1",
                index === 1 && "animate-delay-2",
                index === 2 && "animate-delay-3"
              )}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold text-muted">{card.title}</p>
                  <p className="mt-2 text-2xl font-semibold">{card.value}</p>
                  <p className="mt-2 text-sm text-muted">{card.description}</p>
                </div>
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-accent/10 text-accent">
                  <Icon className="h-5 w-5" />
                </span>
              </div>
            </Card>
          );
        })}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.3fr_1fr]">
        <Card className="border border-border/70 bg-surface/80">
          <CardHeader>
            <CardTitle>주의 품목</CardTitle>
            <CardDescription>기준선 이하 또는 유효기간 임박 품목</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[...lowStockItems, ...expiringSoon]
                .slice(0, 5)
                .map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border/70 bg-soft/40 px-4 py-3"
                  >
                    <div>
                      <p className="text-sm font-semibold">{item.name}</p>
                      <p className="text-xs text-muted">
                        {item.location} · {item.category}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <Badge variant={item.stock <= item.min ? "danger" : "warn"}>
                        재고 {item.stock} {item.unit}
                      </Badge>
                      <Badge variant="outline">{formatDate(item.expiry)}까지</Badge>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="border border-border/70 bg-surface/80">
            <CardHeader>
              <CardTitle>최근 입출고</CardTitle>
              <CardDescription>현장 스캔 기록</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {stockMovements.map((movement) => (
                <div
                  key={movement.id}
                  className="flex items-center justify-between rounded-2xl border border-border/70 bg-soft/50 px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-semibold">{movement.item}</p>
                    <p className="text-xs text-muted">{movement.time}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">
                      {movement.type} {movement.quantity}
                    </p>
                    <p className="text-xs text-muted">{movement.user}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border border-border/70 bg-surface/80">
            <CardHeader>
              <CardTitle>알림 피드</CardTitle>
              <CardDescription>자동 경고 메시지</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className="flex items-start justify-between gap-3 rounded-2xl border border-border/70 bg-soft/50 px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-semibold">{alert.title}</p>
                    <p className="text-xs text-muted">{alert.message}</p>
                  </div>
                  <Badge variant={alert.severity === "긴급" ? "danger" : "warn"}>
                    {alert.severity}
                  </Badge>
                </div>
              ))}
              <Button variant="outline" className="w-full" size="sm">
                알림 센터 열기
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
