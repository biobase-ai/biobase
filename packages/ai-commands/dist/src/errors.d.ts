export declare class ApplicationError extends Error {
    data: Record<string, any>;
    constructor(message: string, data?: Record<string, any>);
}
export declare class ContextLengthError extends ApplicationError {
    constructor();
}
export declare class EmptyResponseError extends ApplicationError {
    constructor();
}
export declare class EmptySqlError extends ApplicationError {
    constructor();
}
export declare class UserError extends ApplicationError {
}
//# sourceMappingURL=errors.d.ts.map