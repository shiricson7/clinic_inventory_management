import { PageHeader } from "@/components/layout/PageHeader";
import { LabelSheet } from "@/components/labels/LabelSheet";

export default function LabelsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="QR 라벨"
        title="출력용 라벨을 생성하세요"
        description="선택한 품목을 QR 코드로 변환하고 출력 레이아웃을 미리보기 할 수 있습니다."
      />
      <LabelSheet />
    </div>
  );
}
