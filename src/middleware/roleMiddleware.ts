import { Response, NextFunction } from 'express';
import { RequestExt } from './authMiddleware';

const roleMiddleware = (...roles: string[]) => {
    return (req: RequestExt, res: Response, next: NextFunction): void => {
        try {
            if (!req.user) {
                res.status(403).json({ message: 'Access denied. User is not authenticated' });
                return;
            }

            const userRole = req.user.role; 

            if (!roles.includes(userRole)) {
                res.status(403).json({ message: 'Access denied. User does not have the required role' });
                return;
            }

            next(); 
        } catch (error) {
            res.status(500).json({ message: 'Internal server error while checking role' });
        }
    };
};

export default roleMiddleware;