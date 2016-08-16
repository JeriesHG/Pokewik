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
	p.getPokemonByName('eevee') // with Promise 
		.then(function(response) {
			console.log(response);
		})
		.catch(function(error) {
			console.log('There was an ERROR: ', error);
		});
};