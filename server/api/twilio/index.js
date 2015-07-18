var express = require('express'),
  env = require('../../config/local.env.sample.js'),
  twilio = require('twilio')(env.TWILIO_SID, env.TWILIO_KEY),
  config = require('../../config/environment'),
  router = express.Router();

  router.post("/", getMessage);

function getMessage(req, res){
  console.log(req.body);
};

module.exports = router;
