const { medications, issued_medicines } = require('../models');

const getByMedicationId = (req, res) => {
  issued_medicines
    .findAll({
      where: {
        medication_id: req.query.medicationId,
      },
    })
    .then((medicines) => {
      res.send(medicines);
    });
};

const getByVisitId = (req, res) => {
  medications
    .findAll({
      where: {
        visit_id: req.query.visitId,
      },
    })
    .then((fetchedMedications) => {
      let response = [];
      fetchedMedications.forEach((medication) => {
        issued_medicines
          .findAll({
            where: {
              medication_id: medication.id,
            },
          })
          .then((medicines) => {
            response.push(medicines);
          });
      });
      let checkStatus = () => {
        if (Object.keys(fetchedMedications).length === response.length) {
          clearInterval(timer);
          res.send(response);
        }
      };
      let timer = setInterval(checkStatus, 10);
    });
};

const getByPatientId = (req, res) => {
  medications
    .findAll({
      where: {
        patient_id: req.query.userId,
      },
    })
    .then((fetchedMedications) => {
      let response = [];
      fetchedMedications.forEach((medication) => {
        issued_medicines
          .findAll({
            where: {
              medication_id: medication.id,
            },
          })
          .then((medicines) => {
            response.push(medicines);
          });
      });
      let checkStatus = () => {
        if (Object.keys(fetchedMedications).length === response.length) {
          clearInterval(timer);
          res.send(response);
        }
      };
      let timer = setInterval(checkStatus, 10);
    });
};

const getByHcpId = (req, res) => {
  medications
    .findAll({
      where: {
        hcp_id: req.query.hcpId,
      },
    })
    .then((fetchedMedications) => {
      let response = [];
      fetchedMedications.forEach((medication) => {
        issued_medicines
          .findAll({
            where: {
              medication_id: medication.id,
            },
          })
          .then((medicines) => {
            response.push(medicines);
          });
      });
      let checkStatus = () => {
        if (Object.keys(fetchedMedications).length === response.length) {
          clearInterval(timer);
          res.send(response);
        }
      };
      let timer = setInterval(checkStatus, 10);
    });
};

const getByPatientIdAndHcpId = (req, res) => {
  medications
    .findAll({
      where: {
        patient_id: req.query.userId,
        hcp_id: req.query.hcpId,
      },
    })
    .then((fetchedMedications) => {
      let response = [];
      fetchedMedications.forEach((medication) => {
        issued_medicines
          .findAll({
            where: {
              medication_id: medication.id,
            },
          })
          .then((medicines) => {
            response.push(medicines);
          });
      });
      let checkStatus = () => {
        if (Object.keys(fetchedMedications).length === response.length) {
          clearInterval(timer);
          res.send(response);
        }
      };
      let timer = setInterval(checkStatus, 10);
    });
};

module.exports = {
  getByPatientId,
  getByHcpId,
  getByPatientIdAndHcpId,
  getByVisitId,
  getByMedicationId,
};
