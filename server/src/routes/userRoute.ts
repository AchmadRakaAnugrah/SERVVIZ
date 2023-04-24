import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import _ from "lodash";

const prisma = new PrismaClient();

//Register New User
export const registerUserHandler = async (req: Request, res: Response) => {
    const { email, username, phone, password, name } = req.body;

    try {
        // check if the username or email already exist in the database
        const existingUser = await prisma.user.findFirst({
            where: { OR: [{ email }, { username }] },
        });

        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }

        // hash the password and create a new user in the database
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = await prisma.user.create({
            data: { email, username, phone, password: hashedPassword, name },
        });

        // generate a new JWT token with a custom payload
        const jwtSecret = process.env.JWT_SECRET || 'default_secret';
        const token = jwt.sign({ id: username }, jwtSecret, { expiresIn: '1h' });

        res.status(201).json({ token, message: 'New user created succesfully' });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Internal server error' });
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
        res.status(200).json({ token });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Create new order
export const newOrderUserHandler = async (req: Request, res: Response) => {
    const {
        user_username,
        service_type,
        pickup_address,
        dropoff_address_id,
        device,
        device_brand,
        problem_type,
        problem_desc,
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
                user_username,
                service_type,
                pickup_address,
                dropoff_address_id,
                device,
                device_brand,
                problem_type,
                problem_desc,
                order_status,
                admin_username: choosedAdmin,
            },
        });
        res.status(201).json({ message: 'New order created succesfully' });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Internal server error' })
    };
};