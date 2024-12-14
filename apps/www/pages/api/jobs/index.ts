import { createClient } from '@supabase/supabase-js'
import { NextApiRequest, NextApiResponse } from 'next'

const biobaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { data: jobs, error } = await biobaseClient
      .from('jobs')
      .select('*')
      .eq('status', 'open')
      .order('created_at', { ascending: false })

    if (error) throw error

    // Transform the data to match Ashby's format
    const transformedJobs = jobs.map((job) => ({
      id: job.id,
      title: job.title,
      team: {
        name: job.team,
      },
      location: {
        name: job.location,
      },
      isRemote: job.remote,
      description: job.description,
      requirements: job.requirements,
      employmentType: job.employment_type,
      customFields: {
        status: job.status,
      },
      applicationLink: job.external_link || null,
    }))

    return res.status(200).json({
      jobs: transformedJobs,
    })
  } catch (error) {
    console.error('Error fetching jobs:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
