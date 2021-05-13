const pdfkit = require("pdfkit");
const fs = require("fs");
const path = require("path");
const {
  publishVisitDocument,
} = require("../rabbitmq/publishers/visitDocumentPublisher");

const createPdf = (data) => {
  //create new document
  const doc = new pdfkit({ userPassword: "darsh123" });
  //save pdf file
  let fileloc = path.join(__dirname, "report.pdf");
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
    .fontSize(8)
    .text(data.date, 0, 10)
    .fontSize(15)
    .text("Patient: ", 0, 40)
    .text(data.patientName, 50, 40)
    .text("Doctor: ", 300, 40)
    .text(data.hcpName, 350, 40);

  doc.fontSize(20).text("Medicines", 0, 150).fontSize(10);
  doc.list(data.medicines);
  doc.moveDown(0.5);

  // Add some text with annotations
  doc
    .addPage()
    .fontSize(15)
    .text("Summary:", 10, 20)
    .fontSize(10)
    .text(data.summary, 30, 50)
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
  pdf.userId = data.patient_id;
  pdf.hcp_id = data.hcp_id;
  pdf.visitId = data.visitId;
  pdf.document_name = data.document_name;

  //read report
  function readAfter() {
    if (fs.existsSync(fileloc)) {
      console.log("file exists");
      const fileBuffer = fs.readFileSync(path.join(__dirname, "report.pdf"));
      pdf.pdfBuffer = fileBuffer;
      console.log(pdf);
    } else {
      console.log("file does not exist");
    }
  }

  //call publisher
  publishVisitDocument(pdf);
};

module.exports = {
  createPdf,
};
