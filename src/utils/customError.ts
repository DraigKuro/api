export type ErrorSource = "controller" | "service";

export class CustomError extends Error {
    constructor(
        public statusCode: number,
        message: string,
        public source: ErrorSource
    ) {
        super(message);
        Object.setPrototypeOf(this, CustomError.prototype);
    }
}
