import express from "express";
import cors from "cors";
import helmet from "helmet";
import { PrismaClient } from "@prisma/client";
import authenticateToken from "./middlewares/auth";
import authenticateAdminToken from "./middlewares/authAdmin";
import validateJSON from "./middlewares/validateJSON";
import handleParsingError from "./middlewares/handleParsingError";

// Import user route
import { registerUserHandler, loginUserHandler, newOrderUserHandler, getAllOrdersUserHandler, getOrderDetailUserHandler, updateOrderDetailUserHandler, deleteOrderDetailUserHandler } from "./routes/userRoute";
import { getAllOrdersAdminHandler, loginAdminHandler, registerAdminHandler, searchListUsernameHandler } from "./routes/adminRoute";
import { rejectEmptyStringBody, rejectEmptyStringParams } from "./middlewares/rejectEmptyString";

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
app.post('/api/register', rejectEmptyStringBody, registerUserHandler);
app.post('/api/login', rejectEmptyStringBody, loginUserHandler);
app.post('/api/orders', authenticateToken, newOrderUserHandler);
app.get('/api/orders/:username', authenticateToken, rejectEmptyStringParams, getAllOrdersUserHandler);
app.get('/api/orders/:username/:orders_id', authenticateToken, rejectEmptyStringParams, getOrderDetailUserHandler);
app.put('/api/orders/:username/:orders_id', authenticateToken, rejectEmptyStringParams, rejectEmptyStringBody, updateOrderDetailUserHandler);
app.delete('/api/orders/:username/:orders_id', authenticateAdminToken, rejectEmptyStringParams, deleteOrderDetailUserHandler);

// Admin user router
app.post('/api/admin/register', rejectEmptyStringBody, registerAdminHandler);
app.post('/api/admin/login', rejectEmptyStringBody, loginAdminHandler);
app.get('/api/admin/orders', authenticateAdminToken, getAllOrdersAdminHandler);
app.get('/api/admin/search/username/:username', authenticateAdminToken, searchListUsernameHandler);
app.post('/api/admin/technician', authenticateAdminToken, rejectEmptyStringBody, registerAdminHandler);
// OTW
// app.put('/api/admin/technician/:id')
// app.put('/api/admin/orders/:username/:orders_id')
// app.delete('/api/admin/technician/:id')
// app.delete('/api/admin/orders/:username/:orders_id')

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

process.on("SIGINT", async () => {
    await prisma.$disconnect();
    process.exit(0);
});