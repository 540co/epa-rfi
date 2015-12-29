(function() {
  'use strict';

  angular
    .module('app.facility')
    .controller('FacilityListController', FacilityListController);

  FacilityListController.$inject = ['DataService', '$location', 'NgMap', '$google', '$timeout'];

  /** @ngInject */

  function FacilityListController(DataService, $location, NgMap, $google, $timeout) {
    var vm = this,
      params = $location.search(),
      google = $google;

    vm.mapReady = false;

    vm.query = {
      total: 0,
      limit: 25,
      page: 1
    };

    vm.pageOptions = [25, 50, 100];

    vm.params = params;

    NgMap.getMap({id: 'facilityListMap'}).then(function(map) {
     vm.map = map;
    });

    vm.onPaginationChange = function(page, limit) {
      vm.query.page = page;
      vm.query.limit = limit;

      return loadFacilities();
    }

    vm.showFacilityInfoWindow = function(event, facility) {
      vm.currentFacility = facility;

      vm.map.showInfoWindow('facilityInfoWindow', 'facility_' + facility.id);
    };

    loadFacilities();

    function loadFacilities() {
      return getFacilities(params, function(response) {
        vm.facilities = response.data;
        vm.query.total = response.meta.total;

        fitBoundsToFacilities(vm.facilities);

        vm.mapReady = true;

      }, function() {
        vm.facilities = {};
      });
    }

    function fitBoundsToFacilities(facilities) {
      var bounds = new google.maps.LatLngBounds();
      for (var i=0; i<facilities.length; i++) {
        if (facilities[i].latitude && facilities[i].longitude) {
          var latlng = new google.maps.LatLng(facilities[i].latitude, facilities[i].longitude);
          bounds.extend(latlng);
        }
      }

      NgMap.getMap({id: 'facilityListMap'}).then(function(map) {
        map.setCenter(bounds.getCenter());
        map.fitBounds(bounds);
        $timeout(function() {
          $google.maps.event.trigger(map, 'resize');
        });
      });
    }

    function getFacilities(params, successCallback, errorCallback) {
      var paramMap = {
          'zipcode': 'facility.address.zipcode',
          'state': 'facility.address.state'
        },
        filters = [],
        queryParams = {};

      angular.forEach(params, function(value, key) {
        if (typeof paramMap[key] !== 'undefined') {
          filters.push(paramMap[key] + ":" + value);
        }
      });

      if (filters.length) {
        queryParams.filters = filters.join(' AND ');
      }

      queryParams.offset = (vm.query.page - 1) * vm.query.limit;
      queryParams.limit = vm.query.limit;

      return DataService.Facilities.query(queryParams, function(response) {
        successCallback(response);
      }, errorCallback).$promise;
    }

  }

})();
