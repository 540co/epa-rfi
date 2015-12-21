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
    });
  });
})();
