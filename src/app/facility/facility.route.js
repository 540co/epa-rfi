(function() {
  'use strict';

  angular
    .module('app.facility')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('facility', {
        url: '/facility',
        templateUrl: 'app/facility/facility.html',
        controller: 'FacilityController',
        controllerAs: 'vm'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
