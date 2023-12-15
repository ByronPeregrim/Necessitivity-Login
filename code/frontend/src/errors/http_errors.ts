class HttpError extends Error {
    constructor(message?: string) {
        super(message);
        this.name = this.constructor.name;
    }
}

/**
 * Status code: 400
 */
export class MissingParameters extends HttpError { }

/**
 * Status code: 401
 */
export class UnauthorizedError extends HttpError { }

/**
 * Status code: 409
 */
export class ConflictError extends HttpError { }

/**
 * Status code: 502
 */
export class BadGateway extends HttpError { }

