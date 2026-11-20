-- =====================================================================
-- Valera Visionarias · Esquema de Supabase para la web
-- Deducido del código (app/api/admin/*, app/propiedad*, components/*).
-- Cómo usarlo: Supabase → tu proyecto → SQL Editor → New query →
-- pega todo este archivo → Run. Solo hay que hacerlo una vez.
-- =====================================================================

-- 1) Tabla de inmuebles -------------------------------------------------
create table if not exists public.properties (
  id           uuid primary key default gen_random_uuid(),
  title        text        not null,
  description  text,
  price        numeric(12,2),
  size         numeric(10,2),            -- metros cuadrados
  bedrooms     integer     default 0,
  bathrooms    integer     default 0,
  address      text,
  city         text        default 'San Vicente del Raspeig',
  postal_code  text,
  category     text        not null default 'venta'
               check (category in ('venta', 'alquiler')),
  status       text        not null default 'activo'
               check (status in ('activo', 'inactivo')),
  featured     boolean     not null default false,
  created_at   timestamptz not null default now()
);

create index if not exists properties_status_idx   on public.properties (status);
create index if not exists properties_category_idx on public.properties (category);
create index if not exists properties_created_idx  on public.properties (created_at desc);

-- 2) Tabla de fotos de cada inmueble ------------------------------------
create table if not exists public.property_images (
  id           uuid primary key default gen_random_uuid(),
  property_id  uuid        not null references public.properties (id) on delete cascade,
  url          text        not null,
  position     integer     not null default 0,
  created_at   timestamptz not null default now()
);

create index if not exists property_images_property_idx
  on public.property_images (property_id, position);

-- 3) Seguridad (RLS) ----------------------------------------------------
-- El público (clave anon) solo puede LEER los inmuebles activos y sus fotos.
-- Nadie puede escribir con la clave pública: el panel /admin escribe desde
-- el servidor con la clave service_role, que se salta estas reglas.
alter table public.properties      enable row level security;
alter table public.property_images enable row level security;

drop policy if exists "Lectura pública de inmuebles activos" on public.properties;
create policy "Lectura pública de inmuebles activos"
  on public.properties for select
  to anon, authenticated
  using (status = 'activo');

drop policy if exists "Lectura pública de fotos de inmuebles activos" on public.property_images;
create policy "Lectura pública de fotos de inmuebles activos"
  on public.property_images for select
  to anon, authenticated
  using (
    exists (
      select 1 from public.properties p
      where p.id = property_images.property_id
        and p.status = 'activo'
    )
  );

-- 4) Almacenamiento de fotos -------------------------------------------
-- Bucket público "properties": las fotos se ven por URL pública.
-- Las subidas y borrados los hace el servidor con service_role, así que
-- no hacen falta políticas de escritura.
insert into storage.buckets (id, name, public)
values ('properties', 'properties', true)
on conflict (id) do update set public = true;

-- =====================================================================
-- 5) SOLO tras importar los datos antiguos (no lo ejecutes ahora):
-- las URLs de las fotos apuntan al proyecto antiguo. Cuando hayas subido
-- las fotos a tu bucket con las MISMAS carpetas y nombres, cambia la
-- dirección del proyecto en todas las URLs (sustituye los dos valores):
--
-- update public.property_images
--    set url = replace(url,
--                      'https://PROYECTO-ANTIGUO.supabase.co',
--                      'https://PROYECTO-NUEVO.supabase.co');
-- =====================================================================
