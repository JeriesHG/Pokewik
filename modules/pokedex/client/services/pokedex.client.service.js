'use strict';
var app = angular.module('pokedex');

app.factory('pokedexFactory', ['$http', function($http) {
	var pokedexFactory = {};

	var urlBase = '/api/pokedex';

	pokedexFactory.getPokemons = function() {
		return $http.get(urlBase + '/all');
	};

	return pokedexFactory;
}]);