const logger = require("../middlewares/logger");
const amqp = require("amqplib");
const axios = require("axios");
require('dotenv').config({ path: __dirname + '/../../.env'});

const storeDocument = (req, res) => {
  const patientName = req.body.patientName;
  const hcpName = req.body.hcpName;
  const reason = req.body.reason;
  const summary = req.body.summary;
  const medicines = req.body.medicines;
  const clinicName = req.body.clinicName;
  const userId = req.body.userId;
  const hcp_id = req.body.hcp_id;
  const document_name = req.body.document_name;
  let visitId;

  axios({
    method: "post",
    url: `${process.env.VISITS_SERVICE_URL}/visitDetails/post/newVisit`,
    data: {
      userId: req.body.userId,
      hcpId: req.body.hcp_id,
      facilityId: req.body.facilityId,
      vitalsId: req.body.vitalsId,
      visitId: req.body.visitId,
    },
  })
    .then(function (visitData) {
      visitId = visitData.data.id;
      //data to be submitted to queue
      const data = {
        patientName,
        hcpName,
        reason,
        summary,
        medicines,
        clinicName,
        visitId,
        userId,
        hcp_id,
        document_name,
      };

      logger.log({
        level: "http",
        message: `Post request for storing visit document for patient ${userId}`,
        metaData: {
          ip: req.ip,
          performedBy: req.hcpId,
        },
      });
      console.log(data);
      connect(data);
    })
    .catch(function (err) {
      console.log(err);
    });

  async function connect(data) {
    try {
      const connection = await amqp.connect("amqp://localhost:5672");
      const channel = await connection.createChannel();
      const result = await channel.assertQueue("VisitData", { durable: true });
      channel.sendToQueue("VisitData", Buffer.from(JSON.stringify(data)), {
        persistent: true,
      });
      logger.log({
        level: "http",
        message: `Visit report for patient ${userId} and healthcare professional ${hcp_id} has been submitted to the queue`,
        metaData: {
          performedBy: hcp_id,
        },
      });
      res.status(200).send(`Document submitted to the queue`);
    } catch (error) {
      logger.log({
        level: "error",
        message: `Some error occured while submitting the visit report for patient ${userId} and healthcare professional ${hcp_id} to the queue`,
        metaData: {
          performedBy: req.hcp_id,
        },
      });

      res.status(400).send(`Failed to submit the report. Please try again`);
    }
  }
};

module.exports = {
  storeDocument,
};
