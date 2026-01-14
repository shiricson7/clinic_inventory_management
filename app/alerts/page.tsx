import { Bell, CheckCircle2, Clock } from "lucide-react";

import { PageHeader } from "@/components/layout/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { alerts } from "@/lib/sample-data";

export default function AlertsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="알림 센터"
        title="기준선 경고와 유효기간 알림"
        description="DB 트리거에서 생성된 알림 이벤트를 확인하고 처리 상태를 남길 수 있습니다."
        actions={
          <Button variant="outline" size="sm">
            <Bell className="h-4 w-4" />
            알림 설정
          </Button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <Card className="border border-border/70 bg-surface/80 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-muted">실시간 이벤트</p>
              <h3 className="text-lg font-semibold">알림 피드</h3>
            </div>
            <Button size="sm">모두 확인</Button>
          </div>
          <div className="mt-6 space-y-4">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className="flex flex-wrap items-start justify-between gap-3 rounded-2xl border border-border/70 bg-soft/40 px-4 py-3"
              >
                <div className="space-y-1">
                  <p className="text-sm font-semibold">{alert.title}</p>
                  <p className="text-xs text-muted">{alert.message}</p>
                  <p className="text-xs text-muted">{alert.createdAt}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      alert.severity === "긴급"
                        ? "danger"
                        : alert.severity === "주의"
                          ? "warn"
                          : "outline"
                    }
                  >
                    {alert.severity}
                  </Badge>
                  {alert.resolved ? (
                    <Badge variant="accent">처리 완료</Badge>
                  ) : (
                    <Badge variant="outline">미처리</Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="border border-border/70 bg-surface/80 p-6">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-accent/10 text-accent">
              <Clock className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs font-semibold text-muted">자동 리마인드</p>
              <h3 className="text-lg font-semibold">정기 점검 설정</h3>
            </div>
          </div>
          <div className="mt-6 space-y-4 text-sm text-muted">
            <p>
              매일 오전 9시에 재고 기준선을 점검하는 리마인드를 발송합니다. 알림 채널은
              카카오워크/슬랙, 푸시, 이메일을 동시에 선택할 수 있습니다.
            </p>
            <div className="rounded-2xl border border-border/70 bg-soft/40 p-4">
              <p className="text-xs font-semibold text-muted">현재 활성화된 채널</p>
              <div className="mt-3 space-y-2">
                {[
                  "카카오워크 웹훅 · #inventory-alerts",
                  "직원 모바일 푸시",
                  "관리자 이메일"
                ].map((channel) => (
                  <div key={channel} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-accent" />
                    {channel}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
