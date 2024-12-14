import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import fetch from 'node-fetch'
import path from 'path'

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(__dirname, '../.env.local') })

const biobaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function syncJobs() {
  try {
    // Fetch jobs from Ashby API
    const response = await fetch('https://api.ashbyhq.com/posting-api/job-board/biobase')
    const data = await response.json()

    // Transform Ashby jobs to our format
    const jobs = data.jobs.map((job: any) => ({
      title: job.title,
      team: job.team.name,
      location: job.location.name,
      remote: job.isRemote,
      description: job.description,
      requirements: job.requirements,
      employment_type: job.employmentType,
      status: job.customFields?.status || 'open',
      external_link: job.applicationLink
    }))

    // Delete existing jobs
    const { error: deleteError } = await biobaseClient
      .from('jobs')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000') // Delete all jobs

    if (deleteError) {
      throw deleteError
    }

    // Insert new jobs
    const { error: insertError } = await biobaseClient
      .from('jobs')
      .insert(jobs)

    if (insertError) {
      throw insertError
    }

    console.log(`Successfully synced ${jobs.length} jobs`)
  } catch (error) {
    console.error('Error syncing jobs:', error)
  }
}

// Run the sync
syncJobs()
