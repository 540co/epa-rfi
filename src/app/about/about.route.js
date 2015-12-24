(function() {
  'use strict';

  angular
    .module('app.dashboard')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('about', {
        url: '/about',
        templateUrl: 'app/about/about.html'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
