'use strict';

angular.module('angelHackOsApp')
  .factory('User', function ($resource) {
    return $resource('/api/users/:id/:controller', {
      id: '@_id'
    },
    {
      changePassword: {
        method: 'PUT',
        params: {
          controller:'password'
        }
      },
      get: {
        method: 'GET',
        params: {
          id:'me'
        }
      },
      setDate: {
        method: 'PUT',
        params: {
          controller: 'setDate'
        }
      }
	  });
  });
