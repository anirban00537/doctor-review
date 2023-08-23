import { User, Role, Prisma, Appointment, DoctorsService } from '@prisma/client';
import httpStatus from 'http-status';
import prisma from '../client';
import ApiError from '../utils/ApiError';
import { encryptPassword } from '../utils/encryption';

const createUser = async (
  email: string,
  password: string,
  name?: string,
  role: Role = Role.USER
): Promise<User> => {
  return prisma.user.create({
    data: {
      email,
      name,
      password: await encryptPassword(password),
      role
    }
  });
};
const createDoctor = async (
  email: string,
  password: string,
  name?: string,
  role: Role = Role.DOCTOR
): Promise<User> => {
  if (await getUserByEmail(email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  return prisma.user.create({
    data: {
      email,
      name,
      password: await encryptPassword(password),
      role
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
      photo_url: updateBody.photo_url
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
  await prisma.user.delete({ where: { id: user.id } });
  return user;
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
  getServiceByIdService
};
