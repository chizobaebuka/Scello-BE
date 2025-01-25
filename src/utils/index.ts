import { Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';

// Error handling middleware
export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error('Error:', err.message || err);

    const statusCode = err.status || 500;
    const message = err.message || 'Internal Server Error';

    res.status(statusCode).json({
        status: 'error',
        message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
};

export const apiLimiter = rateLimit({
    windowMs: 30 * 60 * 1000, 
    max: 100, 
    message: 'Too many requests from this IP, please try again later.',
});