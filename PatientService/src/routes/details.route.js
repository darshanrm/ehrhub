const router = require('express').Router();
const { authenticate } = require('../middlewares/auth');
const { detailsController } = require('../controllers');
/**
 * @path: /patient/details
 * @method: GET
 * @description: Feth patient's personal details
 */
router
  .route('/:patient_id')
  .get(authenticate, detailsController.getPatientDetailsByUserId);

/**
 * have to add authorization as well
 * @path: /patient/details
 * @method: POST
 * @description: Adding patient details to the system.
 */
router
  .route('/')
  .post(authenticate, detailsController.addPatientDetails);

module.exports = router;