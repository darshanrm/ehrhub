const { prescriptions, prescribed_medicines } = require("../models");
const { publishToQueue } = require("../../rabbitmq");

const createNewPrescription = (req, res) => {
  prescriptions
    .create({
      patient_id: req.body.patient_id,
      hcp_id: req.body.hcpId,
      visit_id: req.body.visitId,
    })
    .then((prescription) => {
      let counter = 0;
      let size = req.body.medicines.length;
      req.body.medicines.forEach((medicine) => {
        prescribed_medicines
          .create({
            prescription_id: prescription.id,
            medicine_id: medicine.id,
            medicine_name: medicine.name,
            morning_count: medicine.morning,
            afternoon_count: medicine.afternoon,
            evening_count: medicine.evening,
            total: medicine.total,
            no_of_days: medicine.no_of_days,
            note: medicine.note,
          })
          .then(counter++);
      });

      let completionStatus = () => {
        if (counter == size) {
          clearInterval(timer);
          res.send(prescription);
        }
      };
      let timer = setInterval(completionStatus, 10);
    });
};

module.exports = {
  createNewPrescription,
};
