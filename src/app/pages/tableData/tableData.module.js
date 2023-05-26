(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.tableData', [])
      .config(routeConfig);
  
    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
      $stateProvider
          .state('tableData', {
            url: '/tableData',
            template : '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
            abstract: true,
            controller: 'TableDataPageCtrl',
            controllerAs: 'vm',
            title: 'Table Data',
            sidebarMeta: {
              icon: 'ion-grid',
              order: 300,
            },
          }).state('tableData.table', {
            url: '/table',
            templateUrl: 'app/pages/tableData/table/table.html',
            title: 'Table',
            sidebarMeta: {
              order: 0,
            },
          })
      $urlRouterProvider.when('/tableData','/tableData/table');
    }
  
  })();
  