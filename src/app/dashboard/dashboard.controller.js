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

          console.log('new data', data);

          vm.netReductionPounds = data.totalReduction;
          vm.netReductionPercent = (data.cumulativeReductionPercentage * 100);



          buildChart(data.fugitiveAirPerYear, data.stackAirPerYear, data.totalAirPerYear, data.years);
        });
      }

      activate();

      function activate() {
        initDashboard();

        // setDropdownValues();
      }

      function initDashboard() {
        ReportService.getYearlyAirPollutionReport({},function(data, err){
          // update whatever with data;
          console.log(data);
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

        // vm.stateFilters = ["AK", "AL", "AR", "AS", "AZ", "CA", "CO", "CT", "DC", "DE", "FL", "GA", "GU", "HI", "IA", "ID", "IL", "IN", "KS", "KY", "LA", "MA", "MD", "ME", "MI", "MN", "MO", "MP", "MS", "MT", "NC", "ND", "NE", "NH", "NJ", "NM", "NV", "NY", "OH", "OK", "OR", "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UT", "VA", "VI", "VT", "WA", "WI", "WV", "WY"];
        // vm.yearFilters = ["1987", "1988", "1989", "1990", "1991", "1992", "1993", "1994", "1995", "1996", "1997", "1998", "1999", "2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014"];

      }

    function getAirData() {
      vm.airGraphData = _.sortBy(fakeService(), 'year');

      //Will have to add sevice logic here... Refer to Style GUide
      return vm.airGraphData;

    }

    // function populateNetPoundsReduced() {
    //   vm.netReductionPounds = 234839098;
    //   return vm.netReductionPounds;
    // }
    //
    // function populateNetPercentReduced() {
    //   vm.netReductionPercent = 20;
    //   return vm.netReductionPercent;
    // }
    //
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





    //fake service that will be replaced by what mark is workign on
    function fakeService() {

      vm.mockData = [{
        "year": 2014,
        "fugitiveAir": 167826579.4,
        "stackAir": 60467014.8,
        "totalProduction": 228293593
      }, {
        "year": 2013,
        "fugitiveAir": 177826579.4,
        "stackAir": 61467014.8,
        "totalProduction": 248293593
      }, {
        "year": 2012,
        "fugitiveAir": 187826579.4,
        "stackAir": 65467014.8,
        "totalProduction": 268293593
      }, {
        "year": 2012,
        "fugitiveAir": 197826579.4,
        "stackAir": 70467014.8,
        "totalProduction": 278293593
      }, {
        "year": 2011,
        "fugitiveAir": 217826579.4,
        "stackAir": 75467014.8,
        "totalProduction": 288293593
      }, {
        "year": 2010,
        "fugitiveAir": 227826579.4,
        "stackAir": 76467014.8,
        "totalProduction": 308293593
      }, {
        "year": 2009,
        "fugitiveAir": 237826579.4,
        "stackAir": 77467014.8,
        "totalProduction": 328293593
      }, {
        "year": 2008,
        "fugitiveAir": 257826579.4,
        "stackAir": 79467014.8,
        "totalProduction": 338293593
      }, {
        "year": 2007,
        "fugitiveAir": 267826579.4,
        "stackAir": 83467014.8,
        "totalProduction": 358293593
      }, {
        "year": 2006,
        "fugitiveAir": 287826579.4,
        "stackAir": 85467014.8,
        "totalProduction": 388293593
      }];

      return vm.mockData;




      //Angular material switch

    }

    vm.toggle = {
      cb2: 'Air Production'
    };


  }

})();
