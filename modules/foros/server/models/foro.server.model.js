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
    required: 'Por favor escriba un titulo',
    trim: true
  },
  contenido: {
    type: String,
    default: '',
    required: 'Por favor escriba un contenido',
    trim: false
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
