import express from "express";
import cors from "cors";
import helmet from "helmet";
import { PrismaClient } from "@prisma/client";
import authenticateToken from "./middlewares/auth";
import authenticateAdminToken from "./middlewares/authAdmin";
import validateJSON from "./middlewares/validateJSON";
import handleParsingError from "./middlewares/handleParsingError";
import rejectEmptyString from "./middlewares/rejectEmptyString";

// Import user route
import { registerUserHandler, loginUserHandler, newOrderUserHandler } from "./routes/userRoute";
import { getAllOrdersAdminHandler, loginAdminHandler, registerAdminHandler, searchListUsernameHandler } from "./routes/adminRoute";

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
app.use(handleParsingError);

// Normal user router
app.post('/api/register', rejectEmptyString, registerUserHandler);
app.post('/api/login', rejectEmptyString, loginUserHandler);
app.post('/api/orders', authenticateToken, newOrderUserHandler);
app.get('/api/orders')

// Admin user router
app.post('/api/admin/register', rejectEmptyString, registerAdminHandler);
app.post('/api/admin/login', rejectEmptyString, loginAdminHandler);
app.get('/api/admin/orders', authenticateAdminToken, getAllOrdersAdminHandler);
app.get('/api/admin/search/username/:username', authenticateAdminToken, searchListUsernameHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

process.on("SIGINT", async () => {
    await prisma.$disconnect();
    process.exit(0);
});