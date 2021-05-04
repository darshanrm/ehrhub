const { authenticate } = require('../middlewares/auth');
const { pharmacyController } = require('../controllers');
const router = require('express').Router();

/**
 * @path: /hcp/pharmacy/details
 * @method: GET
 * @paramter: user_id
 * @description: To get the details of the pharmacist
 */
router
  .route('/details')
  .get(authenticate, pharmacyController.getPharmacistDetails);

/**
 * @path: /hcp/pharmacy/details
 * @method: POST
 * @parameter: user_id
 * @description: To add pharmacist details to the system
 */
router
  .route('/details')
  .post(authenticate, pharmacyController.addPharmacistDetails);
  
module.exports = router;