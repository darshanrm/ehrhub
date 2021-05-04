const { pharmacist_details } = require('../models');
const logger = require('../middlewares/logger');

const getPharmacistDetails = async (req, res) => {
  const details = await pharmacist_details.findOne({
    where: {
      user_id: req.user.id
    }
  });
  res.send(details);
  logger.http(`GET | getPharmacistDetails for user_id=${req.user.id}`, {
    ip: req.ip
  });
}

const addPharmacistDetails = (req, res) => {
  const { name, line1, line2, line3, contact_no, country, state, district, city, pin_code } = req.body;
  pharmacist_details.create({
    user_id: req.user.id,
    name,
    line1,
    line2,
    line3,
    contact_no,
    country,
    state,
    district,
    city,
    pin_code
  }).then(details => {
    res.send("Pharmacist details added Successfully")
    logger.http(`POST | addPharmacistDetails for user_id=${req.user.id}`, { ip: req.ip })
  }).catch(err => {
    res.send("Error")
    logger.error(`HTTPError | adding pharmacist details for user_id=${req.user.id}`, { ip: req.ip, err})
  });
}

module.exports = {
  getPharmacistDetails,
  addPharmacistDetails
}