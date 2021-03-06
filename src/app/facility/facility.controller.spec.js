(function() {
  'use strict';

  describe('epaApp', function() {
    var scope,
      vm,
      DataServiceMock,
      $stateParamsMock,
      metaMock = {
        total: 2192555
      },
      facilityMock = {
        id: 'ABC123',
        name: 'ABC Facility 123'
      },
      facilityReportsMock = [{
        documentControlNumber: '123456'
      }, {
        documentControlNumber: '234567'
      }],
      google = {
        maps: {
          event: {
            trigger: function() {}
          }
        }
      };

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
          successCallback({
            meta: metaMock,
            data: facilityMock
          });
        });

        spyOn(DataServiceMock.FacilityReports, 'query').and.callFake(function(queryParams, successCallback) {
          successCallback({
            meta: metaMock,
            data: facilityReportsMock
          });
        });

        vm = $controller('FacilityController', {
          $scope: scope,
          $stateParams: $stateParamsMock,
          DataService: DataServiceMock,
          $google: google
        });

      }));

      it('should be have a facility object', function() {
        expect(vm.facility).toEqual(facilityMock);
        expect(DataServiceMock.Facilities.query).toHaveBeenCalledWith({
          id: 'ABC123',
          limit: 15,
          filters: 'chemical.isCleanAirActChemical:true'
        }, jasmine.any(Function), jasmine.any(Function));
      });

      it('should have an array of reports', function() {
        expect(vm.reports).toEqual(facilityReportsMock);
        expect(vm.reportsTotal).toEqual(metaMock.total);
        expect(DataServiceMock.FacilityReports.query).toHaveBeenCalledWith({
          id: 'ABC123',
          limit: 15,
          filters: 'chemical.isCleanAirActChemical:true'
        }, jasmine.any(Function), jasmine.any(Function));
      });

      it('should update reports shown when page is changed', function() {
        DataServiceMock.FacilityReports.query.calls.reset();

        vm.onpagechange(2, 100);

        expect(DataServiceMock.FacilityReports.query).toHaveBeenCalledWith({
          id: 'ABC123',
          limit: 100,
          offset: 100,
          filters: 'chemical.isCleanAirActChemical:true'
        }, jasmine.any(Function), jasmine.any(Function));
      });

    });
  });
})();
