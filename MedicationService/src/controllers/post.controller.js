const { medications, issued_medicines } = require('../models');
const { publishToQueue } = require('../../rabbitmq');

const createNewMedication = (req, res) => {
  medications
    .create({
      patient_id: req.body.userId,
      hcp_id: req.body.hcpId,
      visit_id: req.body.visitId,
    })
    .then((medication) => {
      let counter = 0;
      let size = req.body.medicines.length;
      req.body.medicines.forEach((medicine) => {
        issued_medicines
          .create({
            medication_id: medication.id,
            medicine_id: medicine.id,
            medicine_name: medicine.name,
            total: medicine.total,
          })
          .then(counter++);
      });
      publishToQueue(req.body);
      let completionStatus = () => {
        if (counter == size) {
          clearInterval(timer);
          res.send("Medicine record saved successfully");
        }
      };
      let timer = setInterval(completionStatus, 10);
    });
};

module.exports = {
  createNewMedication,
};
