import express from "express";
import cors from "cors";
import helmet from "helmet";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import authenticateToken from "./auth";
import validateJSON from "./validateJSON";
import handleParsingError from "./handleParsingError";

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
app.post('/api/register', async (req: Request, res: Response) => {
    try {
        const { email, username, phone, password } = req.body;

        // check if the username or email already exist in the database
        const existingUser = await prisma.user.findFirst({
            where: { OR: [{ email }, { username }] },
        });

        if (existingUser) {
            return res.status(409).json({ error: 'User already exists' });
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

        res.status(201).json({ token });
    } catch (error) {
        console.error(error);
        res.sendStatus(500).json({ message: 'Internal server error' });
    }
});

// Login with JWT auth
app.post('/api/login', async (req: Request, res: Response) => {
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
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// app.get("/users", authenticateToken, async (req, res) => {
//     const users = await prisma.user.findMany();
//     res.json(users);
// });


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