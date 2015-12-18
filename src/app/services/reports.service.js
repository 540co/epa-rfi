(function() {
  'use strict';

  angular
    .module('app.services')
    .factory('ReportService', ReportService);

  ReportService.$inject = ['DataService'];

  /* @ngInject */
  function ReportService(DataService) {

    var reportService = {
      getYearlyAirPollutionReport: getYearlyAirPollutionReport
    };

    return reportService;

    function getYearlyAirPollutionReport(filters, successCallback, errorCallback) {
      if (!angular.isObject(filters)) {
        filters = {};
      }

      var queryParams = buildQueryParams(filters);
      queryParams.groupBy = 'year';
      queryParams.operation = 'sum';
      queryParams.agg_fields = 'fugitiveAir,stackAir';

      DataService.Reports.query(queryParams, function(response) {
        var reportData = calculateReportTotals(response.data);

        successCallback(reportData);
      }, errorCallback);
    }

    function buildQueryParams(params) {
      var filters = [],
        queryParams = {},
        simpleFilters = ['state', 'county', 'city'];

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

      simpleFilters.forEach(function(filter) {
        if (params[filter]) {
          filters.push(filter + ':' + params[filter]);
        }
      });

      if (filters.length) {
        queryParams.filters = filters.join(' AND ');
      }

      return queryParams;
    }

    function calculateReportTotals(reportData) {
      // Total years
      var numReportRows = reportData.length;

      // Add totals to reports
      reportData = reportData.map(function(reportRow){
        reportRow.total = reportRow.fugitiveAir + reportRow.stackAir;
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
        fugitiveAirPerYear.push(report.fugitiveAir);
        stackAirPerYear.push(report.stackAir);
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
  }
})();