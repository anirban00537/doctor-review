import { Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import { DoctorProfile, DoctorsService, Prisma } from '@prisma/client';
import {
  FindServiceWithIdAndDoctorID,
  changeApoinmentStatus,
  changeAppointmentStatusService,
  createDoctorService,
  createUpdateDoctorProfile,
  deleteService,
  getAllDoctorAppointmentsService,
  getAllDoctorServiceListService,
  getAllDoctorsList,
  getAllServiceList,
  getDoctorProfileById,
  getDoctorReview,
  searchFunction
} from '../services/doctors.service';
import { errorResponse, processException, separateToken, successResponse } from '../utils/common';
import { tokenService } from '../services';

const editCreateDoctor = catchAsync(async (req: Request, res: Response) => {
  try {
    const { doctor_id } = req.body;
    const doctorsProfileData = req.body;
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
const search = catchAsync(async (req: Request, res: Response) => {
  try {
    const { query } = req.body;
    console.log(query, 'query');
    const responnse = await searchFunction(query);
    if (!responnse) {
      return errorResponse(res, 'No result found', null);
    }
    return successResponse(res, 'Search Found successfully!', responnse);
  } catch (error) {
    processException(res, error);
  }
});
const delete_service = catchAsync(async (req: Request, res: Response) => {
  try {
    const { service_id } = req.params;
    const token = separateToken(req.headers.authorization);
    // if (!token) {
    //   return errorResponse(res, 'Authorization header missing or invalid format', null);
    // }
    // const DoctorID: number = await tokenService.verifyAccessTokenAndGetUserID(token);

    // const serviceFound = await FindServiceWithIdAndDoctorID(Number(DoctorID), Number(service_id));
    // if (serviceFound) {
    const response = await deleteService(Number(service_id));
    if (response) {
      return successResponse(res, 'Service Deleted Successfully', null);
    } else {
      return errorResponse(res, 'Service deleted failed', null);
    }
    // }
    return errorResponse(res, 'Service deleted failed', null);
  } catch (error) {
    return errorResponse(res, String(error), null);
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
const getAllDoctorAppointments = catchAsync(async (req: Request, res: Response) => {
  try {
    const { page, limit, search } = req.query;

    const token = separateToken(req.headers.authorization);
    if (!token) {
      return errorResponse(res, 'Authorization header missing or invalid format', null);
    }
    const DoctorID: number = await tokenService.verifyAccessTokenAndGetUserID(token);
    const doctorProfile = await getDoctorProfileById(Number(DoctorID));
    console.log(DoctorID, 'DoctorID');
    if (!doctorProfile) {
      return errorResponse(res, 'Profile not found', null);
    }
    const response = await getAllDoctorAppointmentsService(
      Number(DoctorID),
      Number(page),
      Number(limit),
      search ? String(search) : null
    );
    return successResponse(res, 'Doctors appointments retrieved successfully', response);
  } catch (error) {
    return errorResponse(res, String(error), null);
  }
});

const getAllDoctorServiceListController = catchAsync(async (req: Request, res: Response) => {
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
    const response = await getAllDoctorServiceListService(Number(DoctorID));
    if (response) {
      return successResponse(res, 'Doctors appointments retrieved successfully', response);
    }
    return errorResponse(res, 'Something went wrong', null);
  } catch (error) {
    return errorResponse(res, String(error), null);
  }
});
const getAllDoctorReviews = catchAsync(async (req: Request, res: Response) => {
  try {
    const token = separateToken(req.headers.authorization);
    if (!token) {
      return errorResponse(res, 'Authorization header missing or invalid format', null);
    }
    const DoctorID: number = await tokenService.verifyAccessTokenAndGetUserID(token);
    console.log(DoctorID, 'DoctorID');
    const doctorProfile = await getDoctorProfileById(Number(DoctorID));

    if (!doctorProfile) {
      return errorResponse(res, 'Profile not found', null);
    }
    const response = await getDoctorReview(Number(DoctorID));
    if (response) {
      return successResponse(res, 'Doctors review retrieved successfully', response);
    }
    return errorResponse(res, 'Something went wrong', null);
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
const changeAppointmentStatus = catchAsync(async (req: Request, res: Response) => {
  try {
    const token = separateToken(req.headers.authorization);
    if (!token) {
      return errorResponse(res, 'Authorization header missing or invalid format', null);
    }
    const { appointment_id, status } = req.body; // Replace with

    const responnse = await changeAppointmentStatusService(appointment_id, status);
    if (!responnse) {
      return errorResponse(res, 'Failed to change status!', null);
    }
    return successResponse(res, 'Changed successfully!', responnse);
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
  changeApoinmentStatusController,
  getAllDoctorAppointments,
  changeAppointmentStatus,
  delete_service,
  getAllDoctorServiceListController,
  search,
  getAllDoctorReviews
};
