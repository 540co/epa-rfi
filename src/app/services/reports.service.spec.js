(function() {
  'use strict';

  describe('ReportService', function() {
    var ReportService,
      DataServiceMock;

    beforeEach(function() {
      module('app.services', function($provide) {
        $provide.constant('TRI_API_ENDPOINT', 'MOCK_TRI_ENPOINT');
      });
    });

    beforeEach(inject(function (_ReportService_, _DataService_) {
      ReportService = _ReportService_;
      DataServiceMock = _DataService_;
    }));

    it('should calculate report of yearly air pollution totals', function(done) {
      var expectedQueryParams = {
          'groupBy': 'year',
          'operation': 'sum',
          'agg_fields': 'fugitiveAir,stackAir'
        },
        mockReportData = {
          meta: {},
          data: [
            {
              year: 2002,
              fugitiveAir: 200,
              stackAir: 300
            },
            {
              year: 2000,
              fugitiveAir: 1000,
              stackAir: 1500
            },
            {
              year: 2001,
              fugitiveAir: 500,
              stackAir: 875
            },
            {
              year: 2003,
              fugitiveAir: 100,
              stackAir: 200
            }
          ]
        },
        expectedData = {
          report: [
            {
              year: 2000,
              fugitiveAir: 1000,
              stackAir: 1500,
              total: 2500
            },
            {
              year: 2001,
              fugitiveAir: 500,
              stackAir: 875,
              total: 1375
            },
            {
              year: 2002,
              fugitiveAir: 200,
              stackAir: 300,
              total: 500
            },
            {
              year: 2003,
              fugitiveAir: 100,
              stackAir: 200,
              total: 300
            }
          ],
          totalProduction: 4675,
          totalReduction: 5325,
          cumulativeReductionPercentage: 0.5325,
          years: [2000,2001,2002,2003],
          totalAirPerYear: [2500,1375,500,300],
          fugitiveAirPerYear: [1000,500,200,100],
          stackAirPerYear: [1500,875,300,200]
        },
        errorCallback = jasmine.createSpy('errorCallback');

      spyOn(DataServiceMock.Reports, 'query').and.callFake(function(queryParams, successCallback) {
        successCallback(mockReportData);
      });

      ReportService.getYearlyAirPollutionReport({}, function(data) {
        expect(data).toEqual(expectedData);

        done();
      }, errorCallback);

      expect(DataServiceMock.Reports.query).toHaveBeenCalledWith(expectedQueryParams, jasmine.any(Function), jasmine.any(Function));

      expect(errorCallback).not.toHaveBeenCalled();
    });

    it('should use error callback if report query fails', function() {
      var successCallback = jasmine.createSpy('successCallback'),
        errorCallback = jasmine.createSpy('errorCallback');

      spyOn(DataServiceMock.Reports, 'query').and.callFake(function(queryParams, successCallback, errorCallback) {
        errorCallback();
      });

      ReportService.getYearlyAirPollutionReport({}, successCallback, errorCallback);

      expect(DataServiceMock.Reports.query).toHaveBeenCalled();

      expect(successCallback).not.toHaveBeenCalled();
      expect(errorCallback).toHaveBeenCalled();
    });

    it('should add start/end year to query params', function() {
      var expectedQueryParams = {
          'filters': 'year:[2005 TO 2009]',
          'groupBy': 'year',
          'operation': 'sum',
          'agg_fields': 'fugitiveAir,stackAir'
        },
        successCallback = jasmine.createSpy('successCallback'),
        errorCallback = jasmine.createSpy('errorCallback');

      spyOn(DataServiceMock.Reports, 'query');

      ReportService.getYearlyAirPollutionReport({
          start_year: 2005,
          end_year: 2009
        }, successCallback, errorCallback);

      expect(DataServiceMock.Reports.query).toHaveBeenCalledWith(expectedQueryParams, jasmine.any(Function), jasmine.any(Function));
    });

    it('should add start year to query params', function() {
      var expectedQueryParams = {
          'filters': 'year:[2005 TO *]',
          'groupBy': 'year',
          'operation': 'sum',
          'agg_fields': 'fugitiveAir,stackAir'
        },
        successCallback = jasmine.createSpy('successCallback'),
        errorCallback = jasmine.createSpy('errorCallback');

      spyOn(DataServiceMock.Reports, 'query');

      ReportService.getYearlyAirPollutionReport({
          start_year: 2005
        }, successCallback, errorCallback);

      expect(DataServiceMock.Reports.query).toHaveBeenCalledWith(expectedQueryParams, jasmine.any(Function), jasmine.any(Function));
    });

    it('should add end year to query params', function() {
      var expectedQueryParams = {
          'filters': 'year:[* TO 2009]',
          'groupBy': 'year',
          'operation': 'sum',
          'agg_fields': 'fugitiveAir,stackAir'
        },
        successCallback = jasmine.createSpy('successCallback'),
        errorCallback = jasmine.createSpy('errorCallback');

      spyOn(DataServiceMock.Reports, 'query');

      ReportService.getYearlyAirPollutionReport({
          end_year: 2009
        }, successCallback, errorCallback);

      expect(DataServiceMock.Reports.query).toHaveBeenCalledWith(expectedQueryParams, jasmine.any(Function), jasmine.any(Function));
    });

    it('should add filters to query params', function() {
      var expectedQueryParams = {
          'filters': 'year:[2005 TO 2009] AND state:TX AND county:HARRIS',
          'groupBy': 'year',
          'operation': 'sum',
          'agg_fields': 'fugitiveAir,stackAir'
        },
        successCallback = jasmine.createSpy('successCallback'),
        errorCallback = jasmine.createSpy('errorCallback');

      spyOn(DataServiceMock.Reports, 'query');

      ReportService.getYearlyAirPollutionReport({
          start_year: 2005,
          end_year: 2009,
          state: 'TX',
          county: 'HARRIS'
        }, successCallback, errorCallback);

      expect(DataServiceMock.Reports.query).toHaveBeenCalledWith(expectedQueryParams, jasmine.any(Function), jasmine.any(Function));
    });
  });
})();
