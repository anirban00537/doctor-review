import express from 'express';
import auth from '../../middlewares/auth';

import { userController } from '../../controllers';
import { imageUpload } from '../../config/multer';
import { userValidation } from '../../validations';
import validate from '../../middlewares/validate';

const router = express.Router();

router.get('/profile', auth(), userController.getUserProfile);
router.get('/get-all-users', auth(), userController.getAllUsers);
router.post('/add-profile-photo', auth(), imageUpload.single('photo'), userController.addPhotoUrl);
router.post(
  '/profile/edit',

  validate(userValidation.updateUser),
  userController.editUser
);
router.post(
  '/add-patient-history',
  auth(),
  validate(userValidation.addPatientHistorySchema),
  userController.addPatientHistory
);
router.get('/service-details/:serviceId', userController.getServiceById);
router.delete('/delete/:userId', userController.deleteUserbyId);

// doctorsServiceId;
router.get('/get-user-apoinments', auth(), userController.getUserApoinments);
router.get('/get-user-medical-history', auth(), userController.getUserMedicalHistory);
router.post(
  '/add-apoinment',
  validate(userValidation.addApoinment),
  auth(),
  userController.createAppointment
);
router.post('/add-review', validate(userValidation.addReview), auth(), userController.addReview);

export default router;
