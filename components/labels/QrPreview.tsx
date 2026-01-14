"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";

import { cn } from "@/lib/utils";

type QrPreviewProps = {
  value: string;
  label?: string;
  size?: number;
  className?: string;
};

export function QrPreview({ value, label, size = 120, className }: QrPreviewProps) {
  const [dataUrl, setDataUrl] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    QRCode.toDataURL(value, { width: size, margin: 1 })
      .then((url: string) => {
        if (isMounted) {
          setDataUrl(url);
        }
      })
      .catch(() => {
        if (isMounted) {
          setDataUrl(null);
        }
      });
    return () => {
      isMounted = false;
    };
  }, [value, size]);

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <div className="grid h-32 w-32 place-items-center rounded-2xl border border-border bg-soft/60">
        {dataUrl ? (
          <img src={dataUrl} alt={`${label ?? "QR"} 코드`} className="h-28 w-28" />
        ) : (
          <span className="text-xs text-muted">QR 생성 중</span>
        )}
      </div>
      {label ? <p className="text-xs font-medium text-muted">{label}</p> : null}
    </div>
  );
}
