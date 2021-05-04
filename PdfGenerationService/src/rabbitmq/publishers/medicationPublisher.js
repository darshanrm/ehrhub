const logger = require('../../middlewares/logger');
const { medicationPublishChannel } = require('../connection');

connst publishMedication = (pdf) => {
	try {
		medicationPublishChannel.sendToQueue("medicationPDF", Buffer.from(JSON.stringify(pdf)), {
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

module.exports = { publishMedication }