const { patient_vitals } = require('../models');
const logger = require('../middlewares/logger');

const getVitalsByPatientId = async (req, res) => {
  const vitals = await patient_vitals.findOne({
    where: {
      patient_id: req.params.patient_id
    }
  });
  res.send(vitals);
  logger.http(`GET | getVitals for patient_id=${req.params.patient_id}`, { ip: req.ip})
}

const addVitalsForPatientId = async (req, res) => {
  const { date, oxygen, temperature, height, weight, bmi, blood_pressure, blood_group } = req.body;
  patient_vitals.create({
    patient_id: req.params.patient_id,
    date,
    oxygen,
    temperature,
    height,
    weight,
    bmi,
    blood_pressure,
    blood_group
  }).then(newVitals => {
    res.send("Details added Successfully")
    logger.http(`POST | addVitals for user_id=${req.user.id}`, {
      ip: req.ip,
      details: newVitals
    })
  })
  .catch(err => {
    res.send("Error")
    logger.error(`HTTPError | Adding patient vitals for user_id=${req.user.id}`, { ip: req.ip, err})
  })
}

module.exports = {
  getVitalsByPatientId,
  addVitalsForPatientId
}