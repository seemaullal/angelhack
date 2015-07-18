'use strict';

angular.module('angelHackOsApp')
  .controller('MainCtrl', function ($scope, User) {
    $scope.submit = function(date) {
      User.setDate({date: date});
    };
  });
