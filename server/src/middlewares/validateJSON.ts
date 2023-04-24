import { Request, Response, NextFunction } from "express";

// Middleware to validate JSON request body
function validateJSON(req: Request, res: Response, next: NextFunction) {
    try {
        // Check if request body is valid JSON
        JSON.parse(JSON.stringify(req.body));
        next();
    } catch (err) {
        // Return error response if JSON is invalid
        res.status(400).json({ message: 'Invalid JSON format' });
    }
}

export default validateJSON;