var express = require('express'),
  env = require('../../config/local.env.sample.js'),
  twilio = require('twilio')(env.TWILIO_SID, env.TWILIO_KEY),
  config = require('../../config/environment'),
  User = require('../user.model'),
  router = express.Router();

  router.post("/", getMessage);

function getMessage(req, res){
  console.log(req.body);
  // registration flow
  User.findOne({phone: req.body.From}, function(err, user) {
  	if (!user) {
  		User.create({phone: req.body.From}, function(err, user) {
  			res.json(200, user);
  		});
  	}
  	else {
  		console.log("already registered");
  	}
  });
};

module.exports = router;
