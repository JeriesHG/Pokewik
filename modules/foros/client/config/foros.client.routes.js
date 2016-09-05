(function () {
  'use strict';

  angular
    .module('foros')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('foros', {
        abstract: true,
        url: '/foros',
        template: '<ui-view/>'
      })
      .state('foros.list', {
        url: '',
        templateUrl: 'modules/foros/client/views/list-foros.client.view.html',
        controller: 'ForosListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Foros List'
        }
      })
      .state('foros.create', {
        url: '/create',
        templateUrl: 'modules/foros/client/views/form-foro.client.view.html',
        controller: 'ForosController',
        controllerAs: 'vm',
        resolve: {
          foroResolve: newForo
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Foros Create'
        }
      })
      .state('foros.edit', {
        url: '/:foroId/edit',
        templateUrl: 'modules/foros/client/views/form-foro.client.view.html',
        controller: 'ForosController',
        controllerAs: 'vm',
        resolve: {
          foroResolve: getForo
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Foro {{ foroResolve.name }}'
        }
      })
      .state('foros.view', {
        url: '/:foroId',
        templateUrl: 'modules/foros/client/views/view-foro.client.view.html',
        controller: 'ForosController',
        controllerAs: 'vm',
        resolve: {
          foroResolve: getForo
        },
        data: {
          pageTitle: 'Foro {{ foroResolve.name }}'
        }
      });
  }

  getForo.$inject = ['$stateParams', 'ForosService'];

  function getForo($stateParams, ForosService) {
    return ForosService.get({
      foroId: $stateParams.foroId
    }).$promise;
  }

  newForo.$inject = ['ForosService'];

  function newForo(ForosService) {
    return new ForosService();
  }
}());
