import pick from '../utils/pick';
import catchAsync from '../utils/catchAsync';
import { tokenService, userService } from '../services';
import { Request, Response } from 'express';
import { separateToken, successResponse, errorResponse, processException } from '../utils/common';
import { Appointment, User } from '@prisma/client';
import { DOCTOR } from '../utils/core-constants';
import { getDoctorProfileById } from '../services/doctors.service';
import prisma from '../client';

const createUser = catchAsync(async (req, res) => {
  const { email, password, age, sex, name, role } = req.body;
  const user: User = await userService.createUser(email, password, age, sex, name, role);
  return successResponse(res, 'User created successfully', user);
});
const editUser = catchAsync(async (req: Request, res: Response) => {
  try {
    const token = separateToken(req.headers.authorization);
    if (!token) {
      return errorResponse(res, 'Authorization header missing or invalid format', null);
    }
    const userID: number = await tokenService.verifyAccessTokenAndGetUserID(token);

    const userProfile: User = req.body;
    const user: User | null = await userService.getUserById(Number(userID));
    if (!user) {
      return errorResponse(res, 'Invalid user id!', null);
    }
    const updatedUser = await userService.updateUserById(Number(userID), userProfile);
    if (updatedUser) {
      return successResponse(res, 'Profile edited successfully!', updatedUser);
    }
    return errorResponse(res, 'Failed to edit profile!', null);
  } catch (error) {
    console.log(error, 'error');
    return processException(res, error);
  }
});
const getUserApoinments = catchAsync(async (req: Request, res: Response) => {
  try {
    const { page, limit } = req.query;
    const token = separateToken(req.headers.authorization);
    if (!token) {
      return errorResponse(res, 'Authorization header missing or invalid format', null);
    }
    const userID: number = await tokenService.verifyAccessTokenAndGetUserID(token);
    const user: User | null = await userService.getUserById(userID);
    if (!user) {
      return errorResponse(res, 'User not found', null);
    }
    const response: any = await userService.getApoinments(userID, Number(page), Number(limit));

    return successResponse(res, 'User appointments retrieved successfully', response);
  } catch (error) {
    return processException(res, error);
  }
});

const getUserMedicalHistory = catchAsync(async (req: Request, res: Response) => {
  try {
    const token = separateToken(req.headers.authorization);
    if (!token) {
      return errorResponse(res, 'Authorization header missing or invalid format', null);
    }
    const userID: number = await tokenService.verifyAccessTokenAndGetUserID(token);

    const appointments = await userService.getMedicalHistory(userID);
    if (!appointments) {
      return errorResponse(res, 'Something went wrong!', null);
    }
    return successResponse(res, 'Appointment get successfully', appointments);
  } catch (error) {
    return processException(res, error);
  }
});
const createAppointment = catchAsync(async (req: Request, res: Response) => {
  const { doctorId, date, reason, doctorsServiceId } = req.body;
  const token = separateToken(req.headers.authorization);
  if (!token) {
    return errorResponse(res, 'Authorization header missing or invalid format', null);
  }
  const userID: number = await tokenService.verifyAccessTokenAndGetUserID(token);

  // Check if the user and doctor exist
  const user = await userService.getUserById(Number(userID));
  // const doctor = await userService.getUserById(doctorId);
  const doctor = await getDoctorProfileById(Number(doctorId));
  if (!user || !doctor) {
    return errorResponse(res, 'User or doctor not found', null);
  }
  if (user.role === DOCTOR) {
    return errorResponse(res, 'You are a doctor cannot make an apoinment', null);
  }

  // Create the appointment
  const appointment: Appointment = await userService.createAppointment(
    userID,
    doctorId,
    doctorsServiceId,
    new Date(date),
    reason
  );

  return successResponse(res, 'Appointment created successfully', appointment);
});
const addPatientHistory = catchAsync(async (req: Request, res: Response) => {
  try {
    const {
      problem,
      diagnosis,
      treatment,
      date,
      hospitalName,
      doctorName,
      notes,
      followUpDate,
      followUpDoctor,
      isEmergency,
      isRecurring,
      isChronic,
      isCritical
    } = req.body;
    const token = separateToken(req.headers.authorization);
    if (!token) {
      return errorResponse(res, 'Authorization header missing or invalid format', null);
    }
    const userID: number = await tokenService.verifyAccessTokenAndGetUserID(token);

    const response = await userService.createPatientHistory(
      problem,
      diagnosis,
      treatment,
      date,
      hospitalName,
      doctorName,
      notes,
      followUpDate,
      followUpDoctor,
      isEmergency,
      isRecurring,
      isChronic,
      isCritical,
      userID
    );

    if (!response) {
      return errorResponse(res, 'PAtient medical history add failed!', null);
    }
    return successResponse(res, 'Response successfully!', response);
  } catch (error) {
    console.log(error, 'error');
    return errorResponse(res, String(error), null);
  }
});

const addPhotoUrl = catchAsync(async (req: Request, res: Response) => {
  try {
    const token = separateToken(req.headers.authorization);
    if (!token) {
      return errorResponse(res, 'Authorization header missing or invalid format', null);
    }
    if (!req.file) {
      return errorResponse(res, 'No file uploaded', req);
    }

    const userID: number = await tokenService.verifyAccessTokenAndGetUserID(token);
    const user: User | null = await userService.getUserById(userID);

    if (!user) {
      return errorResponse(res, 'User not found', null);
    }

    user.photo_url = req.file.path;
    let updatedProfile: any = await userService.updateUserById(userID, {
      photo_url: req.file.path
    });
    let profileData = `localhost/3000/image/${updatedProfile.photo_url.split('/')[2]}`;
    updatedProfile.photo_url = profileData;
    return successResponse(res, 'Profile photo added successfully', updatedProfile);
  } catch (error) {
    return errorResponse(res, String(error), null);
  }
});

const getUserProfile = catchAsync(async (req: Request, res: Response) => {
  try {
    const token = separateToken(req.headers.authorization);
    if (!token) {
      return errorResponse(res, 'Authorization header missing or invalid format', null);
    }
    const userID: number = await tokenService.verifyAccessTokenAndGetUserID(token);
    const UserResponse: User | null = await userService.getUserById(Number(userID));
    // delete UserResponse?.password;
    if (!UserResponse) {
      return errorResponse(res, 'Invalid token', null);
    }

    return successResponse(res, 'User profile retrieved successfully', UserResponse);
  } catch (error) {
    return errorResponse(res, 'Invalid token', null);
  }
});

const getUsers = catchAsync(async (req, res) => {
  try {
    const filter = pick(req.query, ['name', 'role']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await userService.queryUsers(filter, options);
    return successResponse(res, 'Users retrieved successfully', result);
  } catch (error) {
    return errorResponse(res, '', null);
  }
});
const addReview = catchAsync(async (req, res) => {
  try {
    const { rating, comment, doctorsServiceId } = req.body;

    const token = separateToken(req.headers.authorization);
    if (!token) {
      return errorResponse(res, 'Authorization header missing or invalid format', null);
    }
    const userID: number = await tokenService.verifyAccessTokenAndGetUserID(token);
    const user: User | null = await userService.getUserById(userID);

    if (!user) {
      return errorResponse(res, 'User not found', null);
    }
    const review = await userService.addReviewService(rating, comment, doctorsServiceId, userID);
    if (!review) {
      return errorResponse(res, 'Failed to review doctor', null);
    }
    return successResponse(res, 'Reviewed Successfully', review);
  } catch (error) {
    return errorResponse(res, '', null);
  }
});

const getUser = catchAsync(async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.userId);
    if (!user) {
      // throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
      return errorResponse(res, 'User not found', null);
    }
    return successResponse(res, 'User retrieved successfully', user);
  } catch (error) {
    return errorResponse(res, '', null);
  }
});
const getServiceById = catchAsync(async (req, res) => {
  try {
    const { serviceId } = req.params;
    const service = await userService.getServiceByIdService(Number(serviceId));
    console.log(service, 'service');
    if (!service) {
      return errorResponse(res, 'Invalid service id', null);
    }
    return successResponse(res, 'User retrieved successfully', service);
  } catch (error) {
    return errorResponse(res, String(error), null);
  }
});
const updateUser = catchAsync(async (req, res) => {
  try {
    const user = await userService.updateUserById(req.params.userId, req.body);
    return successResponse(res, 'User updated successfully', user);
  } catch (error) {
    return errorResponse(res, '', null);
  }
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  return successResponse(res, 'User deleted successfully');
});

export default {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getUserProfile,
  addPhotoUrl,
  editUser,
  getUserApoinments,
  createAppointment,
  getUserMedicalHistory,
  getServiceById,
  addReview,
  addPatientHistory
};
