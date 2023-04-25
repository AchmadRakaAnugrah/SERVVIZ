import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

//Register New Admin
export const registerAdminHandler = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        // check if the username or email already exist in the database
        const existingAdmin = await prisma.admin.findFirst({
            where: { username },
        });

        if (existingAdmin) {
            return res.status(409).json({ message: 'User already exists' });
        }

        // hash the password and create a new user in the database
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newAdmin = await prisma.admin.create({
            data: { username, password: hashedPassword },
        });

        // generate a new JWT token with a custom payload
        const jwtSecret = process.env.JWT_SECRET || 'default_secret';
        const token = jwt.sign({ id: username }, jwtSecret, { expiresIn: '1h' });

        return res.status(201).json({ token, message: 'New admin created succesfully' });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Login Admin with JWT auth
export const loginAdminHandler = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        // check if user with given email exists
        const admin = await prisma.admin.findUnique({ where: { username } });
        if (!admin) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // verify password
        const passwordMatch = await bcrypt.compare(password, admin.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // generate jwt token
        const jwtSecret = process.env.JWT_SECRET || 'default_secret';
        const token = jwt.sign({ id: admin.username }, jwtSecret, { expiresIn: '1h' });

        // return token as response
        return res.status(200).json({ token });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// GET all order list for admin
export const getAllOrdersAdminHandler = async (req: Request, res: Response) => {
    try {
        const ordersList = await prisma.orders.findMany({
            select: {
                user_username: true,
                service_type: true,
                order_status: true,
                admin_username: true
            }
        });
        return res.status(200).json(ordersList);
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: 'Internal server error' })
    }
};

// GET username list pagination or list all username
export const searchListUsernameHandler = async (req: Request, res: Response) => {
    try {
        const { limit, page } = req.query;
        const { username = '' } = req.params;
        const take = limit ? Math.min(Number(limit), 100) : 10;
        const skip = page ? (Number(page) - 1) * take : 0;
        const where = username ? {
            username: {
                contains: username,
            },
        } : {};
        const [users, totalCount] = await Promise.all([
            prisma.user.findMany({
                where,
                select: {
                    username: true,
                    name: true,
                },
                take,
                skip,
            }),
            prisma.user.count({
                where,
            }),
        ]);
        return res.status(200).json({ users, totalCount });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: 'Internal server error' })
    }
};