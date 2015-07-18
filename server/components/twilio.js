//require the Twilio module and create a REST client
var env = require('../config/local.env.sample.js');
var twilio = require('twilio')(env.TWILIO_SID, env.TWILIO_KEY);
//var resp = new twilio.TwimlResponse();
var my_number = "+18055902511";

var TwilioTxt = {};

TwilioTxt.sendMessage = function(to, msg) {
  return twilio.sendMessage({
    to: to,
    from: my_number,
    body: msg
  }, function(err, responseData){
    if(err) {
      console.log('err', err);
    } else {
      console.log(responseData.from);
      console.log(responseData.body);
    }
  })
};

TwilioTxt.sendMessage('+15163484851', 'its kamilla');

module.exports = TwilioTxt;
