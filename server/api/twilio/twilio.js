var express = require('express'),
  twilio = require('twilio')(TWILIO_SID, TWILIO_KEY),
  config = require('../../config/environment'),
  router = express.Router();

  router.post("/", getMessage);
  router.post("/send/", sendMessage);

var sendMessage = function(req, res) {

}

var getMessage = function(req, res){
  console.log(req.body);
};
