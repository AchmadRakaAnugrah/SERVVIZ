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
        const existingAdmin = await prisma.admin.findUnique({
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
        return res.status(500).json({ message: 'Internal server error' });
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
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const registerTechnicianAdminHandler = async (req: Request, res: Response) => {
    try {
        const { name, phone } = req.body;
        const newTechnician = await prisma.technician.create({
            data: { name, phone }
        })

        return res.status(201).json({ message: 'New technician created succesfully' });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export const getAllTechnicianDetails = async (req: Request, res: Response) => {
    try {
        const allTechnicianDetails = await prisma.technician.findMany({
            select: {
                id: true,
                name: true,
                phone: true
            }
        });

        // Rename id field to technician_id in each object
        const allTechnicianDetailsWithRenamedId = allTechnicianDetails.map((technician) => ({
            ...technician,
            technician_id: technician.id,
            id: undefined,
        }));

        return res.status(200).json(allTechnicianDetailsWithRenamedId);
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export const updateTechnicianAdminHandler = async (req: Request, res: Response) => {
    try {
        const { technician_id } = req.params;
        const { name, phone } = req.body;

        // Check that technician_id is a valid integer
        const parsedId = parseInt(technician_id);
        if (isNaN(parsedId)) {
            return res.status(400).json({ message: 'Bad request' });
        }

        const checkTechnician = await prisma.technician.findUnique({
            where: { id: parsedId },
            select: {
                id: true,
            }
        });

        if (!checkTechnician) {
            return res.status(404).json({ message: 'Not found' });
        }

        const updatedOrderDetail = await prisma.technician.update({
            where: { id: parsedId },
            data: {
                name,
                phone
            },
        });

        return res.status(200).json({ message: 'Success', technician_id: parsedId });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: 'Internal server error' });
    };
}