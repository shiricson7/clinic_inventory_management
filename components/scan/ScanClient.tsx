"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowDownCircle, ArrowUpCircle, ScanLine } from "lucide-react";

import { inventoryItems } from "@/lib/sample-data";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type ScanMode = "입고" | "출고";

type ScanLog = {
  id: string;
  itemName: string;
  mode: ScanMode;
  quantity: number;
  time: string;
};

export function ScanClient() {
  const [mode, setMode] = useState<ScanMode>("출고");
  const [value, setValue] = useState("");
  const [logs, setLogs] = useState<ScanLog[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!value.trim()) {
      return;
    }

    const normalized = value.replace("clinic-item:", "").trim();
    const item = inventoryItems.find((entry) => entry.id === normalized);

    const timestamp = new Date();
    setLogs((prev) => [
      {
        id: `${normalized}-${timestamp.getTime()}`,
        itemName: item?.name ?? "알 수 없는 품목",
        mode,
        quantity: 1,
        time: timestamp.toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" })
      },
      ...prev
    ]);
    setValue("");
    inputRef.current?.focus();
  };

  const lastHint = useMemo(
    () => (mode === "입고" ? "입고로 기록됩니다" : "출고로 기록됩니다"),
    [mode]
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
      <Card className="p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold text-muted">스캔 모드</p>
            <h3 className="text-lg font-semibold">바코드 스캐너를 연결해 주세요</h3>
          </div>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant={mode === "입고" ? "default" : "outline"}
              size="sm"
              onClick={() => setMode("입고")}
            >
              <ArrowUpCircle className="h-4 w-4" />
              입고
            </Button>
            <Button
              type="button"
              variant={mode === "출고" ? "default" : "outline"}
              size="sm"
              onClick={() => setMode("출고")}
            >
              <ArrowDownCircle className="h-4 w-4" />
              출고
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-3">
          <div>
            <label className="text-xs font-semibold text-muted">스캔 입력</label>
            <Input
              ref={inputRef}
              value={value}
              onChange={(event) => setValue(event.target.value)}
              placeholder="QR/바코드 스캔값이 자동으로 입력됩니다"
              className="mt-2"
            />
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-muted">
            <span>{lastHint}</span>
            <span>Enter 키가 자동 입력됩니다.</span>
          </div>
        </form>

        <div className="mt-6 rounded-2xl border border-dashed border-border/70 bg-soft/30 p-4 text-sm text-muted">
          <p className="font-semibold text-ink">모바일 카메라 스캔 안내</p>
          <p className="mt-2">
            창고에서 휴대폰으로 QR을 스캔하려면 카메라 권한을 허용한 뒤 스캔 모드를
            활성화하세요. (zxing-js / html5-qrcode 연동 영역)
          </p>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-accent/15 text-accent">
            <ScanLine className="h-5 w-5" />
          </span>
          <div>
            <p className="text-xs font-semibold text-muted">최근 스캔 로그</p>
            <h3 className="text-lg font-semibold">자동 기록 내역</h3>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          {logs.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border/70 p-6 text-center text-sm text-muted">
              아직 스캔된 항목이 없습니다.
            </div>
          ) : (
            logs.slice(0, 6).map((log) => (
              <div
                key={log.id}
                className={cn(
                  "flex items-center justify-between rounded-2xl border border-border/70 px-4 py-3",
                  log.mode === "입고" ? "bg-accent/10" : "bg-soft/60"
                )}
              >
                <div>
                  <p className="text-sm font-semibold">{log.itemName}</p>
                  <p className="text-xs text-muted">{log.time}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">
                    {log.mode} {log.quantity} EA
                  </p>
                  <p className="text-xs text-muted">자동 반영 대기</p>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
}
