const { doctor_personal_details, hcp_professional_details, facilities } = require('../models');
const logger = require('../middlewares/logger');

const getDoctorDetailById = async (req, res) => {
  const personalDetails = await doctor_personal_details.findOne({
    where: {
      id: req.params.doctor_id
    }
  });

  const professionalDetails = await hcp_professional_details.findOne({
    where: {
      id: req.params.doctor_id
    }
  });

  const facility = await facilities.findOne({
    where: {
      id: professionalDetails.facility_id
    }
  });
  let details = {
    personalDetails,
    professionalDetails,
    facility
  }
  res.send(details);
  logger.http(`GET | getDoctorDetailById for user_id=${req.user.id}`, { ip: req.ip });
}

const addDoctorPersonalDetails = async (req, res) => {
  const { doctor_name, line1, line2, line3, country, state, city, district, pin_code, contact_no } = req.body;
  doctor_personal_details.create({
    user_id: req.user.id,
    doctor_name,
    line1,
    line2,
    line3,
    country,
    state,
    city,
    district,
    pin_code,
    contact_no
  }).then(details => {
    res.send("Doctor's personal details added Successfully");
    logger.http(`POST | addDoctorPersonalDetails for user_id=${req.user.id}`, {
      ip: req.ip,
      details
    })
  }).catch(err => {
    res.send("Error")
    logger.error(`HTTPError | Addding dotor's personal details for user_id=${req.user.id}`, { ip: req.ip, err})
  })

}

const addHcpProfessionalDetails = async (req, res) => {
  const { country, state, university, degree, specialization, registration_no } = req.body;
  hcp_professional_details.create({
    user_id: req.user.id,
    country,
    state,
    university,
    degree,
    registration_no,
    specialization
  }).then(details => {
    res.send("Doctor's Professional details added Successfully");
    logger.http(`POST | addHcpProfessionalDetails for user_id=${req.user.id}`, {
      ip: req.ip,
      details
    })
  }).catch(err => {
    res.send("Error")
    logger.error(`HTTPError | Addding dotor's professional details for user_id=${req.user.id}`, { ip: req.ip, err})
  })
}

module.exports = {
  getDoctorDetailById,
  addDoctorPersonalDetails,
  addHcpProfessionalDetails
}