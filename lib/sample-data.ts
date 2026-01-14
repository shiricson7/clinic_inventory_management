export type InventoryItem = {
  id: string;
  name: string;
  category: string;
  stock: number;
  min: number;
  unit: string;
  location: string;
  supplier: string;
  lastUpdated: string;
  expiry: string;
  price: number;
};

export type StockMovement = {
  id: string;
  item: string;
  type: "입고" | "출고" | "폐기";
  quantity: number;
  user: string;
  time: string;
  note?: string;
};

export type AlertItem = {
  id: string;
  title: string;
  severity: "긴급" | "주의" | "정보";
  message: string;
  createdAt: string;
  resolved: boolean;
};

export const inventoryItems: InventoryItem[] = [
  {
    id: "vac-001",
    name: "인플루엔자 4가 백신",
    category: "백신",
    stock: 28,
    min: 30,
    unit: "dose",
    location: "냉장 1",
    supplier: "한미약품",
    lastUpdated: "2024-08-26",
    expiry: "2024-12-12",
    price: 22000
  },
  {
    id: "crm-021",
    name: "아토피 외용 크림 200ml",
    category: "외용제",
    stock: 54,
    min: 20,
    unit: "EA",
    location: "일반 창고",
    supplier: "유한양행",
    lastUpdated: "2024-08-25",
    expiry: "2025-03-01",
    price: 18000
  },
  {
    id: "sup-013",
    name: "멸균 거즈 4x4",
    category: "소모품",
    stock: 120,
    min: 100,
    unit: "pack",
    location: "일반 창고",
    supplier: "메디폼",
    lastUpdated: "2024-08-24",
    expiry: "2026-01-15",
    price: 2400
  },
  {
    id: "vac-019",
    name: "A형 간염 백신",
    category: "백신",
    stock: 12,
    min: 18,
    unit: "dose",
    location: "냉장 2",
    supplier: "GC녹십자",
    lastUpdated: "2024-08-27",
    expiry: "2024-10-10",
    price: 42000
  },
  {
    id: "sup-031",
    name: "니트릴 장갑 M",
    category: "소모품",
    stock: 36,
    min: 60,
    unit: "box",
    location: "진료실",
    supplier: "메디케어",
    lastUpdated: "2024-08-26",
    expiry: "2026-06-30",
    price: 8500
  },
  {
    id: "crm-044",
    name: "항생 연고 30g",
    category: "외용제",
    stock: 80,
    min: 40,
    unit: "EA",
    location: "약품 보관",
    supplier: "종근당",
    lastUpdated: "2024-08-25",
    expiry: "2025-01-20",
    price: 9500
  }
];

export const stockMovements: StockMovement[] = [
  {
    id: "mv-201",
    item: "인플루엔자 4가 백신",
    type: "출고",
    quantity: 2,
    user: "김원장",
    time: "오늘 09:12",
    note: "외래 접종"
  },
  {
    id: "mv-202",
    item: "니트릴 장갑 M",
    type: "출고",
    quantity: 1,
    user: "박간호",
    time: "오늘 10:01",
    note: "진료실 사용"
  },
  {
    id: "mv-203",
    item: "멸균 거즈 4x4",
    type: "입고",
    quantity: 20,
    user: "최직원",
    time: "어제 17:40",
    note: "정기 발주"
  },
  {
    id: "mv-204",
    item: "A형 간염 백신",
    type: "출고",
    quantity: 1,
    user: "김원장",
    time: "어제 14:22",
    note: "접종"
  }
];

export const alerts: AlertItem[] = [
  {
    id: "al-001",
    title: "재고 기준선 이하",
    severity: "긴급",
    message: "니트릴 장갑 M 재고가 기준선 60 이하로 내려갔어요.",
    createdAt: "오늘 09:40",
    resolved: false
  },
  {
    id: "al-002",
    title: "유효기간 임박",
    severity: "주의",
    message: "A형 간염 백신 유효기간이 13일 남았습니다.",
    createdAt: "어제 18:12",
    resolved: false
  },
  {
    id: "al-003",
    title: "재고 기준선 근접",
    severity: "정보",
    message: "인플루엔자 4가 백신이 기준선에 근접합니다.",
    createdAt: "어제 16:20",
    resolved: true
  }
];
