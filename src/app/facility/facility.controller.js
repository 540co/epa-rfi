(function() {
  'use strict';

  angular
    .module('app.facility')
    .controller('FacilityController', FacilityController);

  FacilityController.$inject = ['DataService'];

  /** @ngInject */

  function FacilityController(DataService) {
    var vm = this;

    activate();

    function activate() {

      getFacility('00753DGTLQPRROA', function(data) {
        vm.facility = data;
      }, function(error) {
        vm.facility = {};
      });

      getReports('00753DGTLQPRROA', function(data) {
        vm.reports = data;
      }, function(error) {
        vm.reports = [];
      });

    }

    function getFacility(id, successCallback, errorCallback) {
      var queryParams = {};
      queryParams.id = id;

      DataService.Facilities.query(queryParams, function(response) {
        successCallback(response.data);
      }, errorCallback);
    }

    function getReports(id, successCallback, errorCallback) {
      var queryParams = {};
      queryParams.id = id;

      DataService.FacilityReports.query(queryParams, function(response) {
        successCallback(response.data);
      }, errorCallback);
    }

  }

})();
