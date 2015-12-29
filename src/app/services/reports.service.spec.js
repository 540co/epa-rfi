(function() {
  'use strict';

  describe('ReportService', function() {
    var ReportService,
      DataServiceMock,
      $q;

    beforeEach(function() {
      module('app.services', function($provide) {
        $provide.constant('TRI_API_ENDPOINT', 'MOCK_TRI_ENPOINT');
      });
    });

    beforeEach(inject(function (_ReportService_, _DataService_, _$q_) {
      ReportService = _ReportService_;
      DataServiceMock = _DataService_;
      $q = _$q_;
    }));

    it('should calculate report of yearly air pollution totals', function(done) {
      var expectedPoundsQueryParams = {
          'groupBy': 'year',
          'operation': 'sum',
          'agg_fields': 'quantitiesEnteringEnvironment.fugitiveAir,quantitiesEnteringEnvironment.stackAir',
          'filters': 'unitOfMeasure:Pounds'
        },
        expectedGramsQueryParams = {
          'groupBy': 'year',
          'operation': 'sum',
          'agg_fields': 'quantitiesEnteringEnvironment.fugitiveAir,quantitiesEnteringEnvironment.stackAir',
          'filters': 'unitOfMeasure:Grams'
        },
        mockPoundsReportData = {
          meta: {},
          data: [
            {
              year: 2002,
              quantitiesEnteringEnvironment: {
                fugitiveAir: 100,
                stackAir: 200
              }
            },
            {
              year: 2000,
              quantitiesEnteringEnvironment: {
                fugitiveAir: 900,
                stackAir: 1400
              }
            },
            {
              year: 2001,
              quantitiesEnteringEnvironment: {
                fugitiveAir: 500,
                stackAir: 875
              }
            },
            {
              year: 2003,
              quantitiesEnteringEnvironment: {
                fugitiveAir: 100,
                stackAir: 200
              }
            }
          ]
        },
        mockGramsReportData = {
          meta: {},
          data: [
            {
              year: 2004,
              quantitiesEnteringEnvironment: {
                fugitiveAir: 45359.2370380378298,
                stackAir: 45359.2370380378298
              }
            },
            {
              year: 2000,
              quantitiesEnteringEnvironment: {
                fugitiveAir: 45359.2370380378298,
                stackAir: 45359.2370380378298
              }
            }
          ]
        },
        expectedData = {
          report: [
            {
              year: 2000,
              quantitiesEnteringEnvironment: {
                fugitiveAir: 1000,
                stackAir: 1500
              },
              total: 2500
            },
            {
              year: 2001,
              quantitiesEnteringEnvironment: {
                fugitiveAir: 500,
                stackAir: 875
              },
              total: 1375
            },
            {
              year: 2002,
              quantitiesEnteringEnvironment: {
                fugitiveAir: 100,
                stackAir: 200
              },
              total: 300
            },
            {
              year: 2003,
              quantitiesEnteringEnvironment: {
                fugitiveAir: 100,
                stackAir: 200
              },
              total: 300
            },
            {
              year: 2004,
              quantitiesEnteringEnvironment: {
                fugitiveAir: 100,
                stackAir: 100
              },
              total: 200
            }
          ],
          totalProduction: 4675,
          totalReduction: 7825,
          cumulativeReductionPercentage: 0.626,
          years: [2000,2001,2002,2003,2004],
          totalAirPerYear: [2500,1375,300,300,200],
          fugitiveAirPerYear: [1000,500,100,100,100],
          stackAirPerYear: [1500,875,200,200,100]
        },
        errorCallback = jasmine.createSpy('errorCallback');

      spyOn($q, 'all').and.callFake(function() {
        return {
          then: function(successCallback) {
            successCallback([mockPoundsReportData, mockGramsReportData]);
          }
        }
      })

      spyOn(DataServiceMock.CleanAirActReports, 'query').and.callFake(function() {
        return {
          $promise: {}
        };
      });

      ReportService.getYearlyAirPollutionReport({}, function(data) {
        expect(data).toEqual(expectedData);

        done();
      }, errorCallback);

      expect(DataServiceMock.CleanAirActReports.query).toHaveBeenCalledWith(expectedPoundsQueryParams);
      expect(DataServiceMock.CleanAirActReports.query).toHaveBeenCalledWith(expectedGramsQueryParams);

      expect(errorCallback).not.toHaveBeenCalled();
    });

    it('should use error callback if report query fails', function() {
      var successCallback = jasmine.createSpy('successCallback'),
        errorCallback = jasmine.createSpy('errorCallback');

      spyOn($q, 'all').and.callFake(function() {
        return {
          then: function(successCallback, errorCallback) {
            errorCallback();
          }
        };
      });

      spyOn(DataServiceMock.CleanAirActReports, 'query').and.callFake(function() {
        return {
          $promise: {}
        };
      });

      ReportService.getYearlyAirPollutionReport({}, successCallback, errorCallback);

      expect(DataServiceMock.CleanAirActReports.query).toHaveBeenCalled();

      expect(successCallback).not.toHaveBeenCalled();
      expect(errorCallback).toHaveBeenCalled();
    });

    it('should add start/end year to query params', function() {
      var expectedPoundsQueryParams = {
          'filters': 'year:[2005 TO 2009] AND unitOfMeasure:Pounds',
          'groupBy': 'year',
          'operation': 'sum',
          'agg_fields': 'quantitiesEnteringEnvironment.fugitiveAir,quantitiesEnteringEnvironment.stackAir'
        },
        expectedGramsQueryParams = {
            'filters': 'year:[2005 TO 2009] AND unitOfMeasure:Grams',
            'groupBy': 'year',
            'operation': 'sum',
            'agg_fields': 'quantitiesEnteringEnvironment.fugitiveAir,quantitiesEnteringEnvironment.stackAir'
          },
        successCallback = jasmine.createSpy('successCallback'),
        errorCallback = jasmine.createSpy('errorCallback');

      spyOn(DataServiceMock.CleanAirActReports, 'query').and.callFake(function() {
        return {
          $promise: {}
        };
      });

      ReportService.getYearlyAirPollutionReport({
          start_year: 2005,
          end_year: 2009
        }, successCallback, errorCallback);

      expect(DataServiceMock.CleanAirActReports.query.calls.argsFor(0)).toEqual([expectedPoundsQueryParams]);
      expect(DataServiceMock.CleanAirActReports.query.calls.argsFor(1)).toEqual([expectedGramsQueryParams]);
    });

    it('should add start year to query params', function() {
      var expectedPoundsQueryParams = {
          'filters': 'year:[2005 TO *] AND unitOfMeasure:Pounds',
          'groupBy': 'year',
          'operation': 'sum',
          'agg_fields': 'quantitiesEnteringEnvironment.fugitiveAir,quantitiesEnteringEnvironment.stackAir'
        },
        expectedGramsQueryParams = {
          'filters': 'year:[2005 TO *] AND unitOfMeasure:Grams',
          'groupBy': 'year',
          'operation': 'sum',
          'agg_fields': 'quantitiesEnteringEnvironment.fugitiveAir,quantitiesEnteringEnvironment.stackAir'
        },
        successCallback = jasmine.createSpy('successCallback'),
        errorCallback = jasmine.createSpy('errorCallback');

      spyOn(DataServiceMock.CleanAirActReports, 'query').and.callFake(function() {
        return {
          $promise: {}
        };
      });

      ReportService.getYearlyAirPollutionReport({
          start_year: 2005
        }, successCallback, errorCallback);

      expect(DataServiceMock.CleanAirActReports.query.calls.argsFor(0)).toEqual([expectedPoundsQueryParams]);
      expect(DataServiceMock.CleanAirActReports.query.calls.argsFor(1)).toEqual([expectedGramsQueryParams]);
    });

    it('should add end year to query params', function() {
      var expectedPoundsQueryParams = {
          'filters': 'year:[* TO 2009] AND unitOfMeasure:Pounds',
          'groupBy': 'year',
          'operation': 'sum',
          'agg_fields': 'quantitiesEnteringEnvironment.fugitiveAir,quantitiesEnteringEnvironment.stackAir'
        },
        expectedGramsQueryParams = {
          'filters': 'year:[* TO 2009] AND unitOfMeasure:Grams',
          'groupBy': 'year',
          'operation': 'sum',
          'agg_fields': 'quantitiesEnteringEnvironment.fugitiveAir,quantitiesEnteringEnvironment.stackAir'
        },
        successCallback = jasmine.createSpy('successCallback'),
        errorCallback = jasmine.createSpy('errorCallback');

      spyOn(DataServiceMock.CleanAirActReports, 'query').and.callFake(function() {
        return {
          $promise: {}
        };
      });

      ReportService.getYearlyAirPollutionReport({
          end_year: 2009
        }, successCallback, errorCallback);

      expect(DataServiceMock.CleanAirActReports.query.calls.argsFor(0)).toEqual([expectedPoundsQueryParams]);
      expect(DataServiceMock.CleanAirActReports.query.calls.argsFor(1)).toEqual([expectedGramsQueryParams]);
    });

    it('should add filters to query params', function() {
      var expectedPoundsQueryParams = {
          'filters': 'year:[2005 TO 2009] AND facility.address.state:TX AND facility.address.county:HARRIS AND unitOfMeasure:Pounds',
          'groupBy': 'year',
          'operation': 'sum',
          'agg_fields': 'quantitiesEnteringEnvironment.fugitiveAir,quantitiesEnteringEnvironment.stackAir'
        },
        expectedGramsQueryParams = {
            'filters': 'year:[2005 TO 2009] AND facility.address.state:TX AND facility.address.county:HARRIS AND unitOfMeasure:Grams',
            'groupBy': 'year',
            'operation': 'sum',
            'agg_fields': 'quantitiesEnteringEnvironment.fugitiveAir,quantitiesEnteringEnvironment.stackAir'
          },
        successCallback = jasmine.createSpy('successCallback'),
        errorCallback = jasmine.createSpy('errorCallback');

      spyOn(DataServiceMock.CleanAirActReports, 'query').and.callFake(function() {
        return {
          $promise: {}
        };
      });

      ReportService.getYearlyAirPollutionReport({
          start_year: 2005,
          end_year: 2009,
          state: 'TX',
          county: 'HARRIS'
        }, successCallback, errorCallback);

      expect(DataServiceMock.CleanAirActReports.query.calls.argsFor(0)).toEqual([expectedPoundsQueryParams]);
      expect(DataServiceMock.CleanAirActReports.query.calls.argsFor(1)).toEqual([expectedGramsQueryParams]);
    });


    it('should build a list of states that we have report data for', function() {
      var mockReportData = {
          meta: {},
          data: [
            {
              facility: {
                address: {
                  state: 'TX'
                }
              },
              quantitiesEnteringEnvironment: {
                fugitiveAir: 100,
                stackAir: 200
              }
            },
            {
              facility: {
                address: {
                  state: 'FL'
                }
              },
              quantitiesEnteringEnvironment: {
                fugitiveAir: 100,
                stackAir: 200
              }
            }
          ]
        },
        successCallback = jasmine.createSpy('successCallback'),
        errorCallback = jasmine.createSpy('errorCallback'),
        expectedStateList = ['FL', 'TX'];

      spyOn(DataServiceMock.CleanAirActReports, 'query').and.callFake(function(queryParams, successCallback) {
        successCallback(mockReportData);
        return {
          $promise: {}
        };
      });

      ReportService.getStateList(successCallback, errorCallback);

      expect(successCallback).toHaveBeenCalledWith(expectedStateList);
      expect(errorCallback).not.toHaveBeenCalled();
    });

    it('should call error callback if error occurs pulling state list', function() {
      var
        successCallback = jasmine.createSpy('successCallback'),
        errorCallback = jasmine.createSpy('errorCallback'),
        expectedError = {
          status: 500,
          statusText: 'some error',
          data: {}
        };

      spyOn(DataServiceMock.CleanAirActReports, 'query').and.callFake(function(queryParams, successCallback, errorCallback) {
        errorCallback(expectedError);
        return {
          $promise: {}
        };
      });

      ReportService.getStateList(successCallback, errorCallback);

      expect(successCallback).not.toHaveBeenCalled();
      expect(errorCallback).toHaveBeenCalledWith(expectedError);
    });
  });
})();
