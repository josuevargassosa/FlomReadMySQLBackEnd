import multer from 'multer'
import path from 'path'
import { v4 as uuidv4 } from 'uuid';

// Settings
const storage = multer.diskStorage({
    // destination: 'uploads',
    filename: (req, file, cb) => {

        cb(null, uuidv4() + path.extname(file.originalname))
    }
});
export default multer({ storage, limits: { fieldSize: 25 * 1024 * 1024 } });

