(function() {
  'use strict';

  angular
    .module('app.facility')
    .controller('FacilityController', FacilityController);

  FacilityController.$inject = ['DataService', '$stateParams', 'logger'];

  /** @ngInject */

  function FacilityController(DataService, $stateParams, logger) {
    var vm = this;

    activate();

    function activate() {
      var queryParams = {};
      queryParams.id = $stateParams.facilityId;

      getFacility(queryParams, function(data) {
        vm.facility = data;
      }, errorHandler);

      queryParams.limit = 15;

      getReports(queryParams, function(data) {
        vm.reports = data.data;
        vm.reportsTotal = data.meta.total;
        angular.element('md-data-table-pagination').find('.label').css( "color", "rgba(0,0,0,.54)" );
        angular.element('md-data-table-pagination').find('.label').css( "font-size", "100%" );
      }, errorHandler);

      vm.query = {
        filter: '',
        order: 'year',
        limit: 15,
        page: 1
      };

    }

    vm.onpagechange = function(page, limit) {
      var queryParams = {};
      queryParams.id = $stateParams.facilityId;
      queryParams.limit = limit;
      queryParams.offset = limit * (page - 1);

      getReports(queryParams, function(data) {
        vm.reports = data.data;
        vm.reportsTotal = data.meta.total;
      }, errorHandler);
    };

    function getFacility(queryParams, successCallback, errorCallback) {

      DataService.Facilities.query(queryParams, function(response) {
        successCallback(response.data);
      }, errorCallback);
    }

    function getReports(queryParams, successCallback, errorCallback) {
      queryParams.filters = 'chemical.isCleanAirActChemical:true';

      DataService.FacilityReports.query(queryParams, function(response) {
        successCallback(response);
      }, errorCallback);
    }

    function errorHandler(err) {
      vm.showError = true;
      logger.error(err.status.toString() + ' ' + err.statusText, err.data, 'Error!');
    }

  }

})();
