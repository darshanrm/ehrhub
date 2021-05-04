const router = require('express').Router();
const { authenticate } = require('../middlewares/auth');
const { vitalsController } = require('../controllers');

router
  .route('/:patient_id')
  .get(authenticate, vitalsController.getVitalsByPatientId)

router
  .route('/:patient_id')
  .post(authenticate, vitalsController.addVitalsForPatientId)

module.exports = router;