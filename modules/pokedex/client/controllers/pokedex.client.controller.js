'use strict';

angular.module('pokedex').controller('PokedexController', ['$scope', 'pokedexFactory',
  function($scope, pokedexFactory) {

    $scope.pokemons = [];

    $scope.getPokemons = function() {
      pokedexFactory.getPokemons()
        .then(function(response) {
          for(let obj of response.data){
            console.log(obj);
            let custom = {
              name : obj.name,
              img : obj.sprites.front_default
            };
            $scope.pokemons.push(custom);
          }
          // 
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
  }
]);