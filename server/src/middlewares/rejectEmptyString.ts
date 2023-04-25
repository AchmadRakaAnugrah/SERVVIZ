import express from 'express';
import _ from 'lodash';

// Middleware that checks for empty strings in the request body
export const rejectEmptyStringBody = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const hasEmptyString = _.some(req.body, (value) => value === '');
    if (hasEmptyString) {
        return res.status(400).json({ message: 'Request body cannot contain empty strings' });
    }
    next();
};

// Middleware that checks for empty strings in the request params
export const rejectEmptyStringParams = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const hasEmptyString = _.some(req.params, (value) => value === '');
    if (hasEmptyString) {
        return res.status(400).json({ message: 'Request params cannot contain empty strings' });
    }
    next();
};