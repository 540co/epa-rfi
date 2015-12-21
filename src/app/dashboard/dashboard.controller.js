(function() {
    'use strict';

    angular
      .module('app.dashboard')
      .controller('DashboardController', DashboardController);

    /** @ngInject */
    DashboardController.$inject = ['ReportService'];

    function DashboardController(ReportService) {
      var vm = this;

      vm.updateDashboard = function(filter) {
        console.log('Update dashboard with: ', filter);
        ReportService.getYearlyAirPollutionReport(filter,function(data, err){

          vm.netReductionPounds = data.totalReduction;
          vm.netReductionPercent = (data.cumulativeReductionPercentage * 100);

          buildChart(data.fugitiveAirPerYear, data.stackAirPerYear, data.totalAirPerYear, data.years);
        });
      }

      activate();

      function activate() {
        initDashboard();
      }

      function initDashboard() {
        ReportService.getYearlyAirPollutionReport({},function(data, err){
          // update whatever with data;
          vm.netReductionPounds = data.totalReduction;
          vm.netReductionPercent = data.cumulativeReductionPercentage * 100;

          // set list of states for dropdown filter
          setDropdownValues();
          vm.yearFilters = data.years;

          buildChart(data.fugitiveAirPerYear, data.stackAirPerYear, data.totalAirPerYear, data.years);
        });
      }

      function setDropdownValues() {
        ReportService.getStateList(
          function(data, err) {
            vm.stateFilters = data;
          })
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


    vm.toggle = {
      cb2: 'Air Production'
    };
  }

})();
