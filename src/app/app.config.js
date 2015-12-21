(function() {
  'use strict';

  angular
    .module('app')
    .constant('TRI_API_ENDPOINT', 'https://airhound-dev.540.co/api')
    .config(function(AngularyticsProvider) {
      AngularyticsProvider.setEventHandlers(['Console', 'GoogleUniversal']);
    }).run(function(Angularytics) {
      Angularytics.init();
    });
})();
