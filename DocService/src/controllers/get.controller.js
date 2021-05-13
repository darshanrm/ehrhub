const logger = require("../middlewares/logger");
const axios = require("axios");
require("dotenv").config({ path: __dirname + "/../../.env" });

//docs related to one patient
const getPatientDocuments = async (req, res) => {
  let doctor_ids = [];
  let visit_details = {};
  let doctor_details = {};
  let all_visits = {};

  //patient details
  const patient = axios.get("http://localhost:3001/patient/details", {
    params: {
      patient_id: req.query.patient_id,
    },
  });

  //patient medical history
  const history = axios.get("http://localhost:3003/medical-history/all", {
    params: {
      patient_id: req.query.patient_id,
    },
  });

  const doctors = axios
    .get("http://localhost:8084/visit/details/byPatientId", {
      params: {
        userId: req.query.patient_id,
      },
    })
    .then((visits) => {
      visits.data.forEach((visit) => {
        doctor_ids.push(visit.doctor_id);
        visit_details[visit.doctor_id] = visit;
      });
      axios
        .get("http://localhost:3002/hcp/details", {
          params: {
            doctor_id: doctor_ids,
          },
        })
        .then((details) => {
          details.data.forEach((detail) => {
            doctor_details[detail] = detail.personalDetails.id;

            const merge = (object1, object2) => {
              for (key in object1) {
                all_visits[`${key}`] = {
                  ...object1[key],
                  ...object2[key],
                };
              }
            };

            merge(visit_details, doctor_details);
          });
        });

      Promise.all([patient, history]).then((patient_and_history) => {
        res.send({ patient_and_history, all_visits });
      });
    });
};

//docs related to one visit
const getVisitDocuments = (req, res) => {
  let visitIds = [];
  try {
    axios
      .get(
        `${process.env.VISITS_SERVICE_URL}/visitDetails/get/byPatientIdAndHcpId?userId=` +
          req.query.userId +
          "&hcpId=" +
          req.query.hcpId
      )
      .then((documents) => {
        documents.data.forEach((document) => {
          visitIds.push(document.id);
        });
        console.log(visitIds);
        axios
          .get(
            `${process.env.VISIT_UPLOADED_DOC_SERVICE_URL}/Documents/get/getVisitDocuments`,
            {
              params: {
                visitIds: visitIds,
              },
            }
          )
          .then(function (response) {
            console.log(response.data);
            res.send(JSON.stringify(response.data));
          })
          .catch(function (error) {
            console.log(error);
          });
      });
  } catch (error) {
    console.log(error);
  }
};

//docs writtten by healthcare professional
const getAuthoredDocuments = (req, res) => {
  let visits = {};
  let patient_ids = [];
  let patients = {};

  //details of visits administered by HCP
  axios
    .get("http://localhost:8084/visitDetails/get/byHcpId?hcpId=", {
      params: {
        hcpId: req.query.hcpId,
      },
    })
    .then((documents) => {
      documents.data.forEach((document) => {
        patient_ids.push(document.patient_id);
        visits[document.patient_id] = document;
      });

      //patient details per visit
      axios
        .get("http://localhost:3001/patient/details", {
          params: {
            patient_id: patient_ids,
          },
        })
        .then((documents) => {
          documents.data.forEach((document) => {
            patients[document.id] = document;
          });

          const merge = (object1, object2) => {
            for (key in object1) {
              output[`${key}`] = {
                ...object1[key],
                ...object2[key],
              };
            }
            console.log(output);
            res.send(output);
          };

          merge(visits, patients);
        });
    });
};

const getLabDetails = (req, res) => {
  //patient personal details
  const patient = axios.get("http://localhost:3001/patient/details", {
    params: {
      patient_id: req.query.patient_id,
    },
  });

  //patient medical history
  const history = axios.get("http://localhost:3003/medical-history/all", {
    params: {
      patient_id: req.query.patient_id,
    },
  });

  const prescription = axios.get(
    "http://localhost:8087/Prescription/get/byPrescriptionId",
    {
      params: {
        prescription_id: req.query.prescription_id,
      },
    }
  );

  Promise.all([patient, history, prescription]).then((data) => {
    res.send(data);
  });
};

const getByVisitId = (req, res) => {
  //Visit report
  const report = axios.get(
    "http://localhost:8081/Documents/get/getVisitDocuments",
    {
      params: {
        visitIds: req.query.visitId,
      },
    }
  );

  //prescription related to visit
  const prescription = axios.get(
    "http://localhost:8087/Prescription/get/byVisitId",
    {
      params: {
        visitId: req.query.visitId,
      },
    }
  );

  //Medication
  const medication = axios.get(
    "http://localhost:8088/Medication/get/byVisitId",
    {
      params: {
        visitId: req.query.visitId,
      },
    }
  );

  //patient vitals
  const patient_vitals = axios
    .get("http://localhost:3001/patient/vitals", {
      params: {
        patient_id: patient_ids,
      },
    })
    .then((documents) => {
      documents.data.forEach((document) => {
        vitals[document.patient_id] = document;
      });
    });

  //Wait for all services to return data
  Promise.all([report, prescription, medication, patient_vitals]).then(
    (visit_details) => {
      res.send(visit_details);
    }
  ).catch = (e) => {
    console.log("Error!");
    res.send("Error Occured");
  };
};

module.exports = {
  getPatientDocuments,
  getVisitDocuments,
  getAuthoredDocuments,
  getLabDetails,
  getByVisitId,
};
