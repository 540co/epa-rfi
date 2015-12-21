(function() {
  'use strict';

  describe('epaApp', function() {
    var scope,
      vm,
      DataServiceMock,
      $stateParamsMock,
      facilityMock = {
        id: 'ABC123',
        name: 'ABC Facility 123'
      },
      facilityReportsMock = [
        {
          documentControlNumber: '123456'
        },
        {
          documentControlNumber: '234567'
        }
      ];

    beforeEach(function() {
      module('app.facility', function($provide) {
        $provide.constant('TRI_API_ENDPOINT', 'MOCK_TRI_ENPOINT');
      });
    });

    describe('FacilityController', function() {
      beforeEach(inject(function($controller, $rootScope, _DataService_) {
        scope = $rootScope.$new();
        DataServiceMock = _DataService_;

        $stateParamsMock = {
          facilityId: 'ABC123'
        };

        spyOn(DataServiceMock.Facilities, 'query').and.callFake(function(queryParams, successCallback) {
          successCallback({ data: facilityMock });
        });

        spyOn(DataServiceMock.FacilityReports, 'query').and.callFake(function(queryParams, successCallback) {
          successCallback({ data: facilityReportsMock });
        });

        vm = $controller('FacilityController', {
          $scope: scope,
          $stateParams: $stateParamsMock,
          DataService: DataServiceMock
        });

      }));

      it('should be have a facility object', function() {
        expect(vm.facility).toEqual(facilityMock);
        expect(DataServiceMock.Facilities.query).toHaveBeenCalledWith({id: 'ABC123'}, jasmine.any(Function), jasmine.any(Function));
      });

      it('should have an array of reports', function() {
        expect(vm.reports).toEqual(facilityReportsMock);
        expect(DataServiceMock.FacilityReports.query).toHaveBeenCalledWith({id: 'ABC123'}, jasmine.any(Function), jasmine.any(Function));
      });

    });
  });
})();
