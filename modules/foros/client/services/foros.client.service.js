// Foros service used to communicate Foros REST endpoints
(function () {
  'use strict';

  angular
    .module('foros')
    .factory('ForosService', ForosService);

  ForosService.$inject = ['$resource'];

  function ForosService($resource) {
    return $resource('api/foros/:foroId', {
      foroId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
