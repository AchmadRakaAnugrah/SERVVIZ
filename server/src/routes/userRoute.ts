import { Request, Response, NextFunction } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import _ from "lodash";
import * as fs from 'fs';

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

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email' });
        }

        const phoneRegex = /^(0|\+62)[0-9]{1,20}$/;
        if (!phoneRegex.test(phone)) {
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

export const changePasswordUserHandler = async (req: Request, res: Response) => {
    const { oldPassword, newPassword } = req.body;
    const { username } = req.params;
    // assuming that the authenticated user's ID is available in the request object

    try {
        // check if user with given ID exists
        const user = await prisma.user.findUnique({ where: { username } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // verify old password
        const passwordMatch = await bcrypt.compare(oldPassword, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // update password in the database
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await prisma.user.update({
            where: { username },
            data: { password: hashedPassword },
        });

        // generate new jwt token with updated credentials
        const jwtSecret = process.env.JWT_SECRET || 'default_secret';
        const token = jwt.sign({
            id: user.username,
            password: hashedPassword
        },
            jwtSecret, { expiresIn: '1h' }
        );

        // return token as response
        return res.status(200).json({ token });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

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

    try {
        const fields = await prisma.admin.findMany({
            select: {
                username: true,
            },
        });

        const randomField = fields[Math.floor(Math.random() * fields.length)];

        const newOrder = await prisma.$transaction(async (prisma) => {
            // Create the new order
            const createdOrder = await prisma.orders.create({
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
                    admin_username: randomField.username,
                },
            });

            // Fetch the last created order
            const lastCreatedOrder = await prisma.orders.findFirst({
                orderBy: { id: "desc" },
            });

            return lastCreatedOrder;
        });

        return res
            .status(201)
            .json({ message: 'New order created successfully', order: newOrder!.id });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: 'Internal server error' });
    } finally {
        await prisma.$disconnect();
    }
};

export const getAllOrdersUserHandler = async (req: Request, res: Response) => {
    try {
        const { username } = req.params
        const checkUsername = await prisma.user.findUnique({
            where: { username }
        })
        if (!checkUsername) {
            return res.status(404).json({ message: 'User not found' })
        }
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
                admin_username: true,
                total_price: true,
            }
        });

        if (!orderDetails?.id) {
            return res.status(404).json({ message: 'Not found' });
        }
        if (orderDetails?.user_username != username) {
            return res.status(404).json({ message: 'Not found' });
        }

        const name = await prisma.user.findUnique({
            where: { username },
            select: { name: true },
        })

        const orderDetailsWithName = {
            ...orderDetails,
            name: name?.name || null,
        };

        return res.status(200).json(orderDetailsWithName);
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
                user_username: true,
                datetime: true,
            }
        });

        if (!orderDetails?.id) {
            return res.status(404).json({ message: 'Not found' });
        }
        if (orderDetails?.user_username !== username) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        // Check if the order is more than 30 minutes old
        const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
        if (orderDetails.datetime < thirtyMinutesAgo) {
            return res.status(403).json({ message: 'Cannot edit orders that are more than 30 minutes old' });
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
                datetime: true,
                order_status: true,
            }
        })

        if (!orderDetails?.id) {
            return res.status(404).json({ message: 'Not found' });
        }
        if (orderDetails?.user_username !== username) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        if (orderDetails.order_status === 'Selesai') {
            // Delete the order_history records
            await prisma.orders_History.deleteMany({
                where: { order_id: parsedId }
            })

            // Delete the order
            await prisma.orders.delete({ where: { id: parsedId } })

            return res.status(204).json({ message: 'Success', order_id: parsedId });
        }

        // Check if the order is more than 30 minutes old and not finished
        const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
        if (orderDetails.datetime < thirtyMinutesAgo) {
            return res.status(403).json({
                message: 'Cannot delete orders that are more than 30 minutes old'
            });
        }

        return res.status(204).json({ message: 'Success', order_id: parsedId });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: 'Internal server error' });
    }
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
        })

        if (!orderDetails?.id) {
            return res.status(404).json({ message: 'Not found' });
        }
        if (orderDetails?.user_username !== username) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const newBlob = await prisma.blobs.create({
            data: {
                id: parsedId,
                filename,
            }
        });
        return res.status(201).json({ message: 'New blob created succefully' });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export const getBlobsListUserHandler = async (req: Request, res: Response) => {
    try {
        const parsedId = parseInt(req.params.order_id);
        const blobsList = await prisma.blobs.findMany({
            where: { id: parsedId },
            select: { filename: true }
        })

        if (!blobsList) { return res.status(404).json({ message: "Not found" }) };
        return res.status(200).json(blobsList);
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export const deleteBlobsUserHandler = async (req: Request, res: Response) => {
    try {
        const filename = req.params.filename;
        const targetBlobs = await prisma.blobs.findUnique({ where: { filename } })

        if (!targetBlobs) { return res.status(404).json({ message: 'Blobs not found' }) }

        const imagePath = `../blobs/${filename}`;
        fs.unlink(imagePath, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Internal server error' });
            }
            return res.status(200).json({ message: 'Blobs deleted successfully' });
        })
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export const getBlobsUserHandeler = async (req: Request, res: Response) => {
    try {
        const filename = req.params.filename;
        const checkExistInDb = await prisma.blobs.findUnique({
            where: { filename },
            select: { filename: true }
        })

        if (!checkExistInDb) {
            return res.status(404).json({ message: 'Blobs not found' });
        }

        const filePath = `../blobs/${checkExistInDb.filename}`;

        res.status(200).sendFile(filePath);
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: 'Internal server error' });
    }
}