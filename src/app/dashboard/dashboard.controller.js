(function() {
  'use strict';

  angular
    .module('app.dashboard')
    .controller('DashboardController', DashboardController);

  /** @ngInject */

  function DashboardController($scope) {
    var vm = this;
    vm.netReductionPounds = '';
    vm.netReductionPercent = '';
    vm.labels = [];
    vm.series = [];
    vm.airGraphData = [];


    vm.getAirData = getAirData;
    vm.populateNetPoundsReduced = populateNetPoundsReduced;
    vm.populateNetPercentReduced = populateNetPercentReduced;
    vm.buildChart = buildChart;
    vm.fakeService = fakeService;


    activate();

    function activate($scope) {
      populateNetPoundsReduced();
      populateNetPercentReduced();
      getAirData(); // Will eventually call the Service building these data sets
      buildChart();


    }

    function getAirData() {
      vm.airGraphData = _.sortBy(fakeService(), 'year');

      //Will have to add sevice logic here... Refer to Style GUide
      return vm.airGraphData;

    }

    function populateNetPoundsReduced() {
      vm.netReductionPounds = 234839098;
      return vm.netReductionPounds;
    }

    function populateNetPercentReduced() {
      vm.netReductionPercent = 20;
      return vm.netReductionPercent;
    }

    function buildChart() {
      populateLabels();
      populateSeries();
      populateData();
    }


    function populateLabels() {
      vm.labels = _.map(vm.airGraphData, 'year');
      return vm.labels;

    }

    function populateSeries() {
      vm.series = ['Fugitive Air', 'Stack Air', 'Total Air'];
      return vm.series;

    }

    function populateData() {
      vm.airData = [];

      vm.fugitiveAir = _.map(vm.airGraphData, 'fugitiveAir');
      vm.stackAir = _.map(vm.airGraphData, 'stackAir');
      vm.totalProduction = _.map(vm.airGraphData, 'totalProduction');

      vm.airData.push(vm.fugitiveAir);
      vm.airData.push(vm.stackAir);
      vm.airData.push(vm.totalProduction);


      // vm.airData = [
      //   [65, 59, 80, 81, 56, 55, 40, 50, 30, 99],
      //   [62, 53, 40, 51, 56, 54, 20, 60, 29, 27],
      //   [28, 48, 40, 19, 86, 27, 90, 40, 19, 34]
      // ];
      return vm.airData;

    }


    //Set required variables from chart.js
    $scope.labels = vm.labels;
    $scope.series = vm.series;
    $scope.data = vm.airData;
    $scope.options = {datasetFill : false};




    //fake service that will be replaced by what mark is workign on
    function fakeService() {

      vm.mockData = [
      {
   	"year": 2014,
   	"fugitiveAir": 167826579.4,
   	"stackAir": 60467014.8,
    "totalProduction": 228293593
  },
      {
   	"year": 2013,
   	"fugitiveAir": 177826579.4,
   	"stackAir": 61467014.8,
    "totalProduction": 248293593
  },
      {
   	"year": 2012,
   	"fugitiveAir": 187826579.4,
   	"stackAir": 65467014.8,
    "totalProduction": 268293593
  },
      {
   	"year": 2012,
   	"fugitiveAir": 197826579.4,
   	"stackAir": 70467014.8,
    "totalProduction": 278293593
  },
      {
   	"year": 2011,
   	"fugitiveAir": 217826579.4,
   	"stackAir": 75467014.8,
    "totalProduction": 288293593
  },
      {
   	"year": 2010,
   	"fugitiveAir": 227826579.4,
   	"stackAir": 76467014.8,
    "totalProduction": 308293593
  },
      {
   	"year": 2009,
   	"fugitiveAir": 237826579.4,
   	"stackAir": 77467014.8,
    "totalProduction": 328293593
  },
      {
   	"year": 2008,
   	"fugitiveAir": 257826579.4,
   	"stackAir": 79467014.8,
    "totalProduction": 338293593
  },
      {
   	"year": 2007,
   	"fugitiveAir": 267826579.4,
   	"stackAir": 83467014.8,
    "totalProduction": 358293593
  },
      {
   	"year": 2006,
   	"fugitiveAir": 287826579.4,
   	"stackAir": 85467014.8,
    "totalProduction": 388293593
  },
  ];

  return vm.mockData;

    }




  }

})();
