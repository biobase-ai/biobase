import type OpenAI from 'openai';
export declare const tokenizer: import("js-tiktoken").Tiktoken;
/**
 * Count the tokens for multi-message chat completion requests
 */
export declare function getChatRequestTokenCount(messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[], model?: string): number;
/**
 * Count the tokens for a single message within a chat completion request
 *
 * See "Counting tokens for chat API calls"
 * from https://github.com/openai/openai-cookbook/blob/834181d5739740eb8380096dac7056c925578d9a/examples/How_to_count_tokens_with_tiktoken.ipynb
 */
export declare function getMessageTokenCount(message: OpenAI.Chat.Completions.ChatCompletionMessageParam, model?: string): number;
/**
 * Get the maximum number of tokens for a model's context.
 *
 * Includes tokens in both message and completion.
 */
export declare function getMaxTokenCount(model: string): number;
//# sourceMappingURL=tokenizer.d.ts.map