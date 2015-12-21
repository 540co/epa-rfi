(function() {
  'use strict';

  angular
    .module('app.services')
    .factory('DataService', DataService);

    DataService.$inject = ['$resource', 'TRI_API_ENDPOINT'];

    /** @ngInject */
    function DataService($resource, TRI_API_ENDPOINT) {
      var service = {
        Facilities: $resource(
          TRI_API_ENDPOINT + '/facilities/:id',
          {id: '@id'},
          {
            'query':  {method: 'GET', isArray: false, cache: true}
          }),
        Releases: $resource(
          TRI_API_ENDPOINT + '/releases/:id',
          {id: '@id'},
          {
            'query':  {method: 'GET', isArray: false, cache: true}
          }),
        Reports: $resource(
          TRI_API_ENDPOINT + '/reports',
          {},
          {
            'query':  {method: 'GET', isArray: false, cache: true}
          }),
        FacilityReports: $resource(
          TRI_API_ENDPOINT + '/facilities/:id/releases',
          {id: '@id'},
          {
            'query': {method: 'GET', isArray: false, cache: true}
          })
      };

      return service;
    }

})();
