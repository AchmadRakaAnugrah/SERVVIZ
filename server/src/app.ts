import express from "express";
import cors from "cors";
import helmet from "helmet";
import { PrismaClient } from "@prisma/client";
import authenticateToken from "./middlewares/auth";
import authenticateAdminToken from "./middlewares/authAdmin";
import validateJSON from "./middlewares/validateJSON";
import handleParsingError from "./middlewares/handleParsingError";

// Import user route
import { registerUserHandler, loginUserHandler, createOrderUserHandler, getAllOrdersUserHandler, getOrderDetailUserHandler, updateOrderDetailUserHandler, deleteOrderDetailUserHandler } from "./routes/userRoute";
import { createOrderHistoryAdminHandler, createStoreAdminHandler, getAllOrdersAdminHandler, getAllTechnicianDetails, loginAdminHandler, registerAdminHandler, registerTechnicianAdminHandler, searchListUsernameHandler, updateOrderDetailsAdminHandler, updateStoreAdminHandler, updateTechnicianAdminHandler } from "./routes/adminRoute";
import { rejectEmptyStringBody, rejectEmptyStringParams } from "./middlewares/rejectEmptyString";
import { usernameValidator } from "./middlewares/usernameValidator";

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

// NORMAL USER
app.post('/api/register', rejectEmptyStringBody, usernameValidator, registerUserHandler);
app.post('/api/login', rejectEmptyStringBody, loginUserHandler);
// ORDER ROUTE
// Create order
app.post('/api/orders/:username', authenticateToken, createOrderUserHandler);
// Get all order of specific username
app.get('/api/orders/:username', authenticateToken, rejectEmptyStringParams, getAllOrdersUserHandler);
// Get order detail
app.get('/api/orders/:username/:orders_id', authenticateToken, rejectEmptyStringParams, getOrderDetailUserHandler);
// Update user order
app.put('/api/orders/:username/:orders_id', authenticateToken, rejectEmptyStringParams, rejectEmptyStringBody, updateOrderDetailUserHandler);
// Delete order
app.delete('/api/orders/:username/:orders_id', authenticateAdminToken, rejectEmptyStringParams, deleteOrderDetailUserHandler);

// ADMIN USER
// Register new admin
app.post('/api/admin/register', rejectEmptyStringBody, usernameValidator, registerAdminHandler);
// Login admin
app.post('/api/admin/login', rejectEmptyStringBody, loginAdminHandler);
// ORDER ROUTE
// Get all order list
app.get('/api/admin/orders', authenticateAdminToken, getAllOrdersAdminHandler);
// Update order details
app.put('/api/admin/orders/:username/:order_id', authenticateAdminToken, rejectEmptyStringParams, rejectEmptyStringBody, updateOrderDetailsAdminHandler);
// ORDER HISTORY ROUTE
// Create order history
app.post('/api/admin/orders/:username/:order_id/history', authenticateAdminToken, createOrderHistoryAdminHandler)
// TECHNICIAN ROUTE
// Get all technician details
app.get('/api/admin/technician', authenticateAdminToken, getAllTechnicianDetails);
// Register technician
app.post('/api/admin/technician', authenticateAdminToken, rejectEmptyStringBody, registerTechnicianAdminHandler);
// Get all technician list and details
app.get('/api/admin/technician', authenticateAdminToken, getAllTechnicianDetails);
// Update specific technician details
app.put('/api/admin/technician/:technician_id', authenticateAdminToken, rejectEmptyStringParams, rejectEmptyStringBody, updateTechnicianAdminHandler);
// STORE ROUTE
// Create store
app.post('/api/admin/store', authenticateAdminToken, rejectEmptyStringBody, createStoreAdminHandler);
// Update Store
app.put('/api/admin/store/:store_id', authenticateAdminToken, rejectEmptyStringBody, updateStoreAdminHandler);
// OTW
// app.delete('/api/admin/technician/:id')
// app.delete('/api/admin/orders/:username/:orders_id')
// Seems weird implementation of search, possible remove or modify
app.get('/api/admin/search/username/:username', authenticateAdminToken, searchListUsernameHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

process.on("SIGINT", async () => {
    await prisma.$disconnect();
    process.exit(0);
});