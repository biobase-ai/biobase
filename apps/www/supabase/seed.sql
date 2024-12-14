-- Insert sample jobs data
INSERT INTO jobs (id, title, department, location, job_type, description, requirements, created_at, updated_at)
VALUES 
  (
    gen_random_uuid(),
    'Senior Backend Engineer',
    'Engineering',
    'Remote',
    'Full-time',
    'We are looking for a Senior Backend Engineer to join our team and help build scalable systems.',
    ARRAY['5+ years of experience with backend development', 'Strong knowledge of distributed systems', 'Experience with PostgreSQL'],
    NOW(),
    NOW()
  ),
  (
    gen_random_uuid(),
    'Frontend Developer',
    'Engineering',
    'San Francisco, CA',
    'Full-time',
    'Join our frontend team to build beautiful and performant user interfaces.',
    ARRAY['3+ years of React experience', 'Experience with TypeScript', 'Strong CSS skills'],
    NOW(),
    NOW()
  ),
  (
    gen_random_uuid(),
    'DevOps Engineer',
    'Infrastructure',
    'Remote',
    'Full-time',
    'Help us build and maintain our cloud infrastructure and deployment pipelines.',
    ARRAY['Experience with AWS or GCP', 'Knowledge of Kubernetes', 'Strong scripting skills'],
    NOW(),
    NOW()
  );
