(function() {
  'use strict';

  angular
    .module('app.core')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('404', {
        url: '/404',
        templateUrl: 'app/core/404.html',
        title: '404'
      });

    $urlRouterProvider.otherwise('/404');
  }

})();
