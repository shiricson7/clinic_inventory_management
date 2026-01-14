import {
  Archive,
  Bell,
  LayoutDashboard,
  QrCode,
  ScanLine,
  Settings
} from "lucide-react";

export const navigation = [
  {
    name: "대시보드",
    href: "/",
    icon: LayoutDashboard,
    description: "재고 상태 요약"
  },
  {
    name: "재고",
    href: "/inventory",
    icon: Archive,
    description: "전체 품목 관리"
  },
  {
    name: "스캔",
    href: "/scan",
    icon: ScanLine,
    description: "입출고 자동 기록"
  },
  {
    name: "라벨",
    href: "/labels",
    icon: QrCode,
    description: "QR 라벨 생성"
  },
  {
    name: "알림",
    href: "/alerts",
    icon: Bell,
    description: "기준선 경고"
  },
  {
    name: "설정",
    href: "/settings",
    icon: Settings,
    description: "기준선 및 채널"
  }
];
