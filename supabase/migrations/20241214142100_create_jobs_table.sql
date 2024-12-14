-- Create jobs table with proper schema and RLS policies
CREATE TABLE IF NOT EXISTS public.jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    department TEXT,
    location TEXT,
    job_type TEXT,
    description TEXT,
    requirements TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    source TEXT DEFAULT 'ashby',
    status TEXT DEFAULT 'active',
    external_id TEXT UNIQUE,
    metadata JSONB DEFAULT '{}'::jsonb
);

-- Add indexes for common queries
CREATE INDEX IF NOT EXISTS jobs_created_at_idx ON public.jobs(created_at);
CREATE INDEX IF NOT EXISTS jobs_department_idx ON public.jobs(department);
CREATE INDEX IF NOT EXISTS jobs_status_idx ON public.jobs(status);
CREATE INDEX IF NOT EXISTS jobs_external_id_idx ON public.jobs(external_id);

-- Enable Row Level Security
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable read access for all users" ON public.jobs
    FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users only" ON public.jobs
    FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Enable update for authenticated users only" ON public.jobs
    FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER jobs_handle_updated_at
    BEFORE UPDATE ON public.jobs
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();
