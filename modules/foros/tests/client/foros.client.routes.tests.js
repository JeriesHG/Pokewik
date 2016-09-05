(function () {
  'use strict';

  describe('Foros Route Tests', function () {
    // Initialize global variables
    var $scope,
      ForosService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _ForosService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      ForosService = _ForosService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('foros');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/foros');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('View Route', function () {
        var viewstate,
          ForosController,
          mockForo;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('foros.view');
          $templateCache.put('modules/foros/client/views/view-foro.client.view.html', '');

          // create mock Foro
          mockForo = new ForosService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Foro Name'
          });

          // Initialize Controller
          ForosController = $controller('ForosController as vm', {
            $scope: $scope,
            foroResolve: mockForo
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:foroId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.foroResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            foroId: 1
          })).toEqual('/foros/1');
        }));

        it('should attach an Foro to the controller scope', function () {
          expect($scope.vm.foro._id).toBe(mockForo._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/foros/client/views/view-foro.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          ForosController,
          mockForo;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('foros.create');
          $templateCache.put('modules/foros/client/views/form-foro.client.view.html', '');

          // create mock Foro
          mockForo = new ForosService();

          // Initialize Controller
          ForosController = $controller('ForosController as vm', {
            $scope: $scope,
            foroResolve: mockForo
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.foroResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/foros/create');
        }));

        it('should attach an Foro to the controller scope', function () {
          expect($scope.vm.foro._id).toBe(mockForo._id);
          expect($scope.vm.foro._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/foros/client/views/form-foro.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          ForosController,
          mockForo;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('foros.edit');
          $templateCache.put('modules/foros/client/views/form-foro.client.view.html', '');

          // create mock Foro
          mockForo = new ForosService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Foro Name'
          });

          // Initialize Controller
          ForosController = $controller('ForosController as vm', {
            $scope: $scope,
            foroResolve: mockForo
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:foroId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.foroResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            foroId: 1
          })).toEqual('/foros/1/edit');
        }));

        it('should attach an Foro to the controller scope', function () {
          expect($scope.vm.foro._id).toBe(mockForo._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/foros/client/views/form-foro.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
