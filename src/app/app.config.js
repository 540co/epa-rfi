(function() {
  'use strict';

  angular
    .module('app')
    // Use the following value for local development using the dev version of the API
    // .constant('TRI_API_ENDPOINT', 'https://airhound-dev.540.co/api')
    .constant('TRI_API_ENDPOINT', '/api')
    .config(function(AngularyticsProvider) {
      AngularyticsProvider.setEventHandlers(['Console', 'GoogleUniversal']);
    }).run(function(Angularytics) {
      Angularytics.init();
    });
})();
