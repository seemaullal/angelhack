'use strict';

angular.module('angelHackOsApp')
  .controller('SetDateCtrl', function ($scope, $location, User, Auth) {
    User.get().$promise.then(function(curUser) {
        $scope.user = curUser;
    })
    $scope.submit = function(date) {
      User.setDate({id: $scope.user._id}, {date: date});
      $location.path('/main')
    };
  });
