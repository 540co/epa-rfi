(function() {
  'use strict';

  angular
    .module('app.facility')
    .controller('FacilityListController', FacilityListController);

  FacilityListController.$inject = ['DataService', '$stateParams', '$location', 'NgMap'];

  /** @ngInject */

  function FacilityListController(DataService, $stateParams, $location, NgMap) {
    var vm = this,
      params = $location.search();

    NgMap.getMap().then(function(map) {
     vm.map = map;
     console.log(vm.map);
   });

    vm.showFacilityInfoWindow = function(event, facility) {
      vm.currentFacility = facility;

      vm.map.showInfoWindow('facilityInfoWindow', this);
    };

    getFacilities(params, function(facilities) {
      vm.facilities = facilities;

      fitBoundsToFacilities(facilities);
    }, function() {
      vm.facilities = {};
    });

    function fitBoundsToFacilities(facilities) {
      var bounds = new google.maps.LatLngBounds();
      for (var i=0; i<facilities.length; i++) {
        var latlng = new google.maps.LatLng(facilities[i].latitude, facilities[i].longitude);
        bounds.extend(latlng);
      }

      NgMap.getMap().then(function(map) {
        map.setCenter(bounds.getCenter());
        map.fitBounds(bounds);
      });
    }

    function getFacilities(params, successCallback, errorCallback) {
      var paramMap = {
          'zipcode': 'facility.address.zipcode',
          'state': 'facility.address.state'
        },
        filters = [];

      angular.forEach(params, function(value, key) {
        if (typeof paramMap[key] !== 'undefined') {
          filters.push(paramMap[key] + ":" + value);
        }
      });

      DataService.Facilities.query({ filters: filters.join(' AND ') }, function(response) {
        successCallback(response.data);
      }, errorCallback);
    }

  }

})();
