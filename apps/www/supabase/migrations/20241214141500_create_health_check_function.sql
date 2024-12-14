-- Create health check function
CREATE OR REPLACE FUNCTION public.check_database_health()
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  result jsonb;
BEGIN
  -- Perform basic health checks
  -- For now, just check if we can execute a simple query
  PERFORM 1;
  result := jsonb_build_object(
    'status', 'healthy',
    'timestamp', CURRENT_TIMESTAMP
  );
  RETURN result;
EXCEPTION
  WHEN OTHERS THEN
    result := jsonb_build_object(
      'status', 'unhealthy',
      'error', SQLERRM,
      'timestamp', CURRENT_TIMESTAMP
    );
    RETURN result;
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.check_database_health() TO authenticated;
GRANT EXECUTE ON FUNCTION public.check_database_health() TO service_role;
