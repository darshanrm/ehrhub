const logger = require("../middlewares/logger");
const amqp = require("amqplib");
const { publishReport, publishPrescription } = require("../../rabbitmq");
const axios = require("axios");
require("dotenv").config({ path: __dirname + "/../../.env" });

const storeDocument = (req, res) => {
  const patientName = req.body.patientName;
  const hcpName = req.body.hcpName;
  const reason = req.body.reason;
  const summary = req.body.summary;
  const medicines = req.body.medicines;
  const clinicName = req.body.clinicName;
  const patient_id = req.body.patient_id;
  const hcp_id = req.body.hcp_id;
  const document_name = req.body.document_name;
  let visitId;
  const medicines = req.body.medicines;
  var reportData = null;
  var prescriptionData = null;

  const visit = axios({
    method: "post",
    url: `${process.env.VISITS_SERVICE_URL}/visitDetails/post/newVisit`,
    data: {
      patient_id,
      hcpId: req.body.hcp_id,
      facilityId: req.body.facilityId,
      vitalsId: req.body.vitalsId,
      visitId: req.body.visitId,
    },
  })
    .then(function (visitData) {
      visitId = visitData.data.id;
      //data to be submitted to queue
      reportData = {
        patientName,
        hcpName,
        reason,
        summary,
        medicines,
        clinicName,
        visitId,
        patient_id,
        hcp_id,
        document_name,
      };

      axios({
        method: "post",
        url: `${process.env.PRESCRIPTIONS_SERVICE_URL}/Prescription/post/newPrescription`,
        data: {
          visitId,
          hcpId = hcp_id,
          patient_id,
          medicines,
        },
      })
      .then((prescription)=>{
        prescriptionData = {
          prescription_id = prescription.id,
          clinicName,
          hcpName,
          patientName,
          medicines,
          patient_id,
          hcpId,
          visitId
        }
      })

      logger.log({
        level: "http",
        message: `Post request for storing visit document for patient ${userId}`,
        metaData: {
          ip: req.ip,
          performedBy: req.hcpId,
        },
      });
      publishReport(reportData);
      publishPrescription(prescriptionData);
    })
    .catch(function (err) {
      console.log(err);
    });
};

module.exports = {
  storeDocument,
};
