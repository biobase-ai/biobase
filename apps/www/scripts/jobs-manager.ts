import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import path from 'path'

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env.local') })

// Types
interface AshbyJob {
  id: string
  title: string
  team: {
    name: string
  }
  location: {
    name: string
  }
  isRemote: boolean
  description: string
  requirements: string
  employmentType: string
  customFields?: {
    status?: string
  }
  applicationLink?: string
}

interface SupabaseJob {
  id: string
  title: string
  team: string
  location: string
  is_remote: boolean
  description: string
  requirements: string
  employment_type: string
  status: string
  external_link: string | null
  created_at?: string
  updated_at?: string
}

class JobsManager {
  private supabase
  
  constructor() {
    this.supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )
  }

  // Transform Ashby job to Supabase format
  private transformAshbyJob(job: AshbyJob): Omit<SupabaseJob, 'id' | 'created_at' | 'updated_at'> {
    return {
      title: job.title,
      team: job.team.name,
      location: job.location.name,
      is_remote: job.isRemote,
      description: job.description,
      requirements: job.requirements,
      employment_type: job.employmentType,
      status: job.customFields?.status || 'open',
      external_link: job.applicationLink || null,
    }
  }

  // Fetch jobs from Ashby API
  async fetchAshbyJobs(): Promise<AshbyJob[]> {
    try {
      const response = await fetch('https://api.ashbyhq.com/posting-api/job-board/biobase')
      const data = await response.json()
      return data.jobs
    } catch (error) {
      console.error('Error fetching jobs from Ashby:', error)
      throw error
    }
  }

  // Sync jobs from Ashby to Supabase
  async syncJobs() {
    try {
      // Fetch jobs from Ashby
      const ashbyJobs = await this.fetchAshbyJobs()
      
      // Transform jobs to Supabase format
      const supabaseJobs = ashbyJobs.map(job => this.transformAshbyJob(job))

      // Delete existing jobs
      const { error: deleteError } = await this.supabase
        .from('jobs')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000')

      if (deleteError) {
        throw deleteError
      }

      // Insert new jobs
      const { error: insertError } = await this.supabase
        .from('jobs')
        .insert(supabaseJobs)

      if (insertError) {
        throw insertError
      }

      console.log(`Successfully synced ${supabaseJobs.length} jobs`)
    } catch (error) {
      console.error('Error syncing jobs:', error)
      throw error
    }
  }

  // Get all jobs
  async getAllJobs(): Promise<SupabaseJob[]> {
    const { data, error } = await this.supabase
      .from('jobs')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      throw error
    }

    return data
  }

  // Get jobs by status
  async getJobsByStatus(status: string): Promise<SupabaseJob[]> {
    const { data, error } = await this.supabase
      .from('jobs')
      .select('*')
      .eq('status', status)
      .order('created_at', { ascending: false })

    if (error) {
      throw error
    }

    return data
  }

  // Update job status
  async updateJobStatus(jobId: string, status: string) {
    const { error } = await this.supabase
      .from('jobs')
      .update({ status })
      .eq('id', jobId)

    if (error) {
      throw error
    }
  }
}

// Create CLI commands
async function main() {
  const manager = new JobsManager()
  const command = process.argv[2]

  try {
    switch (command) {
      case 'sync':
        await manager.syncJobs()
        break
      case 'list':
        const jobs = await manager.getAllJobs()
        console.log(JSON.stringify(jobs, null, 2))
        break
      case 'list-open':
        const openJobs = await manager.getJobsByStatus('open')
        console.log(JSON.stringify(openJobs, null, 2))
        break
      default:
        console.log('Available commands: sync, list, list-open')
    }
  } catch (error) {
    console.error('Error:', error)
    process.exit(1)
  }
}

// Run if called directly
if (require.main === module) {
  main()
}
