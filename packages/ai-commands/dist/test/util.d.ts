declare global {
    interface ReadableStream<R = any> {
        [Symbol.asyncIterator](): AsyncIterableIterator<R>;
    }
}
/**
 * Formats Postgres SQL into a consistent format.
 *
 * @returns The formatted SQL.
 */
export declare const formatSql: (sql: string) => string;
/**
 * Collects an `ArrayBuffer` stream into a single decoded string.
 *
 * @returns A single string combining all the decoded stream chunks.
 */
export declare function collectStream<R extends BufferSource>(stream: ReadableStream<R>): Promise<string>;
/**
 * Parses markdown and extracts all SQL code blocks.
 *
 * @returns An array of string content from each SQL code block.
 */
export declare function extractMarkdownSql(markdown: string): Code[];
/**
 * Prints the provided metadata along with any assertion errors.
 * Works both synchronously and asynchronously.
 *
 * Useful for providing extra context for failed tests.
 */
export declare function withMetadata<T extends void | Promise<void>>(metadata: Record<string, string>, fn: () => T): T;
//# sourceMappingURL=util.d.ts.map