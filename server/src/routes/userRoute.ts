import { Request, Response, NextFunction } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import _ from "lodash";
import multer from "multer";
import path from "path";
import fs from "fs";

const prisma = new PrismaClient();

//Register New User
export const registerUserHandler = async (req: Request, res: Response) => {
    const { email, name, username, phone, password } = req.body;

    try {
        // check if the username or email already exist in the database
        const existingUser = await prisma.user.findFirst({
            where: { OR: [{ email }, { username }] },
        });

        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }

        const pattern = /^(0|\+62)[0-9]{1,20}$/;
        if (!pattern.test(phone)) {
            return res.status(400).json({ message: 'Invalid phone number' });
        }

        // hash the password and create a new user in the database
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = await prisma.user.create({
            data: { email, name, username, phone, password: hashedPassword },
        });

        // generate a new JWT token with a custom payload
        const jwtSecret = process.env.JWT_SECRET || 'default_secret';
        const token = jwt.sign({ id: username }, jwtSecret, { expiresIn: '1h' });

        return res.status(201).json({ token, message: 'New user created succesfully' });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Login user with JWT auth
export const loginUserHandler = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        // check if user with given email exists
        const user = await prisma.user.findUnique({ where: { username } });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // verify password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // generate jwt token
        const jwtSecret = process.env.JWT_SECRET || 'default_secret';
        const token = jwt.sign({ id: user.username }, jwtSecret, { expiresIn: '1h' });

        // return token as response
        return res.status(200).json({ token });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Create new order
export const createOrderUserHandler = async (req: Request, res: Response) => {
    const { username } = req.params;
    const {
        service_type,
        pickup_address,
        dropoff_address_id,
        device,
        device_brand,
        problem_type,
        problem_desc
    } = _.mapValues(req.body, (value) => (value === '' ? null : value));
    const order_status = "Submitted";
    // Get the total number of records in the table
    const count = await prisma.admin.count()
    // Generate a random index within the total number of records
    const randomIndex = Math.floor(Math.random() * count)
    // Select a single record at the random index
    const randomAdmin = await prisma.admin.findMany({ take: 1, skip: randomIndex })
    const choosedAdmin = randomAdmin[0].username;

    try {
        const newOrders = await prisma.orders.create({
            data: {
                user_username: username,
                service_type,
                pickup_address,
                dropoff_address_id,
                device,
                device_brand,
                problem_type,
                problem_desc,
                order_status,
                admin_username: choosedAdmin
            },
        });
        return res.status(201).json({ message: 'New order created succesfully' });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: 'Internal server error' });
    };
};

export const getAllOrdersUserHandler = async (req: Request, res: Response) => {
    try {
        const { username } = req.params
        const ordersList = await prisma.orders.findMany({
            where: {
                user: {
                    username: username,
                },
            },
            select: {
                id: true,
                datetime: true,
                order_status: true,
            },
        });
        return res.status(200).json(ordersList);
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: 'Internal server error' });
    };
}

export const getOrderDetailUserHandler = async (req: Request, res: Response) => {
    try {
        const { username, order_id } = req.params;

        // Check that order_id is a valid integer
        const parsedId = parseInt(order_id);
        if (isNaN(parsedId)) {
            return res.status(400).json({ message: 'Bad request' });
        }

        const orderDetails = await prisma.orders.findUnique({
            where: { id: parsedId },
            select: {
                id: true,
                user_username: true,
                unique_code: true,
                service_type: true,
                pickup_address: true,
                dropoff_address_id: true,
                device: true,
                device_brand: true,
                problem_type: true,
                problem_desc: true,
                datetime: true,
                order_status: true,
                admin_username: true
            }
        });

        if (!orderDetails?.id) {
            return res.status(404).json({ message: 'Not found' });
        }
        if (orderDetails?.user_username != username) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        return res.status(200).json(orderDetails);
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: 'Internal server error' });
    };
}

export const updateOrderDetailUserHandler = async (req: Request, res: Response) => {
    try {
        const { username, order_id } = req.params;
        const {
            service_type,
            pickup_address,
            dropoff_address_id,
            device,
            device_brand,
            problem_type,
            problem_desc,
            order_status,
        } = req.body;

        // Check that order_id is a valid integer
        const parsedId = parseInt(order_id);
        if (isNaN(parsedId)) {
            return res.status(400).json({ message: 'Bad request' });
        }

        const orderDetails = await prisma.orders.findUnique({
            where: { id: parsedId },
            select: {
                id: true,
                user_username: true
            }
        });

        if (!orderDetails?.id) {
            return res.status(404).json({ message: 'Not found' });
        }
        if (orderDetails?.user_username !== username) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const updatedOrderDetail = await prisma.orders.update({
            where: { id: parsedId },
            data: {
                service_type,
                pickup_address,
                dropoff_address_id,
                device,
                device_brand,
                problem_type,
                problem_desc,
                order_status,
            },
        });

        return res.status(200).json({ message: 'Success', order_id: parsedId });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: 'Internal server error' });
    };
}

// DELETE order
export const deleteOrderDetailUserHandler = async (req: Request, res: Response) => {
    try {
        const { username, order_id } = req.params;

        // Check that order_id is a valid integer
        const parsedId = parseInt(order_id);
        if (isNaN(parsedId)) {
            return res.status(400).json({ message: 'Bad request' });
        }

        const orderDetails = await prisma.orders.findUnique({
            where: { id: parsedId },
            select: {
                id: true,
                user_username: true,
            }
        });

        if (!orderDetails?.id) {
            return res.status(404).json({ message: 'Not found' });
        }
        if (orderDetails?.user_username !== username) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Delete the order_history records
        await prisma.orders_History.deleteMany({
            where: { order_id: parsedId }
        })

        // Delete the order
        await prisma.orders.delete({
            where: { id: parsedId }
        })

        return res.status(204).json({ message: 'Success', order_id: parsedId });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: 'Internal server error' });
    };
}

export const createBlobsUserHandler = async (req: Request, res: Response) => {
    try {
        const { username, order_id } = req.params;
        if (!req.file) { return res.status(400).json({ message: 'No file uploaded' }); }
        const filename = req.file.filename;

        // Check that order_id is a valid integer
        const parsedId = parseInt(order_id);
        if (isNaN(parsedId)) {
            return res.status(400).json({ message: 'Bad request' });
        }

        const orderDetails = await prisma.orders.findUnique({
            where: { id: parsedId },
            select: {
                id: true,
                user_username: true,
            }
        });

        if (!orderDetails?.id) {
            return res.status(404).json({ message: 'Not found' });
        }
        if (orderDetails?.user_username !== username) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const newBlob = await prisma.blobs.create({
            data: {
                id: parsedId,
                filename
            }
        });
        return res.status(201).json({ message: 'New blob created succefully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error uploading file' });
    }
}