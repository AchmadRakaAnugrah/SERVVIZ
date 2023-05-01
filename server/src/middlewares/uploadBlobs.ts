import multer from 'multer';
import path from 'path';

// Configure multer middleware to handle file uploads
const storage = multer.diskStorage({
    destination: (req, file, callback) => { callback(null, '../blobs'); },
    filename: (req, file, callback) => {
        const orderId = req.params.order_id;
        const extension = path.extname(file.originalname);
        const filename = `${Date.now()}_${orderId}${extension}`;
        callback(null, filename);
    }
});

export const uploadBlobs = multer({ storage })