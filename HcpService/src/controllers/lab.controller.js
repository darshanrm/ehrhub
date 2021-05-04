const { lab_practitioner_details } = require('../models');
const logger = require('../middlewares/logger');

const getLabPractitionerDetails = async (req, res) => {
  const details = await lab_practitioner_details.findOne({
    where: {
      user_id: req.user.id
    }
  });
  res.send(details);
  logger.http(`GET | getLabPractitionerDetails for user_id=${req.user.id}`, { ip: req.ip })
}

const addLabPractitionerDetails = (req, res) => {
  const { name, line1, line2, line3, contact_no, country, state, district, city, pin_code } = req.body;
  lab_practitioner_details.create({
    user_id: req.user.id,
    name,
    line1,
    line2,
    line3,
    country,
    contact_no,
    state,
    district,
    city,
    pin_code
  }).then(details => {
    res.send("Lab Practitioner details added Successfully");
    logger.http(`POST | addLabPractitionerDetails for user_id=${req.user.id}`, {
      ip: req.ip,
      details
    })
  }).catch(err => {
    res.send("Error")
    logger.error(`HTTPError | Addding lab practitioner details for user_id=${req.user.id}`, { ip: req.ip, err})
  })
}

module.exports = {
  getLabPractitionerDetails,
  addLabPractitionerDetails
}