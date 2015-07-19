/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');
var User = require('../api/user/user.model');

Thing.find({}).remove(function() {
  Thing.create({
  info: 'What is a period?',
  phone: '+15163484851',
  },{
    info: 'How do I prevent pregnanct on my fertile days?',
    phone: '+18058139090'
  }, {
    info: 'Is it ok to have sex with a condom during fertile days?',
    phone: '+18058139090'
  }, function(){
      console.log('finished populating questions');
    }
  );
});

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test',
    phone: '+15163484851'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function() {
      console.log('finished populating users');
    }
  );
});
