(function() {
  'use strict';

  describe('epaApp', function() {
    var scope,
      $log,
      logger,
      $controller,
      ReportService,
      mockReportData = {
        report: [],
        totalProduction: 1000,
        totalReduction: 500,
        cumulativeReductionPercentage: .5,
        years: [2010,2011,2012,2013],
        totalAirPerYear: [400,300,200,100],
        fugitiveAirPerYear: [300,200,100,50],
        stackAirPerYear: [100,100,100,50]
      };

    beforeEach(function() {
      module('app.dashboard', function($provide) {
        $provide.constant('TRI_API_ENDPOINT', 'MOCK_TRI_ENPOINT');
      });
    });

    fdescribe('DashboardController', function() {
      beforeEach(inject(function(_$controller_, $rootScope, _ReportService_, _$log_, _logger_) {
        scope = $rootScope.$new();
        ReportService = _ReportService_;
        $controller = _$controller_;
        $log = _$log_;
        logger = _logger_;

        spyOn(ReportService, 'getYearlyAirPollutionReport').and.callFake(function(queryParams, successCallback) {
          successCallback(mockReportData);
          return {
            $promise: {}
          };
        });

      }));

      it('should load report with default year range and filters', function() {
        var vm = $controller('DashboardController', {
          $scope: scope,
          ReportService: ReportService,
          $log: $log,
          logger: logger
        });

        expect(ReportService.getYearlyAirPollutionReport).toHaveBeenCalledWith({
          start_year: 1998
        }, jasmine.any(Function), jasmine.any(Function));

        expect(vm.showNoReportError).toBe(false);
        expect(vm.netReductionPounds).toEqual(mockReportData.totalReduction);
        expect(vm.netReductionPercent).toEqual(mockReportData.cumulativeReductionPercentage * 100);
        expect(vm.netProductionPounds).toEqual(mockReportData.totalProduction);
        expect(vm.yearFilters).toEqual(mockReportData.years);
      });
    });
  });
})();
