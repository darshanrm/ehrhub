const router = require('express').Router();
const { authenticate } = require('../middlewares/auth');
const { facilityController } = require('../controllers');

/**
 * @path: /hcp/facility/:facility_id
 * @method: GET
 * @parameter: facility_id
 * @description: To GET the facility details of any healthcare professional 
 */
router
  .route('/:facility_id')
  .get(authenticate, facilityController.getFacilityById);

/**
 * @path: /hcp/facility
 * @method: POST
 * @parameter: user_id(obtained from access_token)
 * @description: To add the facility details of any healthcare professional
 */
router
  .route('/')
  .post(authenticate, facilityController.addFacilityDetails);

module.exports = router;