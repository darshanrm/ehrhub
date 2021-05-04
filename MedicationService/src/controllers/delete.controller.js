const {
  medication_pdf,
  issued_medicines,
  medications,
} = require('../models');

const deleteById = (req, res) => {
  //PENDING: pass on medication_id to pdf message queue to enable this functionality

  // medication_pdf.destroy({
  //   where: {
  //     id: req.query.documentId,
  //   },
  // });

  issued_medicines.destroy({
    where: {
      medication_id: req.query.documentId,
    },
  });
  medications.destroy({
    where: {
      id: req.query.documentId,
    },
  });
};

module.exports = {
  deleteById,
};
