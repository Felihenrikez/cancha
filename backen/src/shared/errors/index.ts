// src/shared/errors/index.ts
export class NotFoundError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'NotFoundError';
    }
}

export class InvalidDataError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'InvalidDataError';
    }
}