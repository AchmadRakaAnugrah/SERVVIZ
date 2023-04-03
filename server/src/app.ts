import express from 'express';
import authenticateToken from "./auth";
import { PrismaClient } from "@prisma/client";

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

app.get("/users", authenticateToken, async (req, res) => {
    const users = await prisma.user.findMany();
    res.json(users);
});

app.get("/users/:id", async (req, res) => {
    const user = await prisma.user.findUnique({
        where: {
            id: parseInt(req.params.id),
        },
    });
    res.json(user);
});

app.post("/users", async (req, res) => {
    const { name, email } = req.body;
    const user = await prisma.user.create({
        data: {
            name,
            email,
        },
    });
    res.json(user);
});

app.put("/users/:id", async (req, res) => {
    const { name, email } = req.body;
    const user = await prisma.user.update({
        where: {
            id: parseInt(req.params.id),
        },
        data: {
            name,
            email,
        },
    });
    res.json(user);
});

app.delete("/users/:id", async (req, res) => {
    const user = await prisma.user.delete({
        where: {
            id: parseInt(req.params.id),
        },
    });
    res.json(user);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

process.on("SIGINT", async () => {
    await prisma.$disconnect();
    process.exit(0);
});