'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
	mongoose = require('mongoose'),
	errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
	_ = require('lodash');

var Pokedex = require('pokedex-promise-v2');
var p = new Pokedex();

/**
 * Create a Pokedex
 */
exports.create = function(req, res) {

};

/**
 * Show the current Pokedex
 */
exports.read = function(req, res) {

};

/**
 * Update a Pokedex
 */
exports.update = function(req, res) {

};

/**
 * Delete an Pokedex
 */
exports.delete = function(req, res) {

};

/**
 * List of Pokedexes
 */
exports.list = function(req, res) {
	var promises = [];
	var last = req.query.last;
	var max = 4;

	if(last < 1){
		last = 0;
		max = 14;
	}

	for (var i = 1;i<max;i++) {
		promises.push(p.getPokemonByName(last+i));
	}

	Promise.all(promises).then(function(dataArr) {
		res.send(dataArr);
	}).catch(function(err) {
		console.log(err);
	});
};
