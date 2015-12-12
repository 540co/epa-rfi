(function() {
  'use strict';

  describe('epaApp', function() {
    var scope,
      vm;

    beforeEach(function() {
      module('app.dashboard')
    });

    describe('DashboardController', function() {
      beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        vm = $controller('DashboardController', {
          $scope: scope
        });
      }));

      it('should be an array of 3 awesome things', function() {
        // var vm = controller;

        expect(angular.isArray(vm.awesomeThings)).toBeTruthy();
        expect(vm.awesomeThings.length === 3).toBeTruthy();

      });

      it('should contain baz as the third item in the array', function() {
        // var vm = controller;

        expect(angular.isArray(vm.awesomeThings)).toBeTruthy();
        expect(vm.awesomeThings[2] === 'baz').toBeTruthy();

      });

    });
  });
})();
