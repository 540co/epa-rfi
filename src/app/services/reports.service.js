(function() {
  'use strict';

  angular
    .module('app.services')
    .factory('ReportService', ReportService);

  ReportService.$inject = ['DataService', '$q'];

  /* @ngInject */
  function ReportService(DataService, $q) {

    var reportService = {
      getYearlyAirPollutionReport: getYearlyAirPollutionReport,
      getStateAirPollutionReport: getStateAirPollutionReport,
      getStateList: getStateList
    };

    return reportService;

    function getYearlyAirPollutionReport(filters, successCallback, errorCallback) {
      if (!angular.isObject(filters)) {
        filters = {};
      }

      var poundsQueryParams = buildQueryParams(filters, 'pounds'),
        gramsQueryParams = buildQueryParams(filters, 'grams');

      $q.all([
        DataService.Reports.query(poundsQueryParams).$promise,
        DataService.Reports.query(gramsQueryParams).$promise
      ]).then(function(responses) {
        var poundsReportData = responses[0].data,
          gramsReportData = responses[1].data,
          mergedReportData,
          reportData;

        mergedReportData = mergeReportData(poundsReportData, gramsReportData);

        reportData = calculateReportTotals(mergedReportData);

        successCallback(reportData);
      }, errorCallback);
    }

    function getStateAirPollutionReport(filters, successCallback, errorCallback) {
      if (!angular.isObject(filters)) {
        filters = {};
      }

      var queryParams = buildQueryParams(filters);
      queryParams.groupBy = 'facility.address.state';
      queryParams.operation = 'sum';
      queryParams.agg_fields = 'fugitiveAir,stackAir';

      DataService.Reports.query(queryParams, function(response) {
        var reportData = calculateReportTotals(response.data);

        successCallback(reportData);
      }, errorCallback);
    }

    function getStateList(successCallback, errorCallback) {

      var queryParams = {};
      queryParams.groupBy = 'facility.address.state';
      queryParams.operation = 'sum';
      queryParams.agg_fields = 'fugitiveAir,stackAir';

      DataService.Reports.query(queryParams, function(response) {
        var reportData = extractStateList(response.data);

        successCallback(reportData);
      }, errorCallback);

    }

    function roundNumber(num) {
      return Math.round(num * 100) / 100;
    }

    function mergeReportData(poundsData, gramsData) {
      var GRAM_MULTIPLIER = 0.00220462262,
        foundMatch;

      for (var i = 0, len = gramsData.length; i < len; i++) {
        gramsData[i].quantitiesEnteringEnvironment.fugitiveAir = roundNumber(
          gramsData[i].quantitiesEnteringEnvironment.fugitiveAir * GRAM_MULTIPLIER
        );
        gramsData[i].quantitiesEnteringEnvironment.stackAir = roundNumber(
          gramsData[i].quantitiesEnteringEnvironment.stackAir * GRAM_MULTIPLIER
        );

        foundMatch = false;
        for (var j = 0, jlen = poundsData.length; j < jlen; j++) {
          if (poundsData[j].year == gramsData[i].year) {
            foundMatch = true;
            poundsData[j].quantitiesEnteringEnvironment.fugitiveAir += gramsData[i].quantitiesEnteringEnvironment.fugitiveAir;
            poundsData[j].quantitiesEnteringEnvironment.stackAir += gramsData[i].quantitiesEnteringEnvironment.stackAir;
            break;
          }
        }

        if (!foundMatch) {
          poundsData.push(gramsData[i]);
        }
      }

      return poundsData;

    }

    function buildQueryParams(params, unitOfMeasure) {
      var filters = [],
        queryParams = {},
        filterMappings = {
          'state': 'facility.address.state',
          'county': 'facility.address.county',
          'city': 'facility.address.city',
          'zipcode': 'facility.address.zipcode'
        };

      //Filter by year query param
      if (params.start_year || params.end_year) {
        var yearRange = [];
        if (params.start_year) {
          yearRange[0] = params.start_year;
        } else {
          yearRange[0] = '*';
        }

        if (params.end_year) {
          yearRange[1] = params.end_year;
        } else {
          yearRange[1] = '*';
        }
        filters.push('year:[' + yearRange[0] + ' TO ' + yearRange[1] + ']');
      }

      angular.forEach(filterMappings, function(filter, key) {
        if (params[key]) {
          filters.push(filter + ':' + params[key]);
        }
      });

      filters.push('unitOfMeasure:' + (unitOfMeasure === 'grams' ? 'Grams' : 'Pounds'));

      if (filters.length) {
        queryParams.filters = filters.join(' AND ');
      }

      queryParams.groupBy = 'year';
      queryParams.operation = 'sum';
      queryParams.agg_fields = 'quantitiesEnteringEnvironment.fugitiveAir,quantitiesEnteringEnvironment.stackAir';

      return queryParams;
    }

    function calculateReportTotals(reportData) {
      // Total years
      var numReportRows = reportData.length;

      // Add totals to reports
      reportData = reportData.map(function(reportRow){
        reportRow.total = reportRow.quantitiesEnteringEnvironment.fugitiveAir + reportRow.quantitiesEnteringEnvironment.stackAir;
        return reportRow;
      });

      // Ascending sort of years
      reportData.sort(function(a, b){
        return a.year - b.year;
      });

      // Total production
      var totalProduction = 0;

      // Arrays to build chart(s) (years, totalAir, fugitiveAir, stackAir)
      var years = [];
      var totalAirPerYear = [];
      var fugitiveAirPerYear = [];
      var stackAirPerYear = [];

      reportData.forEach(function(report){
        totalProduction += report.total;

        years.push(report.year);
        totalAirPerYear.push(report.total);
        fugitiveAirPerYear.push(report.quantitiesEnteringEnvironment.fugitiveAir);
        stackAirPerYear.push(report.quantitiesEnteringEnvironment.stackAir);
      });

      // Total Reduction
      var totalReduction = (reportData[0].total * numReportRows) - totalProduction;

      // Cumulative Net Reduction Percentage
      var cumulativeReductionPercentage = totalReduction / (reportData[0].total * numReportRows);

      var data = {
        report: reportData,
        totalProduction: totalProduction,
        totalReduction: totalReduction,
        cumulativeReductionPercentage: cumulativeReductionPercentage,
        years: years,
        totalAirPerYear: totalAirPerYear,
        fugitiveAirPerYear: fugitiveAirPerYear,
        stackAirPerYear: stackAirPerYear
      };

      return data;
    }

    function extractStateList(stateData) {
      var stateList = [];

      stateData.forEach(function(state) {
        stateList.push(state.facility.address.state);
      });

      stateList.sort();

      return stateList;
    }

  }
})();
