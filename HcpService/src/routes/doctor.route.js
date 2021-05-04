const router = require('express').Router();
const { authenticate } = require('../middlewares/auth');
const { doctorController } = require('../controllers');

/**
 * @path: /hcp/doctor/details
 * @method: GET
 * @parameters: doctor_id (obtained from the access_token)
 * @description: This API will return all personal and professional details of doctor atching doctor_id . find doctor_id from user_id
 * @tables: doctor_personal_details, hcp_professional_details, facilities
 */
router
  .route('/details/:doctor_id')
  .get(authenticate, doctorController.getDoctorDetailById);

/**
  * @path: /hcp/doctor/personal_details
  * @method: POST
  * @parameter: user_id(obtained from access_token)
  * @description: To add personal details of doctor
  * @tables: doctor_personal_details
  */
router
  .route('/personal_details')
  .post(authenticate, doctorController.addDoctorPersonalDetails);

/**
  * @path: /hcp/doctor/professional_details
  * @method: POST
  * @parameter: user_id(obtained from access_token)
  * @description: To add professional details of doctor / of any hcp
  * @tables: hcp_professional_details
  */
router
 .route('/professional_details')
 .post(authenticate, doctorController.addHcpProfessionalDetails);

module.exports = router;