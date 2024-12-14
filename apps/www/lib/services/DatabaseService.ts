const { createClient } = require('@supabase/supabase-js')

interface DatabaseServiceType {
  client: any;
  createDocEmbedding(data: {
    path: string;
    checksum: string;
    embedding: number[];
    content: string;
    type?: string;
  }): Promise<any>;
  searchEmbeddings(query_embedding: number[], match_threshold?: number, match_count?: number): Promise<any>;
  getPageHierarchy(path: string): Promise<any>;
  createFeedback(data: {
    page_id: string;
    is_helpful: boolean;
    comment?: string;
    query_params?: Record<string, string>;
  }): Promise<any>;
  getFeedbackStats(): Promise<any>;
  createTroubleshootingEntry(data: {
    title: string;
    description: string;
    solution: string;
    tags?: string[];
  }): Promise<any>;
  searchTroubleshootingEntries(query: string): Promise<any>;
  addValidationHistory(data: {
    entity_id: string;
    entity_type: string;
    validation_type: string;
    status: string;
    details?: Record<string, any>;
  }): Promise<any>;
  getValidationHistory(entityId: string, entityType: string): Promise<any>;
  createTicket(data: {
    event_id: string;
    attendee_email: string;
    ticket_type: string;
    metadata?: Record<string, any>;
  }): Promise<any>;
  getTicketsByEmail(email: string): Promise<any>;
  getRemoteSchemas(): Promise<any>;
  updateRemoteSchema(id: string, data: {
    schema: object;
    last_updated: string;
  }): Promise<any>;
  executeRawQuery(query: string, values?: any[]): Promise<any>;
  checkHealth(): Promise<any>;
}

class DatabaseServiceImpl implements DatabaseServiceType {
  private static instance: DatabaseServiceImpl;
  public client: any;

  private constructor() {
    this.client = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )
  }

  public static getInstance(): DatabaseServiceImpl {
    if (!DatabaseServiceImpl.instance) {
      DatabaseServiceImpl.instance = new DatabaseServiceImpl()
    }
    return DatabaseServiceImpl.instance
  }

  async createDocEmbedding(data: {
    path: string;
    checksum: string;
    embedding: number[];
    content: string;
    type?: string;
  }) {
    return await this.client.from('doc_embeddings').insert(data)
  }

  async searchEmbeddings(query_embedding: number[], match_threshold: number = 0.7, match_count: number = 5) {
    const { data, error } = await this.client.rpc('match_page_sections', {
      embedding: query_embedding,
      match_threshold,
      match_count
    })
    return { data, error }
  }

  async getPageHierarchy(path: string) {
    const { data, error } = await this.client.rpc('get_page_hierarchy', { page_path: path })
    return { data, error }
  }

  async createFeedback(data: {
    page_id: string;
    is_helpful: boolean;
    comment?: string;
    query_params?: Record<string, string>;
  }) {
    return await this.client.from('feedback').insert(data)
  }

  async getFeedbackStats() {
    return await this.client.from('feedback_stats').select('*')
  }

  async createTroubleshootingEntry(data: {
    title: string;
    description: string;
    solution: string;
    tags?: string[];
  }) {
    return await this.client.from('troubleshooting_entries').insert(data)
  }

  async searchTroubleshootingEntries(query: string) {
    return await this.client.from('troubleshooting_entries')
      .select('*')
      .textSearch('title', query)
  }

  async addValidationHistory(data: {
    entity_id: string;
    entity_type: string;
    validation_type: string;
    status: string;
    details?: Record<string, any>;
  }) {
    return await this.client.from('validation_history').insert(data)
  }

  async getValidationHistory(entityId: string, entityType: string) {
    return await this.client.from('validation_history')
      .select('*')
      .eq('entity_id', entityId)
      .eq('entity_type', entityType)
      .order('created_at', { ascending: false })
  }

  async createTicket(data: {
    event_id: string;
    attendee_email: string;
    ticket_type: string;
    metadata?: Record<string, any>;
  }) {
    return await this.client.from('lw12_tickets').insert(data)
  }

  async getTicketsByEmail(email: string) {
    return await this.client.from('lw12_tickets')
      .select('*')
      .eq('attendee_email', email)
  }

  async getRemoteSchemas() {
    return await this.client.from('remote_schemas').select('*')
  }

  async updateRemoteSchema(id: string, data: {
    schema: object;
    last_updated: string;
  }) {
    return await this.client.from('remote_schemas')
      .update(data)
      .eq('id', id)
  }

  async executeRawQuery(query: string, values?: any[]) {
    return await this.client.rpc('execute_raw_query', {
      query_text: query,
      query_params: values
    })
  }

  async checkHealth() {
    return await this.client.rpc('check_database_health')
  }
}

module.exports = { DatabaseService: DatabaseServiceImpl }
