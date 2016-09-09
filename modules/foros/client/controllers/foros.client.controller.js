(function () {
  'use strict';

  // Foros controller
  angular
    .module('foros')
    .controller('ForosController', ForosController);

  ForosController.$inject = ['$scope', '$state', '$window', 'Authentication', 'foroResolve','$modal','$http','$log'];

  function ForosController ($scope, $state, $window, Authentication, foro,$modal,$http,$log) {
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


    function getComments(){
      $http({
        url:'/api/comentarios',
        method:'GET',
        params:{"foroId":vm.foro._id}
      }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        $scope.comentarios = response.data;
      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        alert("something was grong");
      });
    }
    getComments();



    $scope.animationsEnabled = true;

    $scope.modalComentario = function (foroId,size) {

      var modalInstance = $modal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'modalComentario',
        controller: 'commentController',
        size: size,
        resolve: {
          foroId: function () {
            return foroId;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };

  }


  angular
      .module('foros')
      .controller('commentController', commentController);

      function commentController($scope,$http,foroId){
        //alert(foroId);
        $scope.comment = "default Comment";
        $scope.saveComment =  function(){
          var data = {
            contenido:$scope.comment,
            foroId:foroId
          };


          $http({
            url:'/api/comentarios',
            method:'POST',
            data:data
          }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            alert('Tooo Bien');
          }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            alert("something was grong");
          });

        };

      }
}());
