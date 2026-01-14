import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ClipboardList, PackagePlus, RotateCcw } from "lucide-react";

import { PageHeader } from "@/components/layout/PageHeader";
import { QrPreview } from "@/components/labels/QrPreview";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { inventoryItems } from "@/lib/sample-data";
import { formatDate, formatNumber } from "@/lib/format";

export default function InventoryDetailPage({
  params
}: {
  params: { id: string };
}) {
  const item = inventoryItems.find((entry) => entry.id === params.id);

  if (!item) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <Link href="/inventory" className="inline-flex items-center gap-2 text-sm text-muted">
        <ArrowLeft className="h-4 w-4" />
        재고 목록으로
      </Link>

      <PageHeader
        eyebrow="품목 상세"
        title={item.name}
        description={`${item.category} · ${item.location}`}
        actions={
          <>
            <Button variant="outline" size="sm">
              <PackagePlus className="h-4 w-4" />
              입고 기록
            </Button>
            <Button size="sm">
              <RotateCcw className="h-4 w-4" />
              출고 기록
            </Button>
          </>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        <Card className="border border-border/70 bg-surface/80 p-6">
          <h3 className="text-lg font-semibold">재고 요약</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-border/70 bg-soft/50 p-4">
              <p className="text-xs font-semibold text-muted">현재 재고</p>
              <p className="mt-2 text-2xl font-semibold">
                {item.stock} {item.unit}
              </p>
              <p className="text-xs text-muted">기준선 {item.min}</p>
            </div>
            <div className="rounded-2xl border border-border/70 bg-soft/50 p-4">
              <p className="text-xs font-semibold text-muted">재고 가치</p>
              <p className="mt-2 text-2xl font-semibold">
                {formatNumber(item.price * item.stock)}원
              </p>
              <p className="text-xs text-muted">단가 {formatNumber(item.price)}원</p>
            </div>
            <div className="rounded-2xl border border-border/70 bg-soft/50 p-4">
              <p className="text-xs font-semibold text-muted">유효기간</p>
              <p className="mt-2 text-2xl font-semibold">{formatDate(item.expiry)}</p>
              <p className="text-xs text-muted">최근 업데이트 {formatDate(item.lastUpdated)}</p>
            </div>
            <div className="rounded-2xl border border-border/70 bg-soft/50 p-4">
              <p className="text-xs font-semibold text-muted">상태</p>
              <div className="mt-3 flex items-center gap-2">
                <Badge variant={item.stock <= item.min ? "danger" : "accent"}>
                  {item.stock <= item.min ? "발주 필요" : "안정"}
                </Badge>
                <Badge variant="outline">{item.supplier}</Badge>
              </div>
            </div>
          </div>
        </Card>

        <Card className="border border-border/70 bg-surface/80 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-muted">QR 라벨</p>
              <h3 className="text-lg font-semibold">스캔 자동화용 코드</h3>
            </div>
            <Button variant="outline" size="sm">
              <ClipboardList className="h-4 w-4" />
              라벨 인쇄
            </Button>
          </div>
          <div className="mt-6 flex flex-col items-center gap-4">
            <QrPreview value={`clinic-item:${item.id}`} label={item.name} />
            <div className="rounded-2xl border border-border/70 bg-soft/50 px-4 py-3 text-center text-xs text-muted">
              QR 코드에는 품목 ID가 포함됩니다. 스캔 시 자동 입출고 폼을 띄울 수 있어요.
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
