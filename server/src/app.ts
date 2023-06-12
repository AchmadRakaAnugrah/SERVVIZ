import express from "express";
import cors from "cors";
import helmet from "helmet";
import { PrismaClient } from "@prisma/client";
import authenticateToken from "./middlewares/auth";
import authenticateAdminToken from "./middlewares/authAdmin";
import validateJSON from "./middlewares/validateJSON";
import handleParsingError from "./middlewares/handleParsingError";

// Import user route
import { registerUserHandler, loginUserHandler, createOrderUserHandler, getAllOrdersUserHandler, getOrderDetailUserHandler, updateOrderDetailUserHandler, deleteOrderDetailUserHandler, createBlobsUserHandler, getBlobsListUserHandler, deleteBlobsUserHandler, getBlobsUserHandeler, changePasswordUserHandler } from "./routes/userRoute";
import { changePasswordAdminHandler, createOrderHistoryAdminHandler, createStoreAdminHandler, getAllOrdersAdminHandler, getAllStoreAdminHandler, getAllTechnicianDetails, loginAdminHandler, registerAdminHandler, registerTechnicianAdminHandler, searchListUsernameHandler, updateOrderDetailsAdminHandler, updateStoreAdminHandler, updateTechnicianAdminHandler } from "./routes/adminRoute";
import { rejectEmptyStringBody, rejectEmptyStringParams } from "./middlewares/rejectEmptyString";
import { usernameValidator } from "./middlewares/usernameValidator";
import { uploadBlobs } from "./middlewares/uploadBlobs";
import { verifyOrderAndUsername } from "./middlewares/verifyOrderAndUsername";

const prisma = new PrismaClient()
const app = express();
const PORT = process.env.PORT || 5000;

async function main() {
    app.use(express.json());
    app.use(helmet());
    app.use(cors());
    app.use(handleParsingError);

    // NORMAL USER
    app.post('/api/register', rejectEmptyStringBody, usernameValidator, registerUserHandler);
    app.post('/api/login', rejectEmptyStringParams, rejectEmptyStringBody, loginUserHandler);
    app.put('/api/change', rejectEmptyStringBody, rejectEmptyStringBody, changePasswordUserHandler);
    // ORDER ROUTE
    // Create order
    app.post('/api/orders/:username', authenticateToken, createOrderUserHandler);
    // Get all order of specific username
    app.get('/api/orders/:username', authenticateToken, rejectEmptyStringParams, getAllOrdersUserHandler);
    // Get order detail
    app.get('/api/orders/:username/:order_id', rejectEmptyStringParams, getOrderDetailUserHandler);
    // Update user order
    app.put('/api/orders/:username/:order_id', authenticateToken, rejectEmptyStringParams, rejectEmptyStringBody, updateOrderDetailUserHandler);
    // Delete order
    app.delete('/api/orders/:username/:order_id', authenticateToken, rejectEmptyStringParams, deleteOrderDetailUserHandler);
    // BLOB ROUTE
    // Get blob list image
    app.get('/api/orders/:username/:order_id/blobs', authenticateToken, rejectEmptyStringParams, getBlobsListUserHandler);
    //Get blob image
    app.get('/api/orders/:username/:order_id/blobs/:filename', authenticateToken, rejectEmptyStringParams, getBlobsUserHandeler)
    // Create blobs image
    app.post('/api/orders/:username/:order_id/blobs', authenticateToken, rejectEmptyStringParams, verifyOrderAndUsername, uploadBlobs.single('file'), createBlobsUserHandler);
    // Delete blobs image
    app.delete('/api/orders/:username/:order_id/blobs/:filename', authenticateToken, rejectEmptyStringParams, deleteBlobsUserHandler)

    // ADMIN USER
    // Register new admin
    app.post('/api/admin/register', rejectEmptyStringBody, usernameValidator, registerAdminHandler);
    // Login admin
    app.post('/api/admin/login', rejectEmptyStringBody, loginAdminHandler);
    app.put('/api/admin/change', rejectEmptyStringBody, rejectEmptyStringBody, changePasswordAdminHandler);
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
    app.get('/api/admin/store', authenticateAdminToken, getAllStoreAdminHandler);
    // OTW
    // app.delete('/api/admin/technician/:id')
    // app.delete('/api/admin/orders/:username/:orders_id')
    // Seems weird implementation of search, possible remove or modify
    app.get('/api/admin/search/username/:username', authenticateAdminToken, searchListUsernameHandler);

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}.`);
    });
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })