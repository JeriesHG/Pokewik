'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Foro = mongoose.model('Foro'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Foro
 */
exports.create = function(req, res) {
  var foro = new Foro(req.body);
  foro.user = req.user;

  foro.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(foro);
    }
  });
};

/**
 * Show the current Foro
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var foro = req.foro ? req.foro.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  foro.isCurrentUserOwner = req.user && foro.user && foro.user._id.toString() === req.user._id.toString();

  res.jsonp(foro);
};

/**
 * Update a Foro
 */
exports.update = function(req, res) {
  var foro = req.foro;

  foro = _.extend(foro, req.body);

  foro.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(foro);
    }
  });
};

/**
 * Delete an Foro
 */
exports.delete = function(req, res) {
  var foro = req.foro;

  foro.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(foro);
    }
  });
};

/**
 * List of Foros
 */
exports.list = function(req, res) {
  Foro.find().sort('-created').populate('user', 'displayName').exec(function(err, foros) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(foros);
    }
  });
};

/**
 * Foro middleware
 */
exports.foroByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Foro is invalid'
    });
  }

  Foro.findById(id).populate('user', 'displayName').exec(function (err, foro) {
    if (err) {
      return next(err);
    } else if (!foro) {
      return res.status(404).send({
        message: 'No Foro with that identifier has been found'
      });
    }
    req.foro = foro;
    next();
  });
};
