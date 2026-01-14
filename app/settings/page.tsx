import { BellRing, Database, ShieldCheck } from "lucide-react";

import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="설정"
        title="기준선과 알림 채널 관리"
        description="병원 운영 기준에 맞춰 재고 기준선과 알림 정책을 조정하세요."
        actions={<Button size="sm">변경 저장</Button>}
      />

      <div className="grid gap-6 xl:grid-cols-2">
        <Card className="border border-border/70 bg-surface/80 p-6">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-accent/10 text-accent">
              <Database className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs font-semibold text-muted">기준선 기본값</p>
              <h3 className="text-lg font-semibold">카테고리별 자동 기준</h3>
            </div>
          </div>
          <div className="mt-6 space-y-4">
            {["백신", "소모품", "외용제"].map((label) => (
              <div key={label} className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold">{label}</p>
                  <p className="text-xs text-muted">기본 기준선 수량</p>
                </div>
                <Input className="w-24 text-right" defaultValue="30" />
              </div>
            ))}
          </div>
        </Card>

        <Card className="border border-border/70 bg-surface/80 p-6">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-accent/10 text-accent">
              <BellRing className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs font-semibold text-muted">알림 채널</p>
              <h3 className="text-lg font-semibold">업무 채널과 푸시 연동</h3>
            </div>
          </div>
          <div className="mt-6 space-y-4 text-sm text-muted">
            <div className="rounded-2xl border border-border/70 bg-soft/50 p-4">
              <p className="text-xs font-semibold text-muted">카카오워크 웹훅</p>
              <Input className="mt-2" defaultValue="https://kakao.work/webhook/..." />
            </div>
            <div className="rounded-2xl border border-border/70 bg-soft/50 p-4">
              <p className="text-xs font-semibold text-muted">슬랙 웹훅</p>
              <Input className="mt-2" defaultValue="https://hooks.slack.com/..." />
            </div>
          </div>
        </Card>

        <Card className="border border-border/70 bg-surface/80 p-6 xl:col-span-2">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-accent/10 text-accent">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs font-semibold text-muted">권한 및 감사 로그</p>
              <h3 className="text-lg font-semibold">원장/직원 권한 관리</h3>
            </div>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {["원장", "간호팀", "운영팀"].map((role) => (
              <div key={role} className="rounded-2xl border border-border/70 bg-soft/50 p-4">
                <p className="text-sm font-semibold">{role}</p>
                <p className="mt-2 text-xs text-muted">
                  재고 추가/삭제, 입출고 승인, 알림 설정
                </p>
                <Button variant="outline" size="sm" className="mt-4 w-full">
                  권한 수정
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
