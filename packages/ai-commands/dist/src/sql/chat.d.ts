import type OpenAI from 'openai';
import type { Message } from '../types';
/**
 * Responds to a conversation about writing a SQL query.
 *
 * @returns A `ReadableStream` containing the response text and SQL.
 */
export declare function chatSql(openai: OpenAI, messages: Message[], existingSql?: string, entityDefinitions?: string[]): Promise<ReadableStream<Uint8Array>>;
//# sourceMappingURL=chat.d.ts.map