import {
  User,
  Role,
  Prisma,
  Appointment,
  DoctorsService,
  Review,
  PatientHistory
} from '@prisma/client';
import httpStatus from 'http-status';
import prisma from '../client';
import ApiError from '../utils/ApiError';
import { encryptPassword } from '../utils/encryption';
import { FEMALE, MALE } from '../utils/core-constants';

const createUser = async (
  email: string,
  password: string,
  age: number,
  sex: string,
  name: string,
  role: Role = Role.USER
): Promise<User> => {
  return prisma.user.create({
    data: {
      email,
      name,
      password: await encryptPassword(password),
      role,
      sex: sex === MALE ? MALE : FEMALE,
      age: age
    }
  });
};
const createDoctor = async (
  email: string,
  password: string,
  education: string, // Moved up, required parameter
  publicationLink: string,
  currentPlace: string,
  country: string,
  otherImportantLink: string,
  age: number,
  sex: string,
  name: string // Moved down, optional parameter
): Promise<User> => {
  return prisma.user.create({
    data: {
      email,
      name,
      password: await encryptPassword(password),
      role: Role.DOCTOR,
      sex: sex === MALE ? MALE : FEMALE,
      age: age,
      doctorProfile: {
        create: {
          education: education,
          publication_link: publicationLink,
          current_place: currentPlace,
          country,
          other_inportent_link: otherImportantLink
        }
      }
    }
  });
};

const queryUsers = async <Key extends keyof User>(
  filter: object,
  options: {
    limit?: number;
    page?: number;
    sortBy?: string;
    sortType?: 'asc' | 'desc';
  },
  keys: Key[] = [
    'id',
    'email',
    'name',
    'password',
    'role',
    'isEmailVerified',
    'createdAt',
    'updatedAt'
  ] as Key[]
): Promise<Pick<User, Key>[]> => {
  const page = options.page ?? 1;
  const limit = options.limit ?? 10;
  const sortBy = options.sortBy;
  const sortType = options.sortType ?? 'desc';
  const users = await prisma.user.findMany({
    where: filter,
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
    skip: page * limit,
    take: limit,
    orderBy: sortBy ? { [sortBy]: sortType } : undefined
  });
  return users as Pick<User, Key>[];
};
const createPatientHistory = async (
  problem: string,
  diagnosis: string | null,
  treatment: string | null,
  date: Date,
  hospitalName: string | null,
  doctorName: string | null,
  notes: string | null,
  followUpDate: Date | null,
  followUpDoctor: string | null,
  isEmergency: boolean,
  isRecurring: boolean,
  isChronic: boolean,
  isCritical: boolean,
  userID: number
): Promise<PatientHistory> => {
  console.log(userID, 'problemaaaaaaaaaaaaa');
  const parsedDate = new Date(date); // Parse date string to Date object
  const parsedFollowUpDate = followUpDate ? new Date(followUpDate) : null; // P
  const patientHistory = await prisma.patientHistory.create({
    data: {
      problem,
      diagnosis,
      treatment,
      date: parsedDate, // Use the parsed date
      hospitalName,
      doctorName,
      notes,
      followUpDate: parsedFollowUpDate, // Use the parsed followUpDate
      followUpDoctor,
      isEmergency,
      isRecurring,
      isChronic,
      isCritical,
      userId: userID
    }
  });

  return patientHistory;
};
const getMedicalHistory = async (userId: number): Promise<PatientHistory[]> => {
  const response = await prisma.patientHistory.findMany({
    where: {
      userId: Number(userId)
    }
  });
  return response;
};
const getUserById = async <Key extends keyof User>(
  id: number,
  keys: Key[] = [
    'id',
    'email',
    'name',
    'role',
    'isEmailVerified',
    'createdAt',
    'updatedAt',
    'photo_url',
    'createdAt'
  ] as Key[]
): Promise<Pick<User, Key> | null> => {
  return prisma.user.findUnique({
    where: { id: Number(id) },
    // select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
    include: {
      doctorProfile: true,
      Review: true
    }
  }) as Promise<Pick<User, Key> | null>;
};
const getApoinments = async (
  user_id: number,
  page: number = 1,
  limit: number = 10
): Promise<{
  appointments: Appointment[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
} | null> => {
  const skip = (page - 1) * limit;

  const appointments = await prisma.appointment.findMany({
    where: {
      userId: user_id
    },
    include: {
      doctor: {
        select: {
          email: true,
          name: true,
          photo_url: true,
          doctorProfile: true
        }
      },
      DoctorsService: {
        include: {
          review: {
            include: {
              user: true
            }
          }
        }
      }
    },
    skip,
    take: limit
  });

  const totalCount = await prisma.appointment.count({
    where: {
      userId: user_id
    }
  });
  const totalPages = Math.ceil(totalCount / limit);

  return { appointments, totalCount, totalPages, currentPage: page };
};
const getServiceByIdService = async (serviceId: number): Promise<DoctorsService | null> => {
  const doctorService = await prisma.doctorsService.findUnique({
    where: {
      id: Number(serviceId)
    },
    include: {
      doctor: {
        include: {
          doctorProfile: true
        }
      },
      review: {
        include: {
          user: true
        }
      }
    }
  });
  return doctorService;
};

const createAppointment = async (
  userId: number,
  doctorId: number,
  doctorsServiceId: number,
  date: Date,
  reason?: string
): Promise<Appointment> => {
  const appointment = await prisma.appointment.create({
    data: {
      userId: Number(userId),
      doctorId: Number(doctorId),
      date: date,
      reason: reason,
      doctorsServiceId: doctorsServiceId
    }
  });

  return appointment;
};

const getUserByEmail = async <Key extends keyof User>(
  email: string,
  keys: Key[] = [
    'id',
    'email',
    'name',
    'password',
    'role',
    'isEmailVerified',
    'createdAt',
    'updatedAt'
  ] as Key[]
): Promise<Pick<User, Key> | null> => {
  return prisma.user.findUnique({
    where: { email },
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
  }) as Promise<Pick<User, Key> | null>;
};
const getAllUsers = async () => {
  return await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      isEmailVerified: true,
      createdAt: true,
      updatedAt: true,
      doctorProfile: true
    }
  });
};

const updateUserById = async <Key extends keyof User>(
  userId: number,
  updateBody: Prisma.UserUpdateInput,
  keys: Key[] = ['id', 'email', 'name', 'photo_url', 'createdAt', 'photo_url'] as Key[]
): Promise<Pick<User, Key> | null> => {
  const user = await getUserById(userId, ['id', 'email', 'name']);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (updateBody.email && (await getUserByEmail(updateBody.email as string))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: {
      email: updateBody.email,
      name: updateBody.name,
      age: Number(updateBody.age),
      sex: updateBody.sex
    },
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
  });
  return updatedUser as Pick<User, Key> | null;
};

const deleteUserById = async (userId: number): Promise<User> => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  // Delete related PatientHistory records
  await prisma.patientHistory.deleteMany({ where: { userId: user.id } });

  // Now, you can safely delete the user
  await prisma.user.delete({ where: { id: user.id } });

  return user;
};
const addReviewService = async (
  rating: number,
  comment: string,
  doctorsServiceId: number,
  userId: number
): Promise<Review | null> => {
  return prisma.review.create({
    data: {
      rating: Number(rating),
      comment: comment,
      userId: Number(userId),
      doctorsServiceId: Number(doctorsServiceId)
    }
  });
};

export default {
  createUser,
  queryUsers,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
  getApoinments,
  createAppointment,
  createDoctor,
  getServiceByIdService,
  addReviewService,
  createPatientHistory,
  getMedicalHistory,
  getAllUsers
};
