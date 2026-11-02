-- Export demo sites: shared schema for spices, castings, textiles.
-- Run once in the Supabase SQL editor (or via the Supabase MCP / CLI).
-- Row Level Security is ON for every table. Do not disable it.

-- 1. Helpers --------------------------------------------------------------

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- 2. Admins ---------------------------------------------------------------

create table if not exists public.admins (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.admins enable row level security;

create policy "admins can see own row"
  on public.admins for select
  to authenticated
  using (user_id = (select auth.uid()));

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.admins where user_id = (select auth.uid())
  );
$$;

-- 3. Products (used by textiles; schema works for all demos) -------------

create table if not exists public.products (
  id             uuid primary key default gen_random_uuid(),
  site           text not null check (site in ('spices', 'castings', 'textiles')),
  slug           text not null check (slug ~ '^[a-z0-9-]{1,80}$'),
  category       text not null,
  name_en        text not null check (char_length(name_en) between 1 and 120),
  name_de        text check (char_length(name_de) <= 120),
  description_en text check (char_length(description_en) <= 4000),
  description_de text check (char_length(description_de) <= 4000),
  specs          jsonb not null default '{}'::jsonb,   -- key/value spec table
  colourways     jsonb not null default '[]'::jsonb,   -- [{ "name": "...", "hex": "#...", "image_url": "..." }]
  moq            text,
  hs_code        text check (hs_code ~ '^[0-9]{4}([0-9]{2}){0,2}$'),
  lead_time      text,
  incoterms      text[] not null default '{}',
  image_urls     text[] not null default '{}',
  published      boolean not null default false,
  sort_order     integer not null default 0,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now(),
  unique (site, slug)
);

create index if not exists products_site_published_idx
  on public.products (site, category, sort_order)
  where published;

create trigger products_set_updated_at
  before update on public.products
  for each row execute function public.set_updated_at();

alter table public.products enable row level security;

create policy "public can read published products"
  on public.products for select
  to anon, authenticated
  using (published = true);

create policy "admins can read all products"
  on public.products for select
  to authenticated
  using ((select public.is_admin()));

create policy "admins can insert products"
  on public.products for insert
  to authenticated
  with check ((select public.is_admin()));

create policy "admins can update products"
  on public.products for update
  to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

create policy "admins can delete products"
  on public.products for delete
  to authenticated
  using ((select public.is_admin()));

-- 4. RFQ submissions (all demos) -----------------------------------------

create table if not exists public.rfq_submissions (
  id               uuid primary key default gen_random_uuid(),
  site             text not null check (site in ('spices', 'castings', 'textiles')),
  name             text not null check (char_length(name) between 1 and 120),
  email            text not null check (
                     char_length(email) <= 254
                     and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
                   ),
  country          text not null check (char_length(country) between 2 and 80),
  product_quantity text not null check (char_length(product_quantity) between 2 and 300),
  message          text check (char_length(message) <= 2000),
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

create index if not exists rfq_site_created_idx
  on public.rfq_submissions (site, created_at desc);

create trigger rfq_set_updated_at
  before update on public.rfq_submissions
  for each row execute function public.set_updated_at();

alter table public.rfq_submissions enable row level security;

-- Visitors can submit, never read. Column checks above limit abuse.
create policy "anyone can submit an rfq"
  on public.rfq_submissions for insert
  to anon, authenticated
  with check (true);

create policy "admins can read rfqs"
  on public.rfq_submissions for select
  to authenticated
  using ((select public.is_admin()));

-- 5. Product image storage -----------------------------------------------

insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

create policy "admins can upload product images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'product-images' and (select public.is_admin()));

create policy "admins can update product images"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'product-images' and (select public.is_admin()));

create policy "admins can delete product images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'product-images' and (select public.is_admin()));

-- 6. After creating your admin user in Authentication > Users, run:
-- insert into public.admins (user_id) values ('<paste-user-uuid-here>');
