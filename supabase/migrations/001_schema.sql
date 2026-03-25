-- ============================================================
-- NyayaDesk Schema — run this in Supabase SQL Editor
-- ============================================================

-- ENUMS
create type user_role as enum ('ADMIN','LAWYER','EXTERNAL_LAWYER','STAFF','CLIENT','WARIS');
create type case_status as enum ('ACTIVE','PENDING','CLOSED','APPEALED');
create type pesi_type as enum ('Dainik Pesi Suchi','Saptahik Pesi Suchi','Purak Pesi Suchi');

-- PROFILES (extends Supabase auth.users)
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null,
  role user_role not null default 'STAFF',
  email text not null,
  phone text,
  avatar text not null default 'XX',
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

alter table profiles enable row level security;
create policy "Public read" on profiles for select using (true);
create policy "Own update" on profiles for update using (auth.uid() = id);

-- MASTER DATA
create table master_data (
  id bigint generated always as identity primary key,
  category text not null,
  value text not null,
  sort_order int not null default 0,
  unique (category, value)
);

alter table master_data enable row level security;
create policy "Public read" on master_data for select using (true);
create policy "Admin insert" on master_data for insert with check (
  exists (select 1 from profiles where id = auth.uid() and role = 'ADMIN')
);
create policy "Admin update" on master_data for update using (
  exists (select 1 from profiles where id = auth.uid() and role = 'ADMIN')
);
create policy "Admin delete" on master_data for delete using (
  exists (select 1 from profiles where id = auth.uid() and role = 'ADMIN')
);

-- CASES
create table cases (
  id bigint generated always as identity primary key,
  case_number text not null unique,
  title text not null,
  case_type text not null,
  court text not null,
  client_id uuid references profiles(id),
  lawyer_id uuid references profiles(id),
  status case_status not null default 'PENDING',
  date_bs text,
  date_ad date,
  description text,
  created_at timestamptz not null default now()
);

alter table cases enable row level security;
create policy "Authenticated read" on cases for select using (auth.uid() is not null);
create policy "Admin/Staff insert" on cases for insert with check (
  exists (select 1 from profiles where id = auth.uid() and role in ('ADMIN','STAFF'))
);
create policy "Admin/Lawyer update" on cases for update using (
  exists (select 1 from profiles where id = auth.uid() and role in ('ADMIN','LAWYER'))
);

-- PESI
create table pesi (
  id bigint generated always as identity primary key,
  case_id bigint not null references cases(id) on delete cascade,
  pesi_type pesi_type not null,
  judge text,
  court text,
  date_bs text,
  time text,
  tarek_type text,
  notes text,
  created_at timestamptz not null default now()
);

alter table pesi enable row level security;
create policy "Authenticated read" on pesi for select using (auth.uid() is not null);
create policy "Lawyer insert" on pesi for insert with check (
  exists (select 1 from profiles where id = auth.uid() and role in ('ADMIN','LAWYER','EXTERNAL_LAWYER'))
);

-- DECISIONS
create table decisions (
  id bigint generated always as identity primary key,
  case_id bigint not null references cases(id) on delete cascade,
  type text not null,
  date_bs text,
  summary text,
  uploaded_by uuid references profiles(id),
  created_at timestamptz not null default now()
);

alter table decisions enable row level security;
create policy "Authenticated read" on decisions for select using (auth.uid() is not null);
create policy "Lawyer insert" on decisions for insert with check (
  exists (select 1 from profiles where id = auth.uid() and role in ('ADMIN','LAWYER','EXTERNAL_LAWYER'))
);

-- MEETINGS
create table meetings (
  id bigint generated always as identity primary key,
  title text not null,
  case_id bigint references cases(id),
  is_online boolean not null default true,
  link text,
  location text,
  date_bs text,
  time text,
  attendee_ids uuid[] not null default '{}',
  created_at timestamptz not null default now()
);

alter table meetings enable row level security;
create policy "Authenticated read" on meetings for select using (auth.uid() is not null);
create policy "Staff+ insert" on meetings for insert with check (
  exists (select 1 from profiles where id = auth.uid() and role in ('ADMIN','LAWYER','EXTERNAL_LAWYER','STAFF'))
);

-- INDEXES
create index idx_cases_status on cases(status);
create index idx_cases_lawyer on cases(lawyer_id);
create index idx_cases_client on cases(client_id);
create index idx_pesi_case on pesi(case_id);
create index idx_decisions_case on decisions(case_id);
create index idx_master_category on master_data(category);

-- ============================================================
-- SEED MASTER DATA
-- ============================================================
insert into master_data (category, value, sort_order) values
  ('case_type','Writ',1),('case_type','Criminal - Individual Party',2),('case_type','Criminal - State Party',3),
  ('case_type','Niwedan',4),('case_type','Custom Case',5),('case_type','Electricity Tariff',6),
  ('case_type','Labor',7),('case_type','Tax Case',8),('case_type','Recovery',9),
  ('case_type','Trademark',10),('case_type','Revenue Leakage',11),
  ('case_type','Offence Against Company Act',12),('case_type','To Declare Decision Void',13),
  ('case_type','Corruption',14),('case_type','Arbitration',15),
  ('court','Supreme Court',1),('court','High Court Patan',2),('court','High Court Biratnagar',3),
  ('court','District Court Kathmandu',4),('court','District Court Lalitpur',5),
  ('court','Revenue Tribunal',6),('court','Labour Court',7),('court','Administrative Court',8),('court','Special Court',9),
  ('judge','Hon. Justice Harish Pant',1),('judge','Hon. Justice Mina Sharma',2),
  ('judge','Hon. Judge Laxmi Basnet',3),('judge','Hon. Judge Prakash Oli',4),('judge','Hon. Judge Hari Khanal',5),
  ('decision_type','Faisala',1),('decision_type','Antarim Aadesh',2),('decision_type','Ret',3),
  ('decision_type','Punarlokan',4),('decision_type','Sadhak',5),
  ('tarek_type','Sadaran',1),('tarek_type','Sakchi Bakpatra',2),('tarek_type','Kajagat Pesh',3),
  ('tarek_type','Dalil Pesh',4),('tarek_type','Bayan Pesh',5),
  ('pesi_type','Dainik Pesi Suchi',1),('pesi_type','Saptahik Pesi Suchi',2),('pesi_type','Purak Pesi Suchi',3);
