(function () {
  'use strict';

  angular
    .module('foros')
    .controller('ForosListController', ForosListController);

  ForosListController.$inject = ['ForosService'];

  function ForosListController(ForosService) {
    var vm = this;

    vm.foros = ForosService.query();
  }
}());
