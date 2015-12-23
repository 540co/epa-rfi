(function() {
  'use strict';

  describe('epaApp', function() {
    var scope,
      vm,
      DataServiceMock,
      $stateParamsMock;

    beforeEach(function() {
      module('app.facility', function($provide) {
        $provide.constant('TRI_API_ENDPOINT', 'MOCK_TRI_ENPOINT');
      });
    });

    describe('FacilityListController', function() {
      beforeEach(inject(function($controller, $rootScope, _DataService_) {
        scope = $rootScope.$new();
        DataServiceMock = _DataService_;

        $stateParamsMock = {
        };


        vm = $controller('FacilityListController', {
          $scope: scope,
          $stateParams: $stateParamsMock,
          DataService: DataServiceMock
        });

      }));

    });
  });
})();
