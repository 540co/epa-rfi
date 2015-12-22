(function() {
  'use strict';

  angular
    .module('app.dashboard')
    .controller('DashboardController', DashboardController)
    .filter('abs', function() {
      return function(val) {
        if (typeof val !== 'undefined') {
          return Math.abs(val);
        }
      }
    });

  /** @ngInject */
  DashboardController.$inject = ['ReportService', '$log'];

  function DashboardController(ReportService, $log) {
    var vm = this;

    activate();

    function activate() {
      initDashboard();
    }

    function initDashboard() {
      ReportService.getYearlyAirPollutionReport({}, function(data) {

        vm.showNoReportError = false;

        // update whatever with data;
        vm.netReductionPounds = data.totalReduction;
        vm.netReductionPercent = data.cumulativeReductionPercentage * 100;
        vm.netProductionPounds = data.totalProduction;
        vm.netPounds = data.totalReduction;

        // set list of states for dropdown filter
        setDropdownValues();
        vm.yearFilters = data.years;

        buildChart(data.fugitiveAirPerYear, data.stackAirPerYear, data.totalAirPerYear, data.years);
      });
    }

    function setDropdownValues() {
      ReportService.getStateList(
        function(data) {
          vm.stateFilters = data;
        });
    }

    function buildChart(fugitiveAir, stackAir, total, years) {
      populateLabels(years);
      populateSeries();
      populateData(fugitiveAir, stackAir, total);
      vm.options = {
        datasetFill: false
      };

    }

    function populateLabels(years) {
      vm.labels = years;
      return vm.labels;
    }

    function populateSeries() {
      vm.series = ['Fugitive Air', 'Stack Air', 'Total Air'];
      return vm.series;
    }

    function populateData(fugitiveAir, stackAir, total) {
      vm.airData = [];

      vm.fugitiveAir = fugitiveAir;
      vm.stackAir = stackAir;
      vm.totalProduction = total;

      vm.airData.push(vm.fugitiveAir);
      vm.airData.push(vm.stackAir);
      vm.airData.push(vm.totalProduction);

      return vm.airData;

    }

    vm.updateDashboard = function(filter) {
      $log.info('Update dashboard with: ', filter);
      //Update the key variables to match filtered data
      ReportService.getYearlyAirPollutionReport(filter, function(data) {
        if (!_.isEmpty(data)) {
          vm.showNoReportError = false;
          vm.netReductionPercent = (data.cumulativeReductionPercentage * 100);
          vm.totalYears = data.years.length;

          vm.netProductionPounds = data.totalProduction;
          vm.netReductionPounds = data.totalReduction;

          buildChart(data.fugitiveAirPerYear, data.stackAirPerYear, data.totalAirPerYear, data.years);
        } else {
          vm.showNoReportError = true;
        }
      });
    };

    vm.resetDashboard = function(filter) {
      $log.info('Dashboard reset!');

      filter.start_year = '';
      filter.end_year = '';
      filter.state = '';
      filter.zipcode = '';

      ReportService.getYearlyAirPollutionReport({}, function(data) {

        //Update the key variables to match filtered data
        vm.netReductionPounds = data.totalReduction;
        vm.netReductionPercent = (data.cumulativeReductionPercentage * 100);
        vm.netProductionPounds = data.totalProduction;

        vm.totalYears = data.years.length;

        buildChart(data.fugitiveAirPerYear, data.stackAirPerYear, data.totalAirPerYear, data.years);
      });
    };



  }

})();
