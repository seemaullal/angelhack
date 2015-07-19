var express = require('express'),
  env = require('../../config/local.env.sample.js'),
  twilio = require('twilio')(env.TWILIO_SID, env.TWILIO_KEY),
  config = require('../../config/environment'),
  User = require('../user/user.model'),
  Thing = require('../thing/thing.model'),
  router = express.Router(),
  twilioTxt = require('../../components/twilio.js'),
  dayCycle = require('../../components/dayCycle.js');


  router.post("/:id", sendAnswer);
  router.post("/", getMessage);

function sendAnswer(req, res){
  console.log(req.body);
  var answer = req.body.answer;
  var user_phone = req.params.id;
  var message = 'You have received a reply to your question: ' + answer;
  User.findOne({phone: req.params.id}, function(err, user) {
    twilioTxt.sendMessage(user_phone, message);
    res.send('message sent:' + message);
  })
}

function getMessage(req, res){
  console.log('received message:',req.body);
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
          var text = 'Welcome! Please REPLY with the date of the first day of your last period in the format MM-DD. For example, June 01 would be "06-01". If you do not remember the date of your last period, please send a text with the date of the first day of your next period when it next occurs. If today is the first day of your period, you can reply with "today"';
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
  var response;
  if (body === 'new user'|| body === 'newuser'){
  response =  'Welcome! Please REPLY with the date of the first day of your last period in the format MM-DD. For example, June 01 would be "06-01". If you do not remember the date of your last period, please send a text with the date of the first day of your next period when it next occurs/ If today is the first day of your period, you can reply with "today"';
  } else if (body.search(/([0-9]{1,2}[-][0-9]{1,2})\w+/) !== -1 || body.toLowerCase() === 'today') {

    if (body.toLowerCase() === 'today') {
      user.entryDate = new Date();
    } else {
      var new_date = '2015-' + body;
      user.entryDate = new Date(new_date);
    }
    response = 'Thanks! We have recorded you period as starting on ' + user.entryDate + '. Wait for your daily text messages to start arriving!';
    user.save(function(err, data){
      if(err) {
        response = 'Sorry, there was an error saving the date. Please try again';
      }
      else {
        console.log(data);
        var cycleMessage = dayCycle.getMessage(user.entryDate);
        twilioTxt.sendMessage(user.phone, cycleMessage);
      }
    })
  } else if (body.search(/[?]/) !== -1) {
    var new_question = new Thing();
    new_question.info = body;
    new_question.phone = user.phone;
    new_question.save(function(err, data){
      if (err) console.log(err);
    })
    response = 'Thanks! We have received your question: "' + body + '". We will text you an answer as soon as we can get to it.'
  } else {
    response = 'We just received "' + body +'", which appears to be an invalid response. Please try again.';
  }
  return response;
}

module.exports = router;
