import express from 'express';
import auth from '../../middlewares/auth';
import Doctors from '../../controllers/doctor.controller';
import validate from '../../middlewares/validate';
import DoctorValidation from '../../validations/doctor.validation';
import { imageUpload } from '../../config/multer';
import { userController } from '../../controllers';

const router = express.Router();

router.get('/get-all-doctors-list', Doctors.getAllDoctors);
router.get('/get-all-service-list', Doctors.getAllService);
router.get('/get-all-doctor-reviews', auth('doctor'), Doctors.getAllDoctorReviews);
router.get('/get-all-doctor-service-list', Doctors.getAllDoctorServiceListController);
router.get('/get-all-doctor-appointments', auth('doctor'), Doctors.getAllDoctorAppointments);

router.get('/profile', auth('doctor'), Doctors.getDoctorProfile);

router.post(
  '/profile/edit',
  auth('doctor'),
  validate(DoctorValidation.DoctorProfile),
  Doctors.editCreateDoctor
);
router.post('/service/search', validate(DoctorValidation.search), Doctors.search);
router.delete('/service/:service_id', auth('doctor'), Doctors.delete_service);

router.post('/change-appointment-status', auth('doctor'), Doctors.changeAppointmentStatus);
router.post(
  '/add-profile-photo',
  auth('doctor'),
  imageUpload.single('photo'),
  userController.addPhotoUrl
);
router.post(
  '/add-service',
  validate(DoctorValidation.DoctorService),
  auth('doctor'),
  Doctors.addDoctorServiceController
);
router.post(
  '/change-apoinment-status',
  validate(DoctorValidation.DoctorApoinmentStatusChange),
  auth('doctor'),
  Doctors.changeApoinmentStatusController
);
export default router;
