const router = require('express').Router();
const { labController, doctorController } = require('../controllers');
const { authenticate } = require('../middlewares/auth');

/**
 * @path: /hcp/lab/details
 * @method: GET
 * @parameter: user_id
 * @description: Fetch the details of lab practitioner
 */
router
  .route('/details')
  .get(authenticate, labController.getLabPractitionerDetails);

/**
 * @path: /hcp/lab/details
 * @methodL POST
 * @parameter: user_id
 * @description: Adding the details of lab practitioner 
 */
router
  .route('/details')
  .post(authenticate, labController.addLabPractitionerDetails);

/**
 * @path: /hcp/lab/professional-details
 * @method: POST
 * @parameter: user_id
 * @description: To add professional details of the hcp
 */
router
  .route('/professional-details')
  .post(authenticate, doctorController.addHcpProfessionalDetails);

module.exports = router;