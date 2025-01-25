import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IUser } from '../interfaces';

export interface RequestExt extends Request {
    user?: IUser; 
}

const authMiddleware = (req: RequestExt, res: Response, next: NextFunction): void => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader?.startsWith('Bearer ')) {
            res.status(401).json({ message: 'Authorization token is required' });
            return;
        }

        const token = authHeader.split(' ')[1];
        const secretKey = process.env.JWT_SECRET as string;

        // Decode and cast the token payload to `IUser`
        const decoded = jwt.verify(token, secretKey) as IUser;

        req.user = decoded; 

        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid or expired token' });
    }
};

export default authMiddleware;
