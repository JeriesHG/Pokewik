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

var ComentarioSchema = new Schema({
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
  },
  foroId : {
    type: Number
  }
});

mongoose.model('Foro', ForoSchema);
mongoose.model('Comentario', ComentarioSchema);
