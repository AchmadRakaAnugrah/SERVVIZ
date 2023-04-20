import express from "express";
import cors from "cors";
import helmet from "helmet";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import * as _ from 'lodash';
import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import authenticateToken from "./auth";
import authenticateAdminToken from "./authAdmin";
import validateJSON from "./validateJSON";
import handleParsingError from "./handleParsingError";
import rejectEmptyString from "./rejectEmptyString";

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 5000;

try {
    prisma.$connect();
    console.log("Database connected!");
} catch (e) {
    console.error("Failed to connect to database:", e);
    process.exit(1);
}

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(handleParsingError)

//Register New User
app.post('/api/register', rejectEmptyString, async (req: Request, res: Response) => {
    const { email, username, phone, password } = req.body;

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
            data: { email, username, phone, password: hashedPassword },
        });

        // generate a new JWT token with a custom payload
        const jwtSecret = process.env.JWT_SECRET || 'default_secret';
        const token = jwt.sign({ id: username }, jwtSecret, { expiresIn: '1h' });

        res.status(201).json({ token, message: 'New user created succesfully' });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Login with JWT auth
app.post('/api/login', rejectEmptyString, async (req: Request, res: Response) => {
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
});

//Register New Admin
app.post('/api/admin/register', rejectEmptyString, async (req: Request, res: Response) => {
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

        res.status(201).json({ token, message: 'New admin created succesfully' });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Login Admin with JWT auth
app.post('/api/admin/login', rejectEmptyString, async (req: Request, res: Response) => {
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
        res.status(200).json({ token });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Create new order
app.post("/api/orders", authenticateAdminToken, async (req: Request, res: Response) => {
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
});

// GET all order list for admin
app.get("/api/admin/orders", authenticateAdminToken, async (req: Request, res: Response) => {
    try {
        const ordersList = await prisma.orders.findMany({
            select: {
                user_username: true,
                service_type: true,
                order_status: true,
                admin_username: true
            }
        });
        res.status(200).json(ordersList);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Internal server error' })
    }
});


// app.get("/users/:id", async (req, res) => {
//     const user = await prisma.user.findUnique({
//         where: {
//             id: parseInt(req.params.id),
//         },
//     });
//     res.json(user);
// });

// app.post("/users", async (req, res) => {
//     const { name, email } = req.body;
//     const user = await prisma.user.create({
//         data: {
//             name,
//             email,
//         },
//     });
//     res.json(user);
// });

// app.put("/users/:id", async (req, res) => {
//     const { name, email } = req.body;
//     const user = await prisma.user.update({
//         where: {
//             id: parseInt(req.params.id),
//         },
//         data: {
//             name,
//             email,
//         },
//     });
//     res.json(user);
// });

// app.delete("/users/:id", async (req, res) => {
//     const user = await prisma.user.delete({
//         where: {
//             id: parseInt(req.params.id),
//         },
//     });
//     res.json(user);
// });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

process.on("SIGINT", async () => {
    await prisma.$disconnect();
    process.exit(0);
});