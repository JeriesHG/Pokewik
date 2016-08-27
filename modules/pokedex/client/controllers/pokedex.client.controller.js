'use strict';

angular.module('pokedex').controller('PokedexController', ['$scope', 'pokedexFactory', function($scope, pokedexFactory) {

  $scope.pokemons = [];
  $scope.showSpinner = true;

  $scope.getPokemons = function() {
    pokedexFactory.getPokemons().then(function(response) {
      $scope.showSpinner = false;
      $scope.pokemons = response.data;
    }, function(error) {
      console.log(error);
    });
  };

  $scope.extractAPIInfo = function(resource) {
    pokedexFactory.extractURLInfo(resource)
      .then(function(response) {
        console.log(response);
      }, function(error) {
        console.log(error);
      });
  };




}]);
