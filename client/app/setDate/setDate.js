'use strict';

angular.module('angelHackOsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('setDate', {
        url: '/setDate',
        templateUrl: 'app/setDate/setDate.html',
        controller: 'SetDateCtrl'
      });
  });
