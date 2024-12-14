-- Create partners table
create table if not exists public.partners (
    id uuid default gen_random_uuid() primary key,
    slug text unique not null,
    title text not null,
    type text not null,
    overview text,
    approved boolean default false,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.partners enable row level security;

create policy "Partners are viewable by everyone"
    on partners for select
    using (true);

create policy "Partners can be created by authenticated users"
    on partners for insert
    with check (auth.role() = 'authenticated');

create policy "Partners can be updated by owners"
    on partners for update
    using (auth.uid() = id);

-- Create users table
create table if not exists public.users (
    id uuid references auth.users not null primary key,
    username text unique,
    status text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.users enable row level security;

create policy "Users are viewable by everyone"
    on users for select
    using (true);

create policy "Users can update own profile"
    on users for update
    using (auth.uid() = id);

-- Create user_roles table
create table if not exists public.user_roles (
    id uuid default gen_random_uuid() primary key,
    user_id uuid references public.users not null,
    role text not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    unique(user_id, role)
);

alter table public.user_roles enable row level security;

create policy "User roles are viewable by everyone"
    on user_roles for select
    using (true);

create policy "Only super admins can manage user roles"
    on user_roles for all
    using (
        exists (
            select 1 from public.user_roles
            where user_id = auth.uid()
            and role = 'super_admin'
        )
    );

-- Create role_permissions table
create table if not exists public.role_permissions (
    id uuid default gen_random_uuid() primary key,
    role text not null,
    permission text not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    unique(role, permission)
);

alter table public.role_permissions enable row level security;

create policy "Role permissions are viewable by everyone"
    on role_permissions for select
    using (true);

create policy "Only super admins can manage role permissions"
    on role_permissions for all
    using (
        exists (
            select 1 from public.user_roles
            where user_id = auth.uid()
            and role = 'super_admin'
        )
    );
