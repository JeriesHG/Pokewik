(function () {
  'use strict';

  // Foros controller
  angular
    .module('foros')
    .controller('ForosController', ForosController);

  ForosController.$inject = ['$scope', '$state', '$window', 'Authentication', 'foroResolve'];

  function ForosController ($scope, $state, $window, Authentication, foro) {
    var vm = this;

    vm.authentication = Authentication;
    vm.foro = foro;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Foro
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.foro.$remove($state.go('foros.list'));
      }
    }

    // Save Foro
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.foroForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.foro._id) {
        vm.foro.$update(successCallback, errorCallback);
      } else {
        vm.foro.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('foros.view', {
          foroId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
