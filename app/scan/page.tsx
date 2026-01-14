import { PageHeader } from "@/components/layout/PageHeader";
import { ScanClient } from "@/components/scan/ScanClient";

export default function ScanPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="스캔 자동화"
        title="바코드/QR 스캔으로 입출고 기록"
        description="USB 스캐너는 키보드 입력처럼 동작합니다. 입력창에 포커스를 유지하면 자동 기록됩니다."
      />
      <ScanClient />
    </div>
  );
}
