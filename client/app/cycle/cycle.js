'use strict';

angular.module('angelHackOsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('cycle', {
        url: '/cycle',
        templateUrl: 'app/cycle/cycle.html',
        controller: 'CycleCtrl',
        authenticate: true,
        resolve: {
            checkUser: function(User, $state) {
                User.get().$promise.then(function(user) {
                    if (!user.entryDate) {
                        $state.go('setDate');
                        return;
                    }
                })
            }
        }
      });
  });
