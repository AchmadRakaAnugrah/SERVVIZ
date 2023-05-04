import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const verifyOrderAndUsername = async (req: Request, res: Response, next: NextFunction) => {
    const { username, order_id } = req.params;
    // Check that order_id is a valid integer
    const parsedId = parseInt(order_id);
    if (isNaN(parsedId)) { return res.status(400).json({ message: 'Bad request' }); }

    const orderDetails = await prisma.orders.findUnique({
        where: { id: parsedId },
        select: {
            id: true,
            user_username: true,
        }
    });

    if (!orderDetails?.id) { return res.status(404).json({ message: 'Not found' }) }
    if (orderDetails?.user_username !== username) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    return next();
}