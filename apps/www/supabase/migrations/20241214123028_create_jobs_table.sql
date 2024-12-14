-- Enable the required extensions
create extension if not exists "uuid-ossp";

-- Create jobs table
create table if not exists public.jobs (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  team text not null,
  location text not null,
  is_remote boolean default true,
  description text,
  requirements text,
  employment_type text default 'full_time',
  status text default 'open',
  external_link text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.jobs enable row level security;

-- Create policies
create policy "Allow public read access"
  on public.jobs for select
  using (true);

create policy "Allow authenticated users to manage jobs"
  on public.jobs for all
  using (auth.role() = 'authenticated');

-- Create updated_at trigger
create or replace function handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger on_jobs_updated
  before update on public.jobs
  for each row
  execute function handle_updated_at();
