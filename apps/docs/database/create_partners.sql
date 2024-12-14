create table if not exists public.partners (
  id uuid default gen_random_uuid() primary key,
  slug text not null unique,
  title text not null,
  type text not null check (type in ('technology', 'expert')),
  overview text,
  approved boolean default false
);

alter table public.partners enable row level security;

create policy "Partners are viewable by everyone"
  on public.partners
  for select
  using (approved = true);

insert into public.partners (slug, title, type, overview, approved)
values 
  ('sample-integration', 'Sample Integration', 'technology', 'This is a sample integration', true)
on conflict (slug) do nothing;

grant usage on schema public to anon, authenticated;
grant select on public.partners to anon, authenticated;
