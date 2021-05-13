const logger = require("../middlewares/logger");
const { lab_uploaded_docs, lab_visits } = require("../models");

//get report by patient id
const getDocumentsByPatientId = async (req, res) => {
  let response = new Array();
  await lab_visits
    .findAll({
      where: {
        patient_id: req.query.userId,
      },
    })
    .then((visits) => {
      let responseLength = Object.keys(visits).length;
      visits.forEach((visit) => {
        lab_uploaded_docs
          .findAll({
            where: {
              visit_id: visit.id,
            },
          })
          .then((document) => {
            response.push(document);
          });
      });
      let checkDocs = () => {
        if (response.length === responseLength) {
          clearInterval(check);
          res.send(response);
        }
      };
      let check = setInterval(checkDocs, 10);
    });
};

const getDocumentsByHcpId = async (req, res) => {
  let response = new Array();
  await lab_visits
    .findAll({
      where: {
        hcp_id: req.query.hcpId,
      },
    })
    .then((visits) => {
      let responseLength = Object.keys(visits).length;
      visits.forEach((visit) => {
        lab_uploaded_docs
          .findAll({
            where: {
              visit_id: visit.id,
            },
          })
          .then((document) => {
            response.push(document);
          });
      });
      let checkDocs = () => {
        if (response.length === responseLength) {
          clearInterval(check);
          res.send(response);
        }
      };
      let check = setInterval(checkDocs, 10);
    });
};

const getDocumentsByPatientIdAndHcpId = async (req, res) => {
  let response = new Array();
  await lab_visits
    .findAll({
      where: {
        patient_id: req.query.userId,
        hcp_id: req.query.hcpId,
      },
    })
    .then((visits) => {
      let responseLength = Object.keys(visits).length;
      visits.forEach((visit) => {
        lab_uploaded_docs
          .findAll({
            where: {
              visit_id: visit.id,
            },
          })
          .then((document) => {
            response.push(document);
          });
      });
      let checkDocs = () => {
        if (response.length === responseLength) {
          clearInterval(check);
          res.send(response);
        }
      };
      let check = setInterval(checkDocs, 10);
    });
};

const getDocumentsByVisitId = (req, res) => {
  lab_uploaded_docs
    .findAll({
      where: {
        visit_id: req.query.visitId,
      },
    })
    .then((document) => {
      res.send(document);
    }).catch = (e) => {
    res.send("error");
  };
};

module.exports = {
  getDocumentsByPatientId,
  getDocumentsByHcpId,
  getDocumentsByPatientIdAndHcpId,
  getDocumentsByVisitId,
};
