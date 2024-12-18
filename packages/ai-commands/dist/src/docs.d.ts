import type { SupabaseClient } from '@supabase/supabase-js';
import type OpenAI from 'openai';
import type { Message } from './types';
export declare function clippy(openai: OpenAI, supabaseClient: SupabaseClient<any, 'public', any>, messages: Message[]): Promise<Response>;
//# sourceMappingURL=docs.d.ts.map