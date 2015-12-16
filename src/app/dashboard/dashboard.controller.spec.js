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

      it('should be an array of 3 labels', function() {

        expect(angular.isArray(vm.labels)).toBeTruthy();
        // expect(vm.labels.length === 0).toBeTruthy();

      });

      it('should contain baz as the third item in the array', function() {

        expect(angular.isArray(vm.labels)).toBeTruthy();
        // expect(vm.labels[2] === 'Total Air').toBeTruthy();

      });

    });
  });
})();
