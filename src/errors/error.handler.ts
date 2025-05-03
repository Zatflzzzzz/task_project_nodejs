// src/errors/error.handler.ts
import {NextFunction, Request, Response} from 'express';
import {CustomError} from './custom.error';

export function errorHandler(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {

    if (err instanceof CustomError) {
        return res.status(err.statusCode).json({
            error: {
                message: err.message,
                details: err.details,
            },
        });
    }

    res.status(500).json({
        error: {
            message: 'Internal Server Error',
        },
    });
}