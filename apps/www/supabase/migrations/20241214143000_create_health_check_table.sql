-- Create health check table
CREATE TABLE IF NOT EXISTS public._health_check (
  id SERIAL PRIMARY KEY,
  last_check TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  status TEXT DEFAULT 'healthy'
);

-- Insert initial record
INSERT INTO public._health_check (status) VALUES ('healthy')
ON CONFLICT DO NOTHING;

-- Grant access to authenticated users
GRANT SELECT ON public._health_check TO authenticated;
GRANT SELECT ON public._health_check TO service_role;
