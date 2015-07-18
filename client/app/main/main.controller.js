'use strict';

angular.module('angelHackOsApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.submit = function(date) {
      console.log(date);
    }
  });
