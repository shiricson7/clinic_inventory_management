insert into items (
  id,
  name,
  category,
  unit,
  requires_expiry,
  par_level,
  barcode_value,
  current_quantity,
  location,
  supplier,
  price,
  updated_at
) values
  (
    'vac-001',
    '인플루엔자 4가 백신',
    '백신',
    'dose',
    true,
    30,
    'vac-001',
    28,
    '냉장 1',
    '한미약품',
    22000,
    '2024-08-26'
  ),
  (
    'crm-021',
    '아토피 외용 크림 200ml',
    '외용제',
    'EA',
    true,
    20,
    'crm-021',
    54,
    '일반 창고',
    '유한양행',
    18000,
    '2024-08-25'
  ),
  (
    'sup-013',
    '멸균 거즈 4x4',
    '소모품',
    'pack',
    true,
    100,
    'sup-013',
    120,
    '일반 창고',
    '메디폼',
    2400,
    '2024-08-24'
  ),
  (
    'vac-019',
    'A형 간염 백신',
    '백신',
    'dose',
    true,
    18,
    'vac-019',
    12,
    '냉장 2',
    'GC녹십자',
    42000,
    '2024-08-27'
  ),
  (
    'sup-031',
    '니트릴 장갑 M',
    '소모품',
    'box',
    true,
    60,
    'sup-031',
    36,
    '진료실',
    '메디케어',
    8500,
    '2024-08-26'
  ),
  (
    'crm-044',
    '항생 연고 30g',
    '외용제',
    'EA',
    true,
    40,
    'crm-044',
    80,
    '약품 보관',
    '종근당',
    9500,
    '2024-08-25'
  )
on conflict (id) do update set
  name = excluded.name,
  category = excluded.category,
  unit = excluded.unit,
  requires_expiry = excluded.requires_expiry,
  par_level = excluded.par_level,
  barcode_value = excluded.barcode_value,
  current_quantity = excluded.current_quantity,
  location = excluded.location,
  supplier = excluded.supplier,
  price = excluded.price,
  updated_at = excluded.updated_at;

insert into item_lots (
  id,
  item_id,
  lot_number,
  expiry_date,
  quantity
) values
  (
    'lot-vac-001-1',
    'vac-001',
    'LOT-VAC-001',
    '2024-12-12',
    28
  ),
  (
    'lot-crm-021-1',
    'crm-021',
    'LOT-CRM-021',
    '2025-03-01',
    54
  ),
  (
    'lot-sup-013-1',
    'sup-013',
    'LOT-SUP-013',
    '2026-01-15',
    120
  ),
  (
    'lot-vac-019-1',
    'vac-019',
    'LOT-VAC-019',
    '2024-10-10',
    12
  ),
  (
    'lot-sup-031-1',
    'sup-031',
    'LOT-SUP-031',
    '2026-06-30',
    36
  ),
  (
    'lot-crm-044-1',
    'crm-044',
    'LOT-CRM-044',
    '2025-01-20',
    80
  )
on conflict (id) do update set
  item_id = excluded.item_id,
  lot_number = excluded.lot_number,
  expiry_date = excluded.expiry_date,
  quantity = excluded.quantity;

insert into inventory_ledger (
  id,
  item_id,
  lot_id,
  movement_type,
  quantity,
  actor_name,
  occurred_at,
  note
) values
  (
    'mv-201',
    'vac-001',
    'lot-vac-001-1',
    'outbound',
    2,
    '김원장',
    '2024-08-27 09:12:00+09',
    '외래 접종'
  ),
  (
    'mv-202',
    'sup-031',
    'lot-sup-031-1',
    'outbound',
    1,
    '박간호',
    '2024-08-27 10:01:00+09',
    '진료실 사용'
  ),
  (
    'mv-203',
    'sup-013',
    'lot-sup-013-1',
    'inbound',
    20,
    '최직원',
    '2024-08-26 17:40:00+09',
    '정기 발주'
  ),
  (
    'mv-204',
    'vac-019',
    'lot-vac-019-1',
    'outbound',
    1,
    '김원장',
    '2024-08-26 14:22:00+09',
    '접종'
  )
on conflict (id) do update set
  item_id = excluded.item_id,
  lot_id = excluded.lot_id,
  movement_type = excluded.movement_type,
  quantity = excluded.quantity,
  actor_name = excluded.actor_name,
  occurred_at = excluded.occurred_at,
  note = excluded.note;

insert into alerts (
  id,
  title,
  severity,
  message,
  created_at,
  resolved,
  item_id
) values
  (
    'al-001',
    '재고 기준선 이하',
    'urgent',
    '니트릴 장갑 M 재고가 기준선 60 이하로 내려갔어요.',
    '2024-08-27 09:40:00+09',
    false,
    'sup-031'
  ),
  (
    'al-002',
    '유효기간 임박',
    'warning',
    'A형 간염 백신 유효기간이 13일 남았습니다.',
    '2024-08-26 18:12:00+09',
    false,
    'vac-019'
  ),
  (
    'al-003',
    '재고 기준선 근접',
    'info',
    '인플루엔자 4가 백신이 기준선에 근접합니다.',
    '2024-08-26 16:20:00+09',
    true,
    'vac-001'
  )
on conflict (id) do update set
  title = excluded.title,
  severity = excluded.severity,
  message = excluded.message,
  created_at = excluded.created_at,
  resolved = excluded.resolved,
  item_id = excluded.item_id;
