import { Request, Response, NextFunction } from "express";

function handleParsingError(err: any, req: Request, res: Response, next: NextFunction) {
    if (err instanceof SyntaxError) {
        return res.status(400).json({ message: 'Invalid JSON format' });
    } else {
        next();
    }
}

export default handleParsingError;