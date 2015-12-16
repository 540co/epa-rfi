(function() {
  'use strict';

  angular
    .module('app.services')
    .factory('DataService', DataService);

    DataService.$inject = ['$resource', 'TRI_API_ENDPOINT'];

    /** @ngInject */
    function DataService($resource, TRI_API_ENDPOINT) {
      var service = {
        Facilities: $resource(TRI_API_ENDPOINT + '/facilites/:id', {id: '@id'}),
        Releases: $resource(TRI_API_ENDPOINT + '/releases/:id', {id: '@id'}),
        Reports: $resource(TRI_API_ENDPOINT + '/reports')
      };

      return service;
    }

})();
