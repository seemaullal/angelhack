'use strict';

angular.module('angelHackOsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl',
        authenticate: true,
        resolve: {
            checkUser: function(User, $state) {
                User.get().$promise.then(function(user) {
                    if (!user.entryDate) {
                        console.log('here');
                        $state.go('setDate');
                        return;
                    }
                })
            }
        }
      });
  });
