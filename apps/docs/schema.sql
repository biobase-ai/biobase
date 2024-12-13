-- Create partners table
create table if not exists public.partners (
  id uuid default gen_random_uuid() primary key,
  slug text not null unique,
  title text not null,
  type text not null check (type in ('technology', 'expert')),
  overview text,
  approved boolean default false
);

-- Add RLS policies
alter table public.partners enable row level security;

-- Allow anonymous read access to approved partners
create policy "Partners are viewable by everyone"
  on public.partners
  for select
  using (approved = true);

-- Insert some sample data
insert into public.partners (slug, title, type, overview, approved)
values 
  ('sample-integration', 'Sample Integration', 'technology', 'This is a sample integration', true)
on conflict (slug) do nothing;

-- Grant access to authenticated and anon users
grant usage on schema public to anon, authenticated;
grant select on public.partners to anon, authenticated;
