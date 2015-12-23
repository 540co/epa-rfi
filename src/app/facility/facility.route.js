(function() {
  'use strict';

  angular
    .module('app.facility')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('facility', {
        url: '/facility/:facilityId',
        templateUrl: 'app/facility/facility.html',
        controller: 'FacilityController',
        controllerAs: 'vm'
      });

    $stateProvider
      .state('facilities', {
        url: '/facilities',
        templateUrl: 'app/facility/facilityList.html',
        controller: 'FacilityListController',
        controllerAs: 'vm'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
