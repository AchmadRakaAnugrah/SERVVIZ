// import required modules
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

// define middleware function to verify token
const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.sendStatus(401);
  }

  const jwtSecret = process.env.JWT_SECRET || "default_secret";

  jwt.verify(token, jwtSecret, (err: jwt.VerifyErrors | null, user: any) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token expired" });
      } else {
        return res.sendStatus(403).json({ message: "Forbidden" });
      }
    }

    interface UserRequest extends Request {
      user: any;
    }

    (req as UserRequest).user = user;
    next();
  });
};

// export middleware function
export default authenticateToken;
