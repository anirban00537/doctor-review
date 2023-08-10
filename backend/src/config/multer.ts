import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueName = uuidv4();
    const originalName = file.originalname;
    const fileExtension = originalName.split('.').pop();
    const uniqueFilename = `${uniqueName}.${fileExtension}`;
    cb(null, uniqueFilename);
  }
});

const imageUpload = multer({ storage: storage });

export { imageUpload };
