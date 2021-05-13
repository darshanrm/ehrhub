const pdfkit = require("pdfkit");
const fs = require("fs");
const path = require("path");
const {
  publishPrescription,
} = require("../rabbitmq/publishers/prescriptionPublisher");

const createPrescription = (data) => {
  //create new document
  const doc = new pdfkit({ userPassword: "darsh123" });
  //save pdf file
  let fileloc = path.join(__dirname, "prescription.pdf");
  let fileState = doc.pipe(fs.createWriteStream(fileloc));

  //Hospital Name
  doc.fontSize(25).text(data.clinicName, 200, 30);

  //Add hospital image
  doc.image(__dirname + "/Jellyfish.jpg", {
    fit: [250, 300],
    align: "center",
    valign: "center",
  });

  doc
    .addPage()
    .fontSize(15)
    .text("Patient: ", 0, 40)
    .text(data.patientName, 50, 40)
    .text("Doctor: ", 300, 40)
    .text(data.hcpName, 350, 40);

  doc.fontSize(20).text("Medicines", 0, 150).fontSize(10);
  data.medicines.forEach((medicine) => {
    doc.list(medicine.name);
  });
  doc.moveDown(0.5);

  // Add some text with annotations
  doc
    .addPage()
    .fillColor("blue")
    .fontSize(8)
    .text("By EHR", 300, 300)
    .underline(300, 300, 160, 27, { color: "#0000FF" })
    .link(300, 300, 160, 27, "http://google.com/");

  // Finalize PDF file
  fileState.on("close", readAfter);
  doc.end();

  //store pdf and metadata
  var pdf = {};
  pdf.patient_id = data.patient_id;
  pdf.hcpId = data.hcpId;
  pdf.visitId = data.visitId;

  //read report
  function readAfter() {
    if (fs.existsSync(fileloc)) {
      console.log("file exists");
      const fileBuffer = fs.readFileSync(
        path.join(__dirname, "prescription.pdf")
      );
      pdf.pdfBuffer = fileBuffer;
    } else {
      console.log("file does not exist");
    }
  }

  //call publisher
  publishPrescription(pdf);
};

module.exports = {
  createPrescription,
};
