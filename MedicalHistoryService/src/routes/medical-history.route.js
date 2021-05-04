const router = require('express').Router();
const { authenticate } = require('../middlewares/auth');
const { medicalHistoryController } = require('../controllers');

/**
 * @path: /medical-history/all/:patient_id
 * @method: GET
 * @description: Have to show the entire medical history of the patient. The details are as folowds:
                - allergies
                - major diseases
                - major medications
                - genetic diseases
                - side effects
                - immunizations
    @parameter: patient_id
 */
router
  .route('/all/:patient_id')
  .get(authenticate, medicalHistoryController.getAllMedicalHistory);

/**
 * @path: /medical-history/allergies
 * @method: POST
 * @description: Add new allergy to the system
 * @parameter: patient_id (from user mapping service)
 */
router
  .route('/allergies/:patient_id')
  .post(authenticate, medicalHistoryController.addAllergy);

router
  .route('/major_diseases/:patient_id')
  .post(authenticate, medicalHistoryController.addMajorDisease);

router
  .route('/major_medications/:patient_id')
  .post(authenticate, medicalHistoryController.addMajorMedication);

router
  .route('/genetic_diseases/:patient_id')
  .post(authenticate, medicalHistoryController.addGeneticDisease);

router
  .route('/immumizations/:patient_id')
  .post(authenticate, medicalHistoryController.addImmunization);

router
  .route('/side_effects/:patient_id')
  .post(authenticate, medicalHistoryController.addSideEffect);

module.exports = router;