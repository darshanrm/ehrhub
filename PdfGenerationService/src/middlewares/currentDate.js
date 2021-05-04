var today = new Date();

var date = today.getDate();
var month = today.getMonth();
var year = today.getFullYear();
var monthInWords;

switch(month){
    case 1:
        monthInWords = "January";
        break;
    case 2:
        monthInWords = "February";
        break;
    case 3:
        monthInWords = "March";
        break;
    case 4:
        monthInWords = "April";
        break;
    case 5:
        monthInWords = "May";
        break;
    case 6:
        monthInWords = "June";
        break;
    case 7:
        monthInWords = "July";
        break;
    case 8:
        monthInWords = "August";
        break;
    case 9:
        monthInWords = "September";
        break;
    case 10:
        monthInWords = "October";
        break;
    case 11:
        monthInWords = "November";
        break;
    case 12:
        monthInWords = "December";
        break;
    default:
        monthInWords = "not found";
        
}
 let dateFormatted = monthInWords+" "+date+", "+year;

 module.exports = {
     'date':dateFormatted
 }