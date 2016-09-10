'use strict';

angular.module('pokedex', ['infinite-scroll']).controller('PokedexController', ['$scope', 'pokedexFactory', '$modal',
  function($scope, pokedexFactory, $modal) {

    var isGettingPokemon = false;
    $scope.pokemons = [];
    $scope.showSpinner = true;

    $scope.getPokemons = function() {

      if (!isGettingPokemon) {
        isGettingPokemon = true;
        $scope.showSpinner = true;
        pokedexFactory.getPokemons($scope.pokemons.length - 1)
          .then(function(response) {
            $scope.showSpinner = false;
            $scope.pokemons = $scope.pokemons.concat(response.data);
            isGettingPokemon = false;
          }, function(error) {
            console.log(error);
            alert('Pika! Something has occurred, please try!');
            $scope.showSpinner = false;
          });
      }
    };


    $scope.extractAPIInfo = function(resource) {
      pokedexFactory.extractURLInfo(resource)
        .then(function(response) {
          console.log(response);
        }, function(error) {
          console.log(error);
        });
    };



    $scope.animationsEnabled = true;
    $scope.open = function(size, pokemon) {

      var modalInstance = $modal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'modalPokemonDetail',
        controller: 'ModalPokemonDetail',
        size: size,
        resolve: {
          pokemon: function() {
            return pokemon;
          }
        }
      });

      modalInstance.result.then(function(selectedItem) {
        $scope.selected = selectedItem;
      }, function() {
        //$log.info('Modal dismissed at: ' + new Date());
      });
    };

    $scope.toggleAnimation = function() {
      $scope.animationsEnabled = !$scope.animationsEnabled;
    };

  }
]);


angular.module('pokedex').controller('ModalPokemonDetail', function($scope, $modalInstance, pokedexFactory, pokemon) {


  $scope.getPokemon = function() {

    console.log(pokemon);
    return pokemon;
  };

  $scope.ChangeBackground = function()
  {
    switch(pokemon.types[0].type.name)
    {
      case "bug":
        return "Bug";
      

      case "dark":
        return "Dark";
      

      case "dragon":
        return "Dragon";
      

      case "electric":
        return "Electric";
      

      case "fairy":
        return "Fairy";
      

      case "fighting":
        return "Fighting";
      
       case "fire":
        return "Fire";
      
      case "flying":
        return "Flying";
      

      case "ghost":
        return "Ghost";
      

      case "grass":
        return "Grass";
      

      case "ground":
        return "Ground";
      

      case "ice":
        return "Ice";
      

      case "normal":
        return "Normal";
      

      case "poison":
        return "Poison";
      

      case "psychic":
        return "Psychic";
      

      case "rock":
        return "Rock";
      

      case "steel":
        return "Steel";
      

      case "water":
        return "Water";
      
    }
   
  };
  var pokeForms = [];
  var idxPokeForm = 2;
  $scope.getPokeFormImg = function() {
    if (pokeForms.length === 0)
      return null;
    return pokeForms[idxPokeForm];
  };


  $scope.nextPokeForm = function() {
    if (idxPokeForm === 3) {
      idxPokeForm = 0;
    } else {
      idxPokeForm++;
    }
  };

  $scope.prevPokeForm = function() {
    if (idxPokeForm === 0) {
      idxPokeForm = 3;
    } else {
      idxPokeForm--;
    }
  };

  /*
   * Object
   back_default:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png"
   back_shiny:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/1.png"
   front_default:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
   front_shiny:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png"*/
  pokedexFactory.getForms(pokemon.id).then(function(res) {
    console.log(res);
    var resPokemon = res.data;
    pokeForms.push(resPokemon.sprites.front_default);
    pokeForms.push(resPokemon.sprites.back_default);
    pokeForms.push(resPokemon.sprites.front_shiny);
    pokeForms.push(resPokemon.sprites.back_shiny);
    console.log(pokeForms);
  });



  //console.log(pokemon);

  $scope.ok = function() {
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };
});