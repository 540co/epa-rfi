(function() {
  'use strict';

  describe('epaApp', function() {
    var scope,
      vm,
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
      },
      mockStateList = ['DC','FL','TX'];

    beforeEach(function() {
      module('app.dashboard', function($provide) {
        $provide.constant('TRI_API_ENDPOINT', 'MOCK_TRI_ENPOINT');
      });
    });

    describe('DashboardController', function() {
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

        spyOn(ReportService, 'getStateList').and.callFake(function(successCallback) {
          successCallback(mockStateList);
        });

        vm = $controller('DashboardController', {
          $scope: scope,
          ReportService: ReportService,
          $log: $log,
          logger: logger
        });

      }));

      it('should load report with default year range and filters', function() {
        expect(ReportService.getYearlyAirPollutionReport).toHaveBeenCalledWith({
          start_year: 1998
        }, jasmine.any(Function), jasmine.any(Function));

        expect(ReportService.getStateList).toHaveBeenCalledWith(jasmine.any(Function), jasmine.any(Function));

        expect(vm.showNoReportError).toBe(false);
        expect(vm.netReductionPounds).toEqual(mockReportData.totalReduction);
        expect(vm.netReductionPercent).toEqual(mockReportData.cumulativeReductionPercentage * 100);
        expect(vm.netProductionPounds).toEqual(mockReportData.totalProduction);
        expect(vm.yearFilters).toEqual(mockReportData.years);
        expect(vm.stateFilters).toEqual(mockStateList);
      });

      it('should filter the report by start/end year', function() {
        vm.searchFilter = {
          start_year: '1995',
          end_year: '1997'
        };

        //Reset spy
        ReportService.getYearlyAirPollutionReport.calls.reset();

        vm.updateDashboard(vm.searchFilter);

        expect(ReportService.getYearlyAirPollutionReport).toHaveBeenCalledWith({
          start_year: '1995',
          end_year: '1997'
        }, jasmine.any(Function), jasmine.any(Function));

        expect(vm.showNoReportError).toBe(false);
        expect(vm.netReductionPounds).toEqual(mockReportData.totalReduction);
        expect(vm.netReductionPercent).toEqual(mockReportData.cumulativeReductionPercentage * 100);
        expect(vm.netProductionPounds).toEqual(mockReportData.totalProduction);
        expect(vm.yearFilters).toEqual(mockReportData.years);
      });

      it('should use default start/end years if not set', function() {
        vm.searchFilter = {};

        //Reset spy
        ReportService.getYearlyAirPollutionReport.calls.reset();

        vm.updateDashboard(vm.searchFilter);

        expect(ReportService.getYearlyAirPollutionReport).toHaveBeenCalledWith({
          start_year: '1998',
          end_year: '2013'
        }, jasmine.any(Function), jasmine.any(Function));

        expect(vm.showNoReportError).toBe(false);
        expect(vm.netReductionPounds).toEqual(mockReportData.totalReduction);
        expect(vm.netReductionPercent).toEqual(mockReportData.cumulativeReductionPercentage * 100);
        expect(vm.netProductionPounds).toEqual(mockReportData.totalProduction);
        expect(vm.yearFilters).toEqual(mockReportData.years);
      });

      it('should filter the report by state', function() {
        vm.searchFilter = {
          state: 'TX'
        };

        //Reset spy
        ReportService.getYearlyAirPollutionReport.calls.reset();

        vm.updateDashboard(vm.searchFilter);

        expect(ReportService.getYearlyAirPollutionReport).toHaveBeenCalledWith({
          start_year: '1998',
          end_year: '2013',
          state: 'TX'
        }, jasmine.any(Function), jasmine.any(Function));

        expect(vm.showNoReportError).toBe(false);
        expect(vm.netReductionPounds).toEqual(mockReportData.totalReduction);
        expect(vm.netReductionPercent).toEqual(mockReportData.cumulativeReductionPercentage * 100);
        expect(vm.netProductionPounds).toEqual(mockReportData.totalProduction);
        expect(vm.yearFilters).toEqual(mockReportData.years);
      });

      it('should filter the report by zipcode', function() {
        vm.searchFilter = {
          zipcode: '20002'
        };

        //Reset spy
        ReportService.getYearlyAirPollutionReport.calls.reset();

        vm.updateDashboard(vm.searchFilter);

        expect(ReportService.getYearlyAirPollutionReport).toHaveBeenCalledWith({
          start_year: '1998',
          end_year: '2013',
          zipcode: '20002'
        }, jasmine.any(Function), jasmine.any(Function));

        expect(vm.showNoReportError).toBe(false);
        expect(vm.netReductionPounds).toEqual(mockReportData.totalReduction);
        expect(vm.netReductionPercent).toEqual(mockReportData.cumulativeReductionPercentage * 100);
        expect(vm.netProductionPounds).toEqual(mockReportData.totalProduction);
        expect(vm.yearFilters).toEqual(mockReportData.years);
      });

      it('should reset filters to defaults and rerun report', function() {
        vm.searchFilter = {
          zipcode: '20002'
        };

        //Reset spy
        ReportService.getYearlyAirPollutionReport.calls.reset();

        vm.resetDashboard();

        expect(vm.searchFilter).toEqual({
          zipcode: undefined
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

      it('should clear the state filter', function() {
        vm.searchFilter = {
          state: 'TX',
          group: 'state'
        };

        vm.clearStateValue();

        expect(vm.searchFilter).toEqual({
          state: undefined,
          group: undefined
        });
      });

      it('should clear the zip code filter', function() {
        vm.searchFilter = {
          zipcode: '20002',
          group: 'zipcode'
        };

        vm.clearZipcodeValue();

        expect(vm.searchFilter).toEqual({
          zipcode: undefined,
          group: undefined
        });
      });
    });

    describe('DashboardController getYearlyAirPollutionReport empty data', function() {
      beforeEach(inject(function(_$controller_, $rootScope, _ReportService_, _$log_, _logger_) {
        scope = $rootScope.$new();
        ReportService = _ReportService_;
        $controller = _$controller_;
        $log = _$log_;
        logger = _logger_;

        spyOn(ReportService, 'getYearlyAirPollutionReport').and.callFake(function(queryParams, successCallback, errorCallback) {
          successCallback({});
          return {
            $promise: {}
          };
        });

        spyOn(ReportService, 'getStateList').and.callFake(function(successCallback) {
          successCallback(mockStateList);
        });

        vm = $controller('DashboardController', {
          $scope: scope,
          ReportService: ReportService,
          $log: $log,
          logger: logger
        });

      }));

      it('should show error occurred while loading report data', function() {
        vm.updateDashboard({});
        expect(vm.showNoReportError).toBe(true);
      });
    });

    describe('DashboardController getYearlyAirPollutionReport error', function() {
      beforeEach(inject(function(_$controller_, $rootScope, _ReportService_, _$log_, _logger_) {
        scope = $rootScope.$new();
        ReportService = _ReportService_;
        $controller = _$controller_;
        $log = _$log_;
        logger = _logger_;

        spyOn(ReportService, 'getYearlyAirPollutionReport').and.callFake(function(queryParams, successCallback, errorCallback) {
          errorCallback({
            status: 400,
            statusText: 'Error',
            data: {}
          });
          return {
            $promise: {}
          };
        });

        spyOn(ReportService, 'getStateList').and.callFake(function(successCallback) {
          successCallback(mockStateList);
        });

        vm = $controller('DashboardController', {
          $scope: scope,
          ReportService: ReportService,
          $log: $log,
          logger: logger
        });

      }));

      it('should show error occurred while loading report data', function() {
        expect(vm.showError).toBe(true);
      });
    });

    describe('DashboardController getYearlyAirPollutionReport error', function() {
      beforeEach(inject(function(_$controller_, $rootScope, _ReportService_, _$log_, _logger_) {
        scope = $rootScope.$new();
        ReportService = _ReportService_;
        $controller = _$controller_;
        $log = _$log_;
        logger = _logger_;

        spyOn(ReportService, 'getYearlyAirPollutionReport').and.callFake(function(queryParams, successCallback, errorCallback) {
          successCallback(mockReportData);
          return {
            $promise: {}
          };
        });

        spyOn(ReportService, 'getStateList').and.callFake(function(successCallback, errorCallback) {
          errorCallback({
            status: 400,
            statusText: 'Error',
            data: {}
          });
        });

        vm = $controller('DashboardController', {
          $scope: scope,
          ReportService: ReportService,
          $log: $log,
          logger: logger
        });

      }));

      it('should show error occurred while loading state data', function() {
        expect(vm.showError).toBe(true);
      });
    });
  });
})();
