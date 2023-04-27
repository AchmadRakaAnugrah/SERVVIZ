import { Request, Response, NextFunction } from 'express';
import { validationResult, body } from 'express-validator';

export const usernameValidator = (req: Request, res: Response, next: NextFunction) => {
  body('username')
    .isAlphanumeric()
    .run(req);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  return next();
};