(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('logger', logger);

    logger.$inject = ['$log', 'toastr'];
  /** @ngInject */
  function logger($log, toastr) {
    var service = {
      showToasts: true,
      error: error,
      log: $log.log
    };

    return service;

    function error (message, data, title) {
      toastr.error(message, title);
      $log.error('Error: ' + message, data);
    }
  }

})();
