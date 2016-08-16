'use strict';

module.exports = function(app) {
	// Routing logic   
	var pokedexController = require('../controllers/pokedex.server.controller');

	app.route('/api/pokedex/all').get(pokedexController.list);
};