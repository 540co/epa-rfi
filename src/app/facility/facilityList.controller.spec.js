(function() {
  'use strict';

  describe('epaApp', function() {
    var scope,
      vm,
      DataService,
      $location = {
        search: function() { return {}; }
      },
      NgMap,
      Map = {
        showInfoWindow: function() {},
        setCenter: function() {},
        fitBounds: function() {}
      },
      $controller,
      mockFacilityData = {
        meta: {
          offset: 0,
          limit: 25,
          total: 2
        },
        data: [
          {id: 123},
          {id: 234}
        ]
      },
      google = {
        maps: {
          LatLngBounds: function() {
            this.extend = function() {};
            this.getCenter = function() {};
          },
          LatLng: function() {},
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

    describe('FacilityListController', function() {
      beforeEach(inject(function(_$controller_, $rootScope, _DataService_, _NgMap_) {
        scope = $rootScope.$new();
        DataService = _DataService_;
        NgMap = _NgMap_;
        $controller = _$controller_;

        spyOn(DataService.Facilities, 'query').and.callFake(function(queryParams, successCallback) {
          successCallback(mockFacilityData);
          return {
            $promise: {}
          };
        });

        spyOn(NgMap, 'getMap').and.callFake(function() {
          return {
            then: function(callback) {
              callback(Map);
            }
          };
        });
      }));

      it('should load facilities', function() {


        vm = $controller('FacilityListController', {
          $scope: scope,
          DataService: DataService,
          $location: $location,
          $google: google
        });

        expect(DataService.Facilities.query).toHaveBeenCalledWith({
          limit: 25,
          offset: 0
        }, jasmine.any(Function), jasmine.any(Function));

        expect(vm.facilities).toEqual(mockFacilityData.data);
      });

      it('should load facilities in the given zipcode', function() {
        $location.search = function() {
          return {
            zipcode: '20607'
          };
        };

        vm = $controller('FacilityListController', {
          $scope: scope,
          DataService: DataService,
          $location: $location,
          $google: google
        });

        expect(DataService.Facilities.query).toHaveBeenCalledWith({
          limit: 25,
          offset: 0,
          filters: 'facility.address.zipcode:20607'
        }, jasmine.any(Function), jasmine.any(Function));
      });

      it('should load facilities in the given state', function() {
        $location.search = function() {
          return {
            state: 'TX'
          };
        };

        vm = $controller('FacilityListController', {
          $scope: scope,
          DataService: DataService,
          $location: $location,
          $google: google
        });

        expect(DataService.Facilities.query).toHaveBeenCalledWith({
          limit: 25,
          offset: 0,
          filters: 'facility.address.state:TX'
        }, jasmine.any(Function), jasmine.any(Function));
      });

      it('should reload facilities when page changes', function() {
        $location.search = function() {
          return {
            zipcode: '20607'
          };
        };

        vm = $controller('FacilityListController', {
          $scope: scope,
          DataService: DataService,
          $location: $location,
          $google: google
        });

        expect(DataService.Facilities.query.calls.argsFor(0)).toEqual([{
          limit: 25,
          offset: 0,
          filters: 'facility.address.zipcode:20607'
        }, jasmine.any(Function), jasmine.any(Function)]);

        expect(vm.query.page).toEqual(1);
        expect(vm.query.limit).toEqual(25);
        expect(vm.query.total).toEqual(2);

        vm.onPaginationChange(2, 100);

        expect(DataService.Facilities.query.calls.argsFor(1)).toEqual([{
          limit: 100,
          offset: 100,
          filters: 'facility.address.zipcode:20607'
        }, jasmine.any(Function), jasmine.any(Function)]);

        expect(vm.query.page).toEqual(2);
        expect(vm.query.limit).toEqual(100);
        expect(vm.query.total).toEqual(2);
      });

    });
  });
})();
