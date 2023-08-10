import express from 'express';
import auth from '../../middlewares/auth';
import Doctors from '../../controllers/doctor.controller';
import validate from '../../middlewares/validate';
import DoctorValidation from '../../validations/doctor.validation';

const router = express.Router();

router.get('/get-all-doctors-list', Doctors.getAllDoctors);
router.get('/get-all-service-list', Doctors.getAllService);

router.get('/profile', auth('doctor'), Doctors.getDoctorProfile);

router.post(
  '/profile/edit',
  auth('doctor'),
  validate(DoctorValidation.DoctorProfile),
  Doctors.editCreateDoctor
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
