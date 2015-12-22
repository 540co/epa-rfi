(function() {
    'use strict';

    angular
      .module('app.dashboard')
      .controller('DashboardController', DashboardController);

    /** @ngInject */
    DashboardController.$inject = ['ReportService', '$log'];

    function DashboardController(ReportService, $log) {
      var vm = this;

      activate();

      function activate() {
        initDashboard();
      }

      function initDashboard() {
        ReportService.getYearlyAirPollutionReport({},function(data, err){
          //Set cards with initial values
          vm.toggle = 'Air Pollution Reduction';
          vm.toggleDashboard(data.netReductionPounds, data.netProductionPounds);

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

    vm.updateDashboard = function(filter) {
      $log.info('Update dashboard with: ', filter);

      ReportService.getYearlyAirPollutionReport(filter,function(data, err){

        //Update the key variables to match filtered data
        vm.netReductionPounds = data.totalReduction;
        vm.netReductionPercent = (data.cumulativeReductionPercentage * 100);
        vm.totalYears = data.years.length;

        //Update toggle switch state with filtered data
        vm.setDashboardToggle(data.totalReduction, data.totalProduction);
        vm.toggleDashboard();

        buildChart(data.fugitiveAirPerYear, data.stackAirPerYear, data.totalAirPerYear, data.years);
      });
    }

    vm.resetDashboard = function(filter) {
      $log.info('Dashboard reset!');

      filter.start_year = '';
      filter.end_year = '';
      filter.state = '';

      ReportService.getYearlyAirPollutionReport({},function(data, err){

        //Update the key variables to match filtered data
        vm.netReductionPounds = data.totalReduction;
        vm.netReductionPercent = (data.cumulativeReductionPercentage * 100);
        vm.totalYears = data.years.length;

        //Update toggle switch state with filtered data
        vm.setDashboardToggle(data.netReductionPounds, vm.netProductionPounds);

        buildChart(data.fugitiveAirPerYear, data.stackAirPerYear, data.totalAirPerYear, data.years);
      });
    }

    vm.toggleDashboard = function () {
      if (vm.toggle === 'Air Pollution Production') {
        vm.netPounds = vm.netProductionPounds;
        vm.pollutionTrend = 'Produced';

        console.log('Production');
        console.log(vm.netPounds);
      }
      else if (vm.toggle === 'Air Pollution Reduction') {
        vm.netPounds = vm.netReductionPounds;
        vm.pollutionTrend = 'Reduced';

        console.log('Reduction');
        console.log(vm.netPounds);
      }
    }

    vm.setDashboardToggle = function(reduction, production) {
        vm.netReductionPounds = reduction;
        vm.netProductionPounds = production;
    }



  }

})();
