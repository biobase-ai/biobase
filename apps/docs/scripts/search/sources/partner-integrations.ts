import { type SupabaseClient, createClient } from '@supabase/supabase-js'
import { upperFirst } from 'lodash'

import { BaseLoader, BaseSource } from './base'
import { processMdx } from '../../helpers.mdx'

type PartnerData = {
  slug: string // The partner slug corresponding to the last part of the URL
  overview: string // The Markdown content for indexing
}

let supabaseClient: SupabaseClient
function getSupabaseClient() {
  if (!supabaseClient) {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_URL')
    }
    if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_ANON_KEY')
    }

    supabaseClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        auth: {
          persistSession: false,
        },
      }
    )
  }
  return supabaseClient
}

export async function fetchPartners() {
  // Skip actual API calls during builds
  if (process.env.NODE_ENV === 'production' && process.env.NEXT_PHASE === 'build') {
    console.log('Using mock partner data for search indexing during build');
    return [
      {
        slug: 'mock-partner-1',
        overview: '# Mock Partner 1\n\nThis is a mock partner integration for search indexing during builds.'
      },
      {
        slug: 'mock-partner-2',
        overview: '# Mock Partner 2\n\nThis is another mock partner integration for search indexing during builds.'
      }
    ];
  }

  try {
    const biobase = getSupabaseClient()
    const { data: partners, error } = await biobase
      .from('partners')
      .select('slug,overview')
      .eq('approved', true)
      // We want to show technology integrations, not agencies, in search
      .neq('type', 'expert')
    
    if (error) {
      console.error('Error fetching partners for search indexing:', error);
      // Return mock data as fallback
      return [
        {
          slug: 'mock-partner-1',
          overview: '# Mock Partner 1\n\nThis is a mock partner integration for search indexing during builds.'
        },
        {
          slug: 'mock-partner-2',
          overview: '# Mock Partner 2\n\nThis is another mock partner integration for search indexing during builds.'
        }
      ];
    }
    
    return partners
  } catch (err) {
    console.error('Error fetching partners for search indexing:', err);
    // Return mock data as fallback
    return [
      {
        slug: 'mock-partner-1',
        overview: '# Mock Partner 1\n\nThis is a mock partner integration for search indexing during builds.'
      },
      {
        slug: 'mock-partner-2',
        overview: '# Mock Partner 2\n\nThis is another mock partner integration for search indexing during builds.'
      }
    ];
  }
}

export class IntegrationLoader extends BaseLoader {
  type = 'partner-integration' as const

  constructor(
    source: string,
    public partnerData: PartnerData
  ) {
    const relPath = `/partners/integrations/${partnerData.slug}`
    super(source, relPath)
  }

  async load() {
    return [new IntegrationSource(this.source, this.path, this.partnerData)]
  }
}

export class IntegrationSource extends BaseSource {
  type = 'partner-integration' as const

  constructor(
    source: string,
    path: string,
    public partnerData: PartnerData
  ) {
    super(source, path)
  }

  process() {
    const { checksum, sections } = processMdx(this.partnerData.overview)
    const meta = {
      title: upperFirst(this.partnerData.slug),
      subtitle: 'Integration',
    }

    this.checksum = checksum
    this.meta = meta
    this.sections = sections

    return {
      checksum,
      meta,
      ragIgnore: true,
      sections,
    }
  }

  extractIndexedContent() {
    const sections = this.sections ?? []
    const result =
      (this.meta?.title ?? '') + '\n\n' + sections.map(({ content }) => content).join('\n\n')
    return result
  }
}
