const { prescriptions, prescribed_medicines } = require("../models");

const getByPrescriptionId = (req, res) => {
  prescribed_medicines
    .findAll({
      where: {
        prescription_id: req.query.prescriptionId,
      },
    })
    .then((medicines) => {
      res.send(medicines);
    });
};

const getByVisitId = (req, res) => {
  prescriptions
    .findAll({
      where: {
        visit_id: req.query.visitId,
      },
    })
    .then((fetchedPresriptions) => {
      let response = [];
      fetchedPresriptions.forEach((prescription) => {
        prescribed_medicines
          .findAll({
            where: {
              prescription_id: prescription.id,
            },
          })
          .then((medicines) => {
            response.push(medicines);
          });
      });
      let checkStatus = () => {
        if (Object.keys(fetchedPresriptions).length === response.length) {
          clearInterval(timer);
          res.send(response);
        }
      };
      let timer = setInterval(checkStatus, 10);
    });
};

const getByPatientId = (req, res) => {
  prescriptions
    .findAll({
      where: {
        patient_id: req.query.userId,
      },
    })
    .then((fetchedPresriptions) => {
      let response = [];
      fetchedPresriptions.forEach((prescription) => {
        prescribed_medicines
          .findAll({
            where: {
              prescription_id: prescription.id,
            },
          })
          .then((medicines) => {
            response.push(medicines);
          });
      });
      let checkStatus = () => {
        if (Object.keys(fetchedPresriptions).length === response.length) {
          clearInterval(timer);
          res.send(response);
        }
      };
      let timer = setInterval(checkStatus, 10);
    });
};

const getByHcpId = (req, res) => {
  prescriptions
    .findAll({
      where: {
        hcp_id: req.query.hcpId,
      },
    })
    .then((fetchedPresriptions) => {
      let response = [];
      fetchedPresriptions.forEach((prescription) => {
        prescribed_medicines
          .findAll({
            where: {
              prescription_id: prescription.id,
            },
          })
          .then((medicines) => {
            response.push(medicines);
          });
      });
      let checkStatus = () => {
        if (Object.keys(fetchedPresriptions).length === response.length) {
          clearInterval(timer);
          res.send(response);
        }
      };
      let timer = setInterval(checkStatus, 10);
    });
};

const getByPatientIdAndHcpId = (req, res) => {
  prescriptions
    .findAll({
      where: {
        patient_id: req.query.userId,
        hcp_id: req.query.hcpId,
      },
    })
    .then((fetchedPresriptions) => {
      let response = [];
      fetchedPresriptions.forEach((prescription) => {
        prescribed_medicines
          .findAll({
            where: {
              prescription_id: prescription.id,
            },
          })
          .then((medicines) => {
            response.push(medicines);
          });
      });
      let checkStatus = () => {
        if (Object.keys(fetchedPresriptions).length === response.length) {
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
  getByPrescriptionId,
  getByVisitId,
};
