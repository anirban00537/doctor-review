import express from 'express';
import auth from '../../middlewares/auth';

import { userController } from '../../controllers';
import { imageUpload } from '../../config/multer';
import { userValidation } from '../../validations';
import validate from '../../middlewares/validate';

const router = express.Router();

router.get('/profile', auth(), userController.getUserProfile);
router.post(
  '/add-profile-photo',
  auth('user'),
  imageUpload.single('photo'),
  userController.addPhotoUrl
);
router.post(
  '/profile/edit/:userId',
  auth(),
  validate(userValidation.updateUser),
  userController.editUser
);
// doctorsServiceId;
router.get('/get-user-apoinments', auth(), userController.getUserApoinments);
router.post(
  '/add-apoinment',
  validate(userValidation.addApoinment),
  auth(),
  userController.createAppointment
);

export default router;
