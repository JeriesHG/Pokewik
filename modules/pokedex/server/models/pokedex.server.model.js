'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Pokedex Schema
 */
var PokedexSchema = new Schema({
	// Pokedex model fields
	// ...
});

mongoose.model('Pokedex', PokedexSchema);