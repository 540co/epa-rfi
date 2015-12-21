(function() {
  'use strict';

  angular
    .module('app.facility')
    .controller('FacilityController', FacilityController);

  FacilityController.$inject = ['DataService', '$stateParams'];

  /** @ngInject */

  function FacilityController(DataService, $stateParams) {
    var vm = this;

    activate();

    function activate() {

      getFacility($stateParams.facilityId, function(data) {
        vm.facility = data;
      }, function() {
        vm.facility = {};
      });

      getReports($stateParams.facilityId, function(data) {
        vm.reports = data;
      }, function() {
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
