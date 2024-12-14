-- Create health check function
CREATE OR REPLACE FUNCTION public.check_database_health()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Perform basic health checks
  -- For now, just check if we can execute a simple query
  PERFORM 1;
  RETURN true;
EXCEPTION
  WHEN OTHERS THEN
    RETURN false;
END;
$$;
