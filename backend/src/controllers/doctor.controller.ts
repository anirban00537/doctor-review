import { Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import { DoctorProfile, DoctorsService, Prisma } from '@prisma/client';
import {
  changeApoinmentStatus,
  createDoctorService,
  createUpdateDoctorProfile,
  getAllDoctorsList,
  getAllServiceList,
  getDoctorProfileById
} from '../services/doctors.service';
import { errorResponse, processException, separateToken, successResponse } from '../utils/common';
import { tokenService } from '../services';

const editCreateDoctor = catchAsync(async (req: Request, res: Response) => {
  try {
    const { doctor_id } = req.body;
    const doctorsProfileData: DoctorProfile = req.body;
    const Doctor = await getDoctorProfileById(doctor_id);
    if (!Doctor) {
      return errorResponse(res, 'Invalid doctor id!', null);
    }
    const updatedDoctorProfile = await createUpdateDoctorProfile(doctorsProfileData, doctor_id);
    if (updatedDoctorProfile) {
      return successResponse(res, 'Profile edited successfully!', updatedDoctorProfile);
    }
    return errorResponse(res, 'Failed to edit profile!', null);
  } catch (error) {
    return errorResponse(res, 'An error occurred!', null);
  }
});
const getAllDoctors = catchAsync(async (req: Request, res: Response) => {
  try {
    const doctorsList = await getAllDoctorsList();
    return successResponse(res, 'Response successfully!', doctorsList);
  } catch (error) {
    return errorResponse(res, String(error), null);
  }
});
const changeApoinmentStatusController = catchAsync(async (req: Request, res: Response) => {
  try {
    const { id, status } = req.body;
    const updatedApoinment = await changeApoinmentStatus(id, status);
    if (updatedApoinment) {
      return successResponse(res, 'Status changed successfully', updatedApoinment);
    }
  } catch (error) {
    return processException(res, String(error));
  }
});
const getAllService = catchAsync(async (req: Request, res: Response) => {
  try {
    const sericeList: DoctorsService[] | null = await getAllServiceList();
    if (sericeList === null || sericeList.length === 0) {
      return errorResponse(res, 'No Service List Found', null);
    }
    return successResponse(res, 'Response successfully!', sericeList);
  } catch (error) {
    return errorResponse(res, String(error), null);
  }
});
const getDoctorProfile = catchAsync(async (req: Request, res: Response) => {
  try {
    const token = separateToken(req.headers.authorization);
    if (!token) {
      return errorResponse(res, 'Authorization header missing or invalid format', null);
    }
    const DoctorID: number = await tokenService.verifyAccessTokenAndGetUserID(token);

    const doctorProfile = await getDoctorProfileById(Number(DoctorID));

    if (!doctorProfile) {
      return errorResponse(res, 'Profile not found', null);
    }
    return successResponse(res, 'Profile retrieved successfully', doctorProfile);
  } catch (error) {
    return errorResponse(res, String(error), null);
  }
});
const addDoctorServiceController = catchAsync(async (req: Request, res: Response) => {
  try {
    const token = separateToken(req.headers.authorization);
    if (!token) {
      return errorResponse(res, 'Authorization header missing or invalid format', null);
    }
    const DoctorID: number = await tokenService.verifyAccessTokenAndGetUserID(token);

    const { service_name, service_price } = req.body; // Replace with

    const DataToUpdate: Prisma.DoctorsServiceCreateInput = {
      name: service_name,
      price: parseFloat(service_price),
      doctor: {}
    };

    const DoctorService = await createDoctorService(DataToUpdate, DoctorID);

    if (DoctorService) {
      return successResponse(res, 'Service added successfully!', DoctorService);
    }
    return errorResponse(res, 'Failed to add service!', null);
  } catch (error) {
    return errorResponse(res, String(error), null);
  }
});

export default {
  editCreateDoctor,
  getDoctorProfile,
  getAllDoctors,
  addDoctorServiceController,
  getAllService,
  changeApoinmentStatusController
};
