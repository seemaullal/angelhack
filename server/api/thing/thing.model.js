'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ThingSchema = new Schema({
  name: String,
  info: {type: String, required:true},
  answered: {type: Boolean, default: false},
  phone: String
});

module.exports = mongoose.model('Thing', ThingSchema);
