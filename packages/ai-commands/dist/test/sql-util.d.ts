import { A_Const, A_Expr, ColumnRef, CreatePolicyStmt, Node } from 'libpg-query';
export type PolicyInfo = {
    name: string;
    relation: string;
    command?: string;
    roles: string[];
    usingNode?: Node;
    withCheckNode?: Node;
};
/**
 * Extracts keys from a union type.
 */
type ExtractKeys<T> = T extends T ? keyof T : never;
/**
 * Unwraps a Node to get its underlying value.
 */
type NodeValue<T extends Node, U extends ExtractKeys<Node>> = T extends Record<U, infer V> ? V : never;
export declare class AssertionError extends Error {
    constructor(message: string);
}
/**
 * Asserts that a value is defined.
 *
 * Useful for type narrowing.
 */
export declare function assertDefined<T>(value: T | undefined, errorMessage: string): asserts value is T;
/**
 * Asserts that a `Node` is a specific type.
 *
 * Useful for type narrowing.
 */
export declare function assertNodeType<T extends Node>(node: Node, type: ExtractKeys<T>, errorMessage: string): asserts node is T;
/**
 * Asserts that a `Node` is a specific type and
 * unwraps its underlying value.
 *
 * @returns The unwrapped `Node` value.
 * @throws If `node` is not of type `type`.
 */
export declare function assertAndUnwrapNode<T extends Node, U extends ExtractKeys<Node>>(node: Node, type: U, errorMessage: string): NodeValue<T, U>;
/**
 * Unwraps a `Node`'s underlying value.
 *
 * @returns The unwrapped `Node` value or `undefined` if
 * the node is not of type `type`.
 */
export declare function unwrapNode<T extends Node, U extends ExtractKeys<Node>>(node: Node, type: U): NodeValue<T, U> | undefined;
/**
 * Asserts that either the left or right side of the
 * expression is processed through `fn` without throwing
 * any errors.
 *
 * If both sides throw errors, the assertion fails and the
 * error from the left side will be thrown.
 */
export declare function assertEitherSideOfExpression<U>(expression: A_Expr, fn: (node: Node, side: 'left' | 'right') => U): U;
/**
 * Asserts that both sides of the expression are processed
 * without throwing any errors.
 *
 * Order doesn't matter. As long as `firstFn` and `secondFn`
 * pass separately on either side of the expression, the assertion
 * will pass. Otherwise if `firstFn` and `secondFn` both fail
 * after trying on both sides separately, the assertion will fail.
 */
export declare function assertEachSideOfExpression<U>(expression: A_Expr, firstFn: (node: Node) => void, secondFn: (node: Node) => void): void;
/**
 * Extracts all the `CREATE POLICY` statements
 * from a SQL string as parsed ASTs.
 */
export declare function getPolicies(sql: string): Promise<CreatePolicyStmt[]>;
/**
 * Parses a Postgres SQL policy.
 *
 * @returns Information about the policy, including its name, table, command, and expressions.
 */
export declare function getPolicyInfo(createPolicyStatement: CreatePolicyStmt): Promise<PolicyInfo>;
export declare function renderTargets<T>(targets: Node[], renderTarget: (node: Node) => T): T[];
export declare function renderColumn(column: ColumnRef): string;
export declare function assertAndRenderColumn(node: Node, errorMessage: string): string;
export declare function renderJsonExpression(expression: A_Expr): string;
export declare function renderFields(fields: Node[]): string;
export declare function parseConstant(constant: A_Const): string | number;
export {};
//# sourceMappingURL=sql-util.d.ts.map