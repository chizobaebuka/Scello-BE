import rateLimit from 'express-rate-limit';

const apiLimiter = rateLimit({
    windowMs: 30 * 60 * 1000, 
    max: 100, 
    message: 'Too many requests from this IP, please try again later.',
});

export default apiLimiter;