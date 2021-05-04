const { facilities, hcp_professional_details } = require('../models');
const logger = require('../middlewares/logger');

const getFacilityById = async (req, res) => {
  const facility = await facilities.findOne({
    where: {
      id: req.params.facility_id
    }
  });
  res.send(facility);
  logger.http(`GET | getFacilityById for facility_id=${req.params.facility_id} by user_id=${req.user.id}`, { ip: req.ip });
}

const addFacilityDetails = (req, res) => {
  const { f_name, line1, line2, line3, country, state, district, city, pin_code, contact_no, timing } = req.body;
  facilities.create({
    f_name, line1, line2, line3, country, state, district, city, pin_code, contact_no, timing
  }).then(async (facility) => {
    await hcp_professional_details.update({ facility_id: facility.id}, {
      where: {
        user_id: req.user.id
      }
    });
    res.send("Facility Details added Successfully")
    logger.http(`POST | addFacilityDetails for user_id=${req.user.id}`, {
      ip: req.ip
    })
  }).catch(err => {
    res.send("Error")
    logger.error(`HTTPError | Adding Facility details for user_id=${req.user.id}`, { ip: req.ip, err})
  })

}

module.exports = {
  getFacilityById,
  addFacilityDetails
}