'use strict';

angular.module('pokedex').controller('PokedexController', ['$scope', 'pokedexFactory',
  function($scope, pokedexFactory) {

    $scope.getPokemons = function() {
      pokedexFactory.getPokemons()
        .then(function(response) {
          console.log(response);
        }, function(error) {
          console.log(error);
        });
    };
  }
]);