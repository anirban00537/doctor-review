import Joi from 'joi';

const DoctorProfile = {
  body: Joi.object().keys({
    specialization: Joi.string().allow(null).required(),
    qualification: Joi.string().allow(null).required(),
    experienceYears: Joi.number().integer().allow(null).required(),
    clinicAddress: Joi.string().allow(null).required(),
    education: Joi.string().allow(null).required(),
    publication_link: Joi.string().allow(null).required(),
    current_place: Joi.string().allow(null).required(),
    country: Joi.string().allow(null).required(),
    other_inportent_link: Joi.string().allow(null).required(),
    description: Joi.string().allow(null).required(),
    doctor_id: Joi.number().integer().required()
  })
};
const search = {
  body: Joi.object().keys({
    query: Joi.string().required()
  })
};

const DoctorService = {
  body: Joi.object().keys({
    service_name: Joi.string().required(),
    service_price: Joi.number().required()
  })
};
const DoctorApoinmentStatusChange = {
  body: Joi.object().keys({
    id: Joi.number().required(),
    status: Joi.string().required()
  })
};
export default {
  DoctorProfile,
  DoctorService,
  DoctorApoinmentStatusChange,
  search
};
