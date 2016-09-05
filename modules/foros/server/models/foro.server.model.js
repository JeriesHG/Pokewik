'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Foro Schema
 */
var ForoSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Foro name',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Foro', ForoSchema);
