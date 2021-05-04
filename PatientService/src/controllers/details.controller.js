const { patient_personal_details } = require('../models');
const logger = require('../middlewares/logger');

const getPatientDetailsById = async (req, res) => {
  const details = await patient_personal_details.findOne({
    where: {
      id: req.params.patient_id
    }
  });
  res.send(details);
  logger.http(`GET | getPatientDetails for Id=${details.user_id}`, { ip: req.ip });
}

const addPatientDetails = (req, res) => {
  const { full_name, line1, line2, line3, country, state, city, mobile_no, date_of_birth, district, age, pin_code } = req.body;
  patient_personal_details.create({
    full_name,
    line1,
    line2,
    line3,
    country,
    state,
    city,
    district, 
    pin_code,
    age,
    mobile_no,
    date_of_birth,
    user_id: req.user.id
  }).then(user => {
    res.send("Details added Successfully")
    logger.http(`POST | addPatientDetails for user_id=${req.user.id}`, {
      ip: req.ip,
      details: user
    })
  })
  .catch(err => {
    res.send("Error")
    logger.error(`HTTPError | Adding patient details for user_id=${req.user.id}`, { ip: req.ip, err})
  })
}
module.exports = {
  getPatientDetailsById,
  addPatientDetails
}