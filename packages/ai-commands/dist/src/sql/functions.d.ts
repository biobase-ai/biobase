import { SchemaBuilder } from '@serafin/schema-builder';
import type OpenAI from 'openai';
declare const debugSqlSchema: SchemaBuilder<{
    solution: string;
    sql: string;
}>;
declare const generateTitleSchema: SchemaBuilder<{
    title: string;
    description: string;
}>;
export type DebugSqlResult = typeof debugSqlSchema.T;
export type GenerateTitleResult = typeof generateTitleSchema.T;
/**
 * Debugs SQL errors.
 *
 * @returns A suggested SQL fix along with a solution explanation.
 */
export declare function debugSql(openai: OpenAI, errorMessage: string, sql: string, entityDefinitions?: string[]): Promise<{
    solution: string;
    sql: string;
}>;
/**
 * Generates a snippet title based on the provided SQL.
 *
 * @returns A title and description for the SQL snippet.
 */
export declare function titleSql(openai: OpenAI, sql: string): Promise<{
    title: string;
    description: string;
}>;
export {};
//# sourceMappingURL=functions.d.ts.map