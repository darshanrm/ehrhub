const {
  prescribed_medicines,
  prescriptions,
  prescription_pdf,
} = require("../models");

const deleteById = (req, res) => {
  //PENDING: Pass on prescription_id to pdf message queue to enable this functionality

  // prescription_pdf.destroy({
  //   where: {
  //     id: req.query.documentId,
  //   },
  // });
  prescribed_medicines.destroy({
    where: {
      prescription_id: req.query.documentId,
    },
  });
  prescriptions.destroy({
    where: {
      id: req.query.documentId,
    },
  });
};

module.exports = {
  deleteById,
};
