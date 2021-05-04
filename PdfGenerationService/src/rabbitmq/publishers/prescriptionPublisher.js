const logger = require('../../middlewares/logger');
const { prescriptionPublishChannel } = require('./connection');

const publishPrescription = (pdf) => {
	logger.log({
	    level: "http",
	    message: `PDF publish request came for visit id ${pdf.visitId}`,
	    metaData: {
	      performedBy: "PDF Genertion Service",
	    },
	 });
	try {
		prescriptionPublishChannel.sendToQueue("prescriptionPDF", Buffer.from(JSON.stringify(pdf)), {
        	persistent: true,
      	});
	      logger.log({
	        level: "http",
	        message: `Visit report for visit id ${pdf.visitId} has been submitted to the queue`,
	        metaData: {
	          performedBy: "PDF Generation Service",
	        },
	      });
	} catch(error){
		logger.log({
	        level: "error",
	        message: `Some error occured while submitting the visit report for visit ${pdf.visitId} to the queue`,
	        metaData: {
	          performedBy: "PDF Generation Service",
	        },
	      });
	}
}

module.exports = { publishPrescription }