import fs from 'fs';
import express from 'express';
import { errorResponse } from '../../utils/common';
const router = express.Router();

router.get('/:image_name', (req, res) => {
  const imageName = req.params?.image_name;

  if (!imageName) {
    return errorResponse(res, 'Image name is missing.', []);
  }
  const imagePath = `./uploads/${imageName}`;

  fs.readFile(imagePath, (err, data) => {
    if (err) {
      return res.status(404).send('Image not found.');
    }

    const imageExtension = imageName.split('.').pop()?.toLowerCase();
    let contentType = 'image/jpeg'; // Default to JPEG
    if (imageExtension === 'png') {
      contentType = 'image/png';
    } else if (imageExtension === 'gif') {
      contentType = 'image/gif';
    }
    res.setHeader('Content-Type', contentType);
    res.send(data);
  });
});
export default router;
