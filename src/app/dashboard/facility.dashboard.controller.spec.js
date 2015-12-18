(function() {
  'use strict';

  describe('epaApp', function() {
    var scope,
      vm;

    beforeEach(function() {
      module('app.dashboard')
    });

    describe('FacilityDashboardController', function() {
      beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        vm = $controller('FacilityDashboardController', {
          $scope: scope
        });
      }));

      it('should be a report object', function() {
        expect(angular.isObject(vm.mockFacility)).toBeTruthy();
      });

      it('should be an array of 2 reports', function() {
        expect(angular.isArray(vm.mockReports)).toBeTruthy();
        expect(vm.mockReports.length).toBe(2);
      });

    });
  });
})();
