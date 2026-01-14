"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, Printer } from "lucide-react";

import { inventoryItems } from "@/lib/sample-data";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { QrPreview } from "@/components/labels/QrPreview";

export function LabelSheet() {
  const [selectedIds, setSelectedIds] = useState<string[]>(
    inventoryItems.slice(0, 3).map((item) => item.id)
  );

  const selectedItems = useMemo(
    () => inventoryItems.filter((item) => selectedIds.includes(item.id)),
    [selectedIds]
  );

  const toggleItem = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selectedIds.length === inventoryItems.length) {
      setSelectedIds([]);
      return;
    }
    setSelectedIds(inventoryItems.map((item) => item.id));
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
      <Card className="p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold text-muted">QR 라벨 목록</p>
            <h3 className="text-lg font-semibold">출력할 품목을 선택하세요</h3>
          </div>
          <Button variant="secondary" size="sm" onClick={toggleAll}>
            <CheckCircle2 className="h-4 w-4" />
            {selectedIds.length === inventoryItems.length ? "전체 해제" : "전체 선택"}
          </Button>
        </div>

        <div className="mt-4 space-y-3">
          {inventoryItems.map((item) => {
            const isSelected = selectedIds.includes(item.id);
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => toggleItem(item.id)}
                className={cn(
                  "flex w-full items-center justify-between rounded-2xl border border-border/70 px-4 py-3 text-left transition",
                  isSelected ? "bg-accent/10 border-accent/30" : "hover:bg-soft/60"
                )}
              >
                <div>
                  <p className="text-sm font-semibold">{item.name}</p>
                  <p className="text-xs text-muted">
                    {item.location} · {item.category}
                  </p>
                </div>
                <Badge variant={item.stock <= item.min ? "danger" : "accent"}>
                  {item.stock} {item.unit}
                </Badge>
              </button>
            );
          })}
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold text-muted">라벨 미리보기</p>
            <h3 className="text-lg font-semibold">선택한 {selectedItems.length}건</h3>
          </div>
          <Button onClick={() => window.print()} size="sm">
            <Printer className="h-4 w-4" />
            라벨 출력
          </Button>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {selectedItems.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-border bg-soft/40 p-3 text-center"
            >
              <QrPreview value={`clinic-item:${item.id}`} label={item.name} />
              <p className="mt-2 text-xs text-muted">{item.location}</p>
            </div>
          ))}
          {selectedItems.length === 0 ? (
            <div className="col-span-full rounded-2xl border border-dashed border-border/70 p-6 text-center text-sm text-muted">
              출력할 품목을 선택하면 QR 라벨이 생성됩니다.
            </div>
          ) : null}
        </div>
      </Card>
    </div>
  );
}
