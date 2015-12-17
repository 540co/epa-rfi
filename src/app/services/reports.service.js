(function() {
  'use strict';

  angular
    .module('app.services')
    .factory('ReportService', ReportService);

  ReportService.$inject = ['$resource', 'DataService'];

  /* @ngInject */
  function ReportService($resource, DataService) {

    var reportService = {
      getReports: getReports
    };

    return reportService;

    function getReports(callback) {
      var reports = DataService.Reports.get(function() {

        var releases = reports.data;

        // Total years
        var total_release_count = releases.length;

        // Add totals to reports
        releases = releases.map(function(report){
          report.total = report.fugitiveAir + report.stackAir;
          return report;
        });

        // Ascending sort of years
        releases.sort(function(a, b){
          return a.year - b.year;
        });

        // Total production
        var total_production = 0;
        releases.forEach(function(report){
          total_production += report.total;
        });

        // Total Reduction
        var total_reduction = (releases[0].total * total_release_count) - total_production;

        // Cumulative Net Reduction Percentage
        var cumulative_reduction_percentage = total_reduction / (releases[0].total * total_release_count);

        // Arrays to build chart(s) (years, totalAir, fugitiveAir, stackAir)
        var yearsArray = [];
        var totalAirArray = [];
        var figutiveAirArray = [];
        var stackAirArray = [];

        releases.forEach(function(report){
          yearsArray.push(report.year);
          totalAirArray.push(report.total);
          figutiveAirArray.push(report.fugitiveAir);
          stackAirArray.push(report.stackAir);
        });

        var data = {
          releases: releases,
          total_production: total_production,
          total_reduction: total_reduction,
          cumulative_reduction_percentage: cumulative_reduction_percentage,
          yearsArray: yearsArray,
          totalAirArray: totalAirArray,
          figutiveAirArray: figutiveAirArray,
          stackAirArray: stackAirArray
        };

        callback(null, data);

      });

      return reports;
    }
  }
})();
