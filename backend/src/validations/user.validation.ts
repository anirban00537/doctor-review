import { Role } from '@prisma/client';
import Joi from 'joi';
import { password } from './custom.validation';

const createUser = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    name: Joi.string().required(),
    role: Joi.string().required().valid(Role.USER, Role.ADMIN)
  })
};

const getUsers = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer()
  })
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.number().integer()
  })
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.number().integer()
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      password: Joi.string().custom(password),
      name: Joi.string()
    })
    .min(1)
};
const addPatientHistorySchema = Joi.object({
  problem: Joi.string().required(),
  diagnosis: Joi.string().allow(''),
  treatment: Joi.string().allow(''),
  date: Joi.date().iso().required(),
  hospitalName: Joi.string().allow(''),
  doctorName: Joi.string().allow(''),
  notes: Joi.string().allow(''),
  prescription: Joi.string().allow(''),
  followUpDate: Joi.date().iso().allow(''),
  followUpDoctor: Joi.string().allow(''),
  isEmergency: Joi.boolean(),
  isRecurring: Joi.boolean(),
  isChronic: Joi.boolean(),
  isCritical: Joi.boolean()
});

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.number().integer()
  })
};
const addApoinment = {
  body: Joi.object().keys({
    doctorId: Joi.number().required(),
    date: Joi.date(),
    reason: Joi.string().required(),
    doctorsServiceId: Joi.number().required()
  })
};
const addReview = {
  body: Joi.object().keys({
    rating: Joi.number().required(),
    comment: Joi.string().required(),
    doctorsServiceId: Joi.number().required(),
  })
};

export default {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  addApoinment,
  addReview,
  addPatientHistorySchema
};
