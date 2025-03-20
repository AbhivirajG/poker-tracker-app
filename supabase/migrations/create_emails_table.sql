-- Create the emails table
create table if not exists public.emails (
    id uuid default gen_random_uuid() primary key,
    email text not null unique,
    timestamp timestamptz default timezone('utc'::text, now()) not null,
    source text default 'beta_signup'::text,
    created_at timestamptz default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.emails enable row level security;

-- Create policy to allow anyone to insert
create policy "Allow public insert" on public.emails
    for insert
    to public
    with check (true);

-- Create policy to allow only authenticated users to view
create policy "Allow authenticated users to view" on public.emails
    for select
    to authenticated
    using (true);

-- Create index on email for faster lookups
create index if not exists emails_email_idx on public.emails (email);

-- Create index on timestamp for sorting
create index if not exists emails_timestamp_idx on public.emails (timestamp desc); 