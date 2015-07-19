var express = require('express'),
  env = require('../../config/local.env.sample.js'),
  twilio = require('twilio')(env.TWILIO_SID, env.TWILIO_KEY),
  config = require('../../config/environment'),
  User = require('../user/user.model'),
  Thing = require('../thing/thing.model'),
  router = express.Router(),
  twilioTxt = require('../../components/twilio.js')


  router.post("/", getMessage);

function getMessage(req, res){
  console.log(req.body);
  // registration flow
  var user_phone = req.body.From;
  var message = req.body.Body;
  User.findOne({phone: user_phone}, function(err, user) {
  	if (!user) {
      var new_user = new User();
      new_user.phone = user_phone;
  		new_user.save(function(err, data) {
        if(err) console.log('error', err);
  			else {
          res.json(200, data);
          var text = 'Welcome! Please REPLY with the date of the first day of your last period in the format MM-DD. For example, June 01 would be "06-01". If you do not remember the date of your last period, please send a text with the date of the first day of your next period when it next occurs/ If today is the first day of your period, you can reply with "today"';
          twilioTxt.sendMessage(user_phone, text);
        }
  		});
  	}
  	else {
      res.json(200, user);
      var response = analyzeBody(message, user);
      twilioTxt.sendMessage(user_phone, response);
  	}
  });
};

var analyzeBody = function(body, user) {
  body = body.toLowerCase();
  if (body === 'new user'|| body === 'newuser'){
    return 'Welcome! Please REPLY with the date of the first day of your last period in the format MM-DD. For example, June 01 would be "06-01". If you do not remember the date of your last period, please send a text with the date of the first day of your next period when it next occurs/ If today is the first day of your period, you can reply with "today"';
  } else if (body.search(/([0-9]{1,2}[-][0-9]{1,2})\w+/) !== -1 || body.toLowerCase() === 'today') {

    if (body.toLowerCase() === 'today') {
      user.entryDate = new Date();
    } else {
      var new_date = '2015-' + body;
      user.entryDate = new Date(new_date);
    }
    user.save(function(err, data){
      if(err) return 'Sorry, there was an error saving the date. Please try again'
      else {
        return 'Thanks! We have recorded you period as starting on ' + body + '. Wait for your daily text messages to start arriving tomorrow!'
      }
    })
  } else if (body.search(/[?]/) !== -1) {
    var new_question = new Thing();
    new_question.info = body;
    new_question.phone = user.phone;
    return 'Thanks! We have received your question: "' + body + '". We will text you an answer as soon as we can get to it.'
  } else {
    console.log(body);
  };
}

module.exports = router;
