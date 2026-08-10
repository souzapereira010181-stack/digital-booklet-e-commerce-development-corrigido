-- Kleber Store: armazenamento persistente da loja no Supabase.
-- Execute este arquivo UMA VEZ no Supabase > SQL Editor.

-- Catálogo público: não contém senhas nem dados de usuários.
create table if not exists public.store_state (
  id integer primary key,
  data jsonb not null,
  updated_at timestamptz not null default now(),
  constraint store_state_singleton check (id = 1)
);

alter table public.store_state enable row level security;

drop policy if exists "store_state_public_read" on public.store_state;
create policy "store_state_public_read"
  on public.store_state
  for select
  to anon, authenticated
  using (true);

grant select on public.store_state to anon, authenticated;
revoke insert, update, delete on public.store_state from anon, authenticated;

-- Usuários ficam em uma tabela separada e NÃO têm acesso público.
create table if not exists public.store_users (
  id integer primary key,
  data jsonb not null,
  updated_at timestamptz not null default now(),
  constraint store_users_singleton check (id = 1)
);

alter table public.store_users enable row level security;

revoke all on public.store_users from anon, authenticated;

create index if not exists store_state_updated_at_idx
  on public.store_state (updated_at);

create index if not exists store_users_updated_at_idx
  on public.store_users (updated_at);

-- O Admin grava as duas tabelas somente no servidor usando a chave secreta.
-- O bucket de PDFs é criado automaticamente na primeira vez que um PDF for enviado.
