create table if not exists items (
  id text primary key,
  name text not null,
  category text not null,
  unit text not null,
  requires_expiry boolean not null default false,
  par_level integer not null check (par_level >= 0),
  barcode_value text not null unique,
  current_quantity integer not null check (current_quantity >= 0) default 0,
  location text not null,
  supplier text not null,
  price integer not null check (price >= 0) default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists item_lots (
  id text primary key,
  item_id text not null references items (id) on delete restrict,
  lot_number text not null,
  expiry_date date not null,
  quantity integer not null check (quantity >= 0),
  received_at date,
  created_at timestamptz not null default now(),
  unique (item_id, lot_number)
);

create table if not exists inventory_ledger (
  id text primary key,
  item_id text not null references items (id) on delete restrict,
  lot_id text references item_lots (id) on delete restrict,
  movement_type text not null check (movement_type in ('inbound', 'outbound', 'discard')),
  quantity integer not null check (quantity > 0),
  occurred_at timestamptz not null default now(),
  actor_name text not null,
  note text,
  created_at timestamptz not null default now()
);

create table if not exists alerts (
  id text primary key,
  title text not null,
  severity text not null check (severity in ('urgent', 'warning', 'info')),
  message text not null,
  created_at timestamptz not null default now(),
  resolved boolean not null default false,
  item_id text references items (id) on delete set null
);

create index if not exists items_category_idx on items (category);
create index if not exists items_barcode_value_idx on items (barcode_value);
create index if not exists item_lots_item_idx on item_lots (item_id);
create index if not exists item_lots_expiry_idx on item_lots (expiry_date);
create index if not exists inventory_ledger_item_idx on inventory_ledger (item_id);
create index if not exists inventory_ledger_lot_idx on inventory_ledger (lot_id);
create index if not exists inventory_ledger_occurred_at_idx on inventory_ledger (occurred_at);
create index if not exists alerts_resolved_idx on alerts (resolved);

alter table items enable row level security;
alter table item_lots enable row level security;
alter table inventory_ledger enable row level security;
alter table alerts enable row level security;

drop policy if exists "items_read" on items;
create policy "items_read"
  on items
  for select
  using (auth.uid() is not null);

drop policy if exists "items_insert" on items;
create policy "items_insert"
  on items
  for insert
  with check (auth.uid() is not null);

drop policy if exists "items_update" on items;
create policy "items_update"
  on items
  for update
  using (auth.uid() is not null)
  with check (auth.uid() is not null);

drop policy if exists "items_delete" on items;
create policy "items_delete"
  on items
  for delete
  using (auth.uid() is not null);

drop policy if exists "item_lots_read" on item_lots;
create policy "item_lots_read"
  on item_lots
  for select
  using (auth.uid() is not null);

drop policy if exists "item_lots_insert" on item_lots;
create policy "item_lots_insert"
  on item_lots
  for insert
  with check (auth.uid() is not null);

drop policy if exists "item_lots_update" on item_lots;
create policy "item_lots_update"
  on item_lots
  for update
  using (auth.uid() is not null)
  with check (auth.uid() is not null);

drop policy if exists "item_lots_delete" on item_lots;
create policy "item_lots_delete"
  on item_lots
  for delete
  using (auth.uid() is not null);

drop policy if exists "inventory_ledger_read" on inventory_ledger;
create policy "inventory_ledger_read"
  on inventory_ledger
  for select
  using (auth.uid() is not null);

drop policy if exists "inventory_ledger_insert" on inventory_ledger;
create policy "inventory_ledger_insert"
  on inventory_ledger
  for insert
  with check (auth.uid() is not null);

drop policy if exists "inventory_ledger_update" on inventory_ledger;
create policy "inventory_ledger_update"
  on inventory_ledger
  for update
  using (auth.uid() is not null)
  with check (auth.uid() is not null);

drop policy if exists "inventory_ledger_delete" on inventory_ledger;
create policy "inventory_ledger_delete"
  on inventory_ledger
  for delete
  using (auth.uid() is not null);

drop policy if exists "alerts_read" on alerts;
create policy "alerts_read"
  on alerts
  for select
  using (auth.uid() is not null);

drop policy if exists "alerts_insert" on alerts;
create policy "alerts_insert"
  on alerts
  for insert
  with check (auth.uid() is not null);

drop policy if exists "alerts_update" on alerts;
create policy "alerts_update"
  on alerts
  for update
  using (auth.uid() is not null)
  with check (auth.uid() is not null);

drop policy if exists "alerts_delete" on alerts;
create policy "alerts_delete"
  on alerts
  for delete
  using (auth.uid() is not null);
