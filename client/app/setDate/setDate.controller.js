'use strict';

angular.module('angelHackOsApp')
  .controller('SetDateCtrl', function ($scope, User, Auth) {
    User.get().$promise.then(function(curUser) {
        $scope.user = curUser;
    })
    $scope.submit = function(date) {
      User.setDate({id: $scope.user._id}, {date: date});
    };
  });
