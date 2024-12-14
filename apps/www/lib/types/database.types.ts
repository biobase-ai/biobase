export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      doc_embeddings: {
        Row: {
          id: string
          path: string
          checksum: string
          embedding: number[]
          content: string
          type: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          path: string
          checksum: string
          embedding: number[]
          content: string
          type?: string | null
        }
        Update: {
          id?: string
          path?: string
          checksum?: string
          embedding?: number[]
          content?: string
          type?: string | null
        }
      }
      feedback: {
        Row: {
          id: string
          page_id: string
          is_helpful: boolean
          comment: string | null
          created_at: string
          query_params: Json | null
        }
        Insert: {
          id?: string
          page_id: string
          is_helpful: boolean
          comment?: string | null
          query_params?: Json | null
        }
        Update: {
          id?: string
          page_id?: string
          is_helpful?: boolean
          comment?: string | null
          query_params?: Json | null
        }
      }
      troubleshooting_entries: {
        Row: {
          id: string
          title: string
          description: string
          solution: string
          tags: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          solution: string
          tags?: string[] | null
        }
        Update: {
          id?: string
          title?: string
          description?: string
          solution?: string
          tags?: string[] | null
        }
      }
      validation_history: {
        Row: {
          id: string
          entity_id: string
          entity_type: string
          validation_type: string
          status: string
          details: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          entity_id: string
          entity_type: string
          validation_type: string
          status: string
          details?: Json | null
        }
        Update: {
          id?: string
          entity_id?: string
          entity_type?: string
          validation_type?: string
          status?: string
          details?: Json | null
        }
      }
      lw12_tickets: {
        Row: {
          id: string
          event_id: string
          attendee_email: string
          ticket_type: string
          metadata: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          event_id: string
          attendee_email: string
          ticket_type: string
          metadata?: Json | null
        }
        Update: {
          id?: string
          event_id?: string
          attendee_email?: string
          ticket_type?: string
          metadata?: Json | null
        }
      }
      remote_schemas: {
        Row: {
          id: string
          schema: Json
          last_updated: string
          created_at: string
        }
        Insert: {
          id?: string
          schema: Json
          last_updated: string
        }
        Update: {
          id?: string
          schema?: Json
          last_updated?: string
        }
      }
    }
    Views: {
      feedback_stats: {
        Row: {
          page_id: string
          helpful_count: number
          unhelpful_count: number
          total_count: number
          helpful_percentage: number
        }
      }
    }
    Functions: {
      match_page_sections: {
        Args: {
          embedding: number[]
          match_threshold: number
          match_count: number
        }
        Returns: {
          id: string
          path: string
          content: string
          similarity: number
        }[]
      }
      get_page_hierarchy: {
        Args: {
          page_path: string
        }
        Returns: {
          path: string
          parent_path: string | null
          level: number
        }[]
      }
      execute_raw_query: {
        Args: {
          query_text: string
          query_params?: unknown[]
        }
        Returns: Json
      }
      check_database_health: {
        Args: Record<string, never>
        Returns: boolean
      }
    }
  }
}
