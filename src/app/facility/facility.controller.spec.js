(function() {
  'use strict';

  describe('epaApp', function() {
    var scope,
      vm;

    beforeEach(function() {
      module('app.facility')
    });

    describe('FacilityController', function() {
      beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        vm = $controller('FacilityController', {
          $scope: scope
        });
      }));

      it('should be a report object', function() {
        expect(angular.isObject(vm.facility)).toBeTruthy();
      });

      it('should be an array of reports', function() {
        expect(angular.isArray(vm.reports)).toBeTruthy();
      });

    });
  });
})();
