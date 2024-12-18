import OpenAI from 'openai';
import type { Message } from '../types';
import { components } from 'api-types';
type DatabasePoliciesData = components['schemas']['PostgresPolicy'];
/**
 * Responds to a conversation about building an RLS policy.
 *
 * @returns A `ReadableStream` containing the response text and SQL.
 */
export declare function chatRlsPolicy(openaiClient: OpenAI, messages: Message[], entityDefinitions?: string[], existingPolicies?: DatabasePoliciesData[], policyDefinition?: string): Promise<ReadableStream<Uint8Array>>;
export {};
//# sourceMappingURL=rls.d.ts.map