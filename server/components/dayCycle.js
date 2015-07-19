
var env = require('../config/local.env.sample.js');
var twilio = require('twilio')(env.TWILIO_SID, env.TWILIO_KEY);
var my_number = "+18055902511";

var dayCycle = {};

var getCycleDay = function(day) {
  var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
  var firstDate = new Date(day);
  var secondDate = new Date();
  var dayDiff = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
  return dayDiff % 28;
};

dayCycle.getMessage = function(day) {
  var dayNum = getCycleDay(day);
  var greeting = 'Hello! You are currently on Day ' + dayNum + ' of your cycle. ';
  var message;
  if (dayNum < 8) {
    message = 'This means that you are not likely to get pregnant. Have a wonderful day!';
  } else if (dayNum >=8 && dayNum <= 19) {
    message = 'This means that there is a high chance of ovulation today. If you do not wish to get pregnant, be sure to abstain from sexual intercourse or use a birth control method such as a condom during intercourse today.';
  } else if (dayNum > 19) {
    message = 'This means that you are not likely to get pregnant. If you start your period today, remember REPLY with the text "today" to ensure that you will continue receiving accurate updates about your fertility cycle.'
  }
  return greeting + message
};

module.exports = dayCycle;
