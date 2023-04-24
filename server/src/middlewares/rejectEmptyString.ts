import express from 'express';
import * as _ from 'lodash';

const app = express();

// Middleware that checks for empty strings in the request body
const rejectEmptyString = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const hasEmptyString = _.some(req.body, (value) => value === '');
    if (hasEmptyString) {
        return res.status(400).json({ message: 'Request body cannot contain empty strings' });
    }
    next();
};

export default rejectEmptyString;