import { Appointment, DoctorProfile, DoctorsService, Prisma } from '@prisma/client';
import prisma from '../client';
import { CANCELLED, COMPLETED, DOCTOR, SCHEDULED } from '../utils/core-constants';

const getDoctorProfileById = async (doctor_id: number) => {
  const doctorProfile = await prisma.user.findFirst({
    where: {
      id: Number(doctor_id),
      role: DOCTOR
    },
    include: {
      doctorProfile: true,
      doctor_appointments: true
    }
  });
  if (doctorProfile && 'password' in doctorProfile) {
    const { password, ...filteredDoctorProfile } = doctorProfile;

    return filteredDoctorProfile;
  }

  return doctorProfile;
};
const getAllDoctorAppointmentsService = async (
  DoctorID: number,
  page: number = 1,
  limit: number = 10,
  search: string | null
): Promise<{
  appointments: Appointment[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
} | null> => {
  const skip = (page - 1) * limit;

  const whereClause: any = {
    doctorId: Number(DoctorID)
  };

  if (search != undefined) {
    console.log('entering search', search);
    whereClause.OR = [
      {
        user: {
          name: {
            contains: search,
            mode: 'insensitive'
          }
        }
      },
      {
        user: {
          email: {
            contains: search,
            mode: 'insensitive'
          }
        }
      }
    ];
  }

  const appointments = await prisma.appointment.findMany({
    where: whereClause,
    include: {
      doctor: {
        select: {
          email: true,
          name: true,
          photo_url: true,
          doctorProfile: true
        }
      },
      user: {
        select: {
          name: true,
          email: true,
          photo_url: true,
          patient_history: true,
          age: true,
          sex: true
        }
      }
    },
    skip,
    take: limit
  });

  const totalCount = await prisma.appointment.count({
    where: whereClause
  });

  const totalPages = Math.ceil(totalCount / limit);

  return { appointments, totalCount, totalPages, currentPage: page };
};

const getAllDoctorServiceListService = async (
  DoctorID: number
): Promise<DoctorsService[] | null> => {
  const DoctorServiceRes = await prisma.doctorsService.findMany({
    where: {
      doctorId: Number(DoctorID)
    },
    include: {
      doctor: {
        select: {
          name: true,
          email: true,
          photo_url: true,
          Review: true,
          id: true,
          doctorProfile: {
            select: {
              clinicAddress: true,
              specialization: true
            }
          }
        }
      }
    }
  });

  return DoctorServiceRes;
};
const getDoctorReview = async (doctorId: number) => {
  const reviewList = await prisma.doctorsService.findMany({
    where: {
      doctorId: doctorId
    },
    include: {
      review: {
        include: {
          user: true
        }
      }
    }
  });

  return reviewList;
};
const getAllDoctorsList = async () => {
  const doctorsList = await prisma.user.findMany({
    where: {
      role: DOCTOR
    },
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

  return doctorsList;
};
const getAllServiceList = async (): Promise<DoctorsService[] | null> => {
  const doctorsList = await prisma.doctorsService.findMany({
    include: {
      doctor: {
        select: {
          name: true,
          email: true,
          photo_url: true,
          Review: true,
          id: true,
          doctorProfile: {
            select: {
              clinicAddress: true,
              specialization: true
            }
          }
        }
      }
    }
  });

  return doctorsList;
};

const createUpdateDoctorProfile = async (
  profileData: DoctorProfile,
  doctor_id: number
): Promise<DoctorProfile | null> => {
  console.log(profileData, 'profileData');
  const updatedDoctorProfile = await prisma.doctorProfile.upsert({
    where: {
      userId: Number(doctor_id)
    },
    create: {
      clinicAddress: profileData.clinicAddress,
      experienceYears: Number(profileData.experienceYears),
      qualification: profileData.qualification,
      specialization: profileData.specialization,
      education: profileData.education,
      publication_link: profileData.publication_link,
      current_place: profileData.current_place,
      country: profileData.country,
      other_inportent_link: profileData.other_inportent_link,
      description: profileData.description,

      userId: Number(doctor_id)
    },
    update: {
      clinicAddress: profileData.clinicAddress,
      experienceYears: Number(profileData.experienceYears),
      qualification: profileData.qualification,
      specialization: profileData.specialization,
      education: profileData.education,
      publication_link: profileData.publication_link,
      current_place: profileData.current_place,
      country: profileData.country,
      other_inportent_link: profileData.other_inportent_link,
      description: profileData.description
    }
  });

  return updatedDoctorProfile;
};
const createDoctorService = async (
  dataToUpdate: Prisma.DoctorsServiceCreateInput,
  doctorId: number
): Promise<DoctorsService | null> => {
  console.log(dataToUpdate, 'doctorId');
  const createdData = await prisma.doctorsService.create({
    data: {
      name: dataToUpdate.name,
      price: dataToUpdate.price,
      doctor: {
        connect: { id: doctorId } // Use the 'connect' field to associate the service with the specified doctor's ID
      }
    },
    select: {
      id: true,
      doctorId: true,
      name: true,
      price: true,
      createdAt: true,
      updatedAt: true,
      doctor: {
        select: {
          doctor_appointments: true,
          createdAt: true,
          email: true,
          name: true
        }
      }
    }
  });

  return createdData;
};
const changeAppointmentStatusService = async (
  appointmentId: number,
  status: string
): Promise<Appointment | null> => {
  const createdData = await prisma.appointment.update({
    where: {
      id: Number(appointmentId)
    },
    data: {
      status: status === SCHEDULED ? SCHEDULED : status === CANCELLED ? CANCELLED : COMPLETED
    }
  });

  return createdData;
};

const changeApoinmentStatus = async (id: number, status: string): Promise<Appointment> => {
  const updatedApoinment = await prisma.appointment.update({
    where: {
      id: id
    },
    data: {
      status: status === COMPLETED ? COMPLETED : status === CANCELLED ? CANCELLED : COMPLETED
    }
  });
  return updatedApoinment;
};
const searchFunction = async (query: string): Promise<DoctorsService[] | null> => {
  const updatedAppointments = await prisma.doctorsService.findMany({
    where: {
      OR: [
        {
          name: {
            contains: query,
            mode: 'insensitive'
          }
        },
        {
          doctor: {
            OR: [
              {
                doctorProfile: {
                  specialization: {
                    contains: query,
                    mode: 'insensitive'
                  }
                }
              },
              {
                doctorProfile: {
                  qualification: {
                    contains: query,
                    mode: 'insensitive'
                  }
                }
              }
            ]
          }
        }
      ]
    }
  });
  return updatedAppointments;
};

const updateDoctorService = async (
  serviceId: number,
  dataToUpdate: Partial<DoctorsService>
): Promise<DoctorsService | null> => {
  const updatedData = await prisma.doctorsService.update({
    where: { id: serviceId },
    data: dataToUpdate
  });

  return updatedData;
};
const FindServiceWithIdAndDoctorID = async (
  doctorID: number,
  serviceId: number
): Promise<DoctorsService | null> => {
  console.log(serviceId, 'serviceDataserviceData');
  console.log(doctorID, 'serviceDataserviceData');

  const serviceData = await prisma.doctorsService.findFirst({
    where: {
      id: Number(serviceId),
      doctorId: Number(doctorID)
    }
  });
  return serviceData;
};
const deleteService = async (serviceId: number): Promise<DoctorsService | null> => {
  const serviceData = await prisma.doctorsService.delete({
    where: {
      id: Number(serviceId)
    }
  });

  return serviceData;
};
export {
  createUpdateDoctorProfile,
  getDoctorProfileById,
  getAllDoctorsList,
  createDoctorService,
  updateDoctorService,
  getAllServiceList,
  changeApoinmentStatus,
  getAllDoctorAppointmentsService,
  changeAppointmentStatusService,
  FindServiceWithIdAndDoctorID,
  deleteService,
  getAllDoctorServiceListService,
  searchFunction,
  getDoctorReview
};
