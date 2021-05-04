const models = require('../models');
const logger = require('../middlewares/logger');

const getAllMedicalHistory = (req, res) => {
  let result = {};

  models.allergies.findAll({ where: { patient_id: req.params.patient_id }}).then(allergies => {
    if(allergies){
      result.allergies = allergies;
    }
  })

  models.genetic_diseases.findAll({ where: { patient_id: req.params.patient_id }}).then(genetic_diseases => {
    if(genetic_diseases){
      result.genetic_diseases = genetic_diseases;
    }
  })

  models.immunizations.findAll({ where: { patient_id: req.params.patient_id }}).then(immunizations => {
    if(immunizations){
      result.immunizations = immunizations;
    }
  })

  models.major_diseases.findAll({ where: { patient_id: req.params.patient_id }}).then(major_diseases => {
    if(major_diseases){
      result.major_diseases = major_diseases;
    }
  })

  models.major_medications.findAll({ where: { patient_id: req.params.patient_id }}).then(major_medications => {
    if(major_medications){
      result.major_medications = major_medications;
    }
  })

  models.side_effects.findAll({ where: { patient_id: req.params.patient_id }}).then(side_effects => {
    if(side_effects){
      result.side_effects = side_effects;
    }
  })

  logger.http(`GET | getMedicalHistory for patient_id=${req.params.patient_id}`, {
    ip: req.ip,
    user: req.user.id
  })
  res.send(result);

}

const addAllergy = (req, res) => {
  const { allergic_to, severity, since_when, till } = req.body;

  models.allergies.create({
    patient_id: req.params.patient_id,
    allergic_to,
    severity,
    since_when,
    till
  }).then(allergy => {
    logger.http(`POST | addAllergy for patient_id=${req.params.patient_id}`, {
      ip: req.ip,
      allergy
    });
    res.send("Addedd Successfully...")
  })
}

const addMajorDisease = (req, res) => {
  const { disease_id, since_when, doctor_id, till, facility_id, isCured } = req.body;

  models.major_diseases.create({
    patient_id: req.params.patient_id,
    disease_id,
    since_when,
    till,
    doctor_id,
    facility_id,
    isCured
  }).then(disease => {
    logger.http(`POST | addMajorDisease for patient_id=${req.params.patient_id}`, {
      ip: req.ip,
      disease
    });
    res.send("Data Added Successfully...")
  })
}

const addMajorMedication = (req, res) => {
  const { medicine_id, since_when, till, dosage, side_effects } = req.body;

  models.major_medications.create({
    patient_id: req.params.patient_id,
    medicine_id,
    since_when,
    till,
    dosage,
    side_effects
  }).then(medication => {
    logger.http(`POST | addMajorMedication for patient_id=${req.params.patient_id}`, {
      ip: req.ip,
      medication
    });
    res.send("Data Added Successfully...")
  })
}

const addGeneticDisease = (req, res) => {
  const { relation, disease_id, since_when, till, isCured } = req.body;

  models.genetic_diseases.create({
    patient_id: req.params.patient_id,
    relation, 
    disease_id,
    since_when,
    till,
    isCured
  }).then(disease => {
    logger.http(`POST | addGeneticDisease for patient_id=${req.params.patient_id}`, {
      ip: req.ip,
      disease
    });
    res.send("Data Added Successfully...");
  })
}

const addSideEffect = (req, res) => {
  const { medication_id, medicine_id, description, image } = req.body;

  models.side_effects.create({
    patient_id: req.params.patient_id,
    medication_id,
    medicine_id,
    description,
    image
  }).then(effect => {
    logger.http(`POST | addSideEffect for patient_id=${req.params.patient_id}`, {
      ip: req.ip,
      effect
    });
    res.send("Data Added Successfully...")
  })
}

const addImmunization = (req, res) => {
  const { vaccine_id, doctor_id, facility_id, age, reactions, vaccination_date } = req.body;

  models.immunizations.create({
    patient_id: req.params.patient_id,
    vaccine_id,
    reactions,
    vaccination_date,
    doctor_id,
    facility_id,
    age
  })
}

module.exports = {
  getAllMedicalHistory,
  addAllergy,
  addGeneticDisease,
  addMajorDisease,
  addMajorMedication,
  addSideEffect,
  addImmunization
}