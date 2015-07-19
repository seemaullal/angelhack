'use strict';

angular.module('angelHackOsApp')
  .controller('QuestionsCtrl', function ($scope, $http) {
    $http.get('/api/things')
      .then(function(things){
        $scope.questions = things.data.things;

      }).catch(function(err){
        console.log('error', err);
      });

    $scope.saveAnswer = function(question,i){
      question.answered = true;
      console.log(question);
      $http({
        method:'PUT',
        url: '/api/things/' + question._id,
        data: question
      }).then(function(q){
        $scope.questions[i].answered = true;
        $scope.questions[i].answer = question.answer;
        $http({
          method:'POST',
          url:'/api/twilio/' + question.phone,
          data: question
        }).then(function(sent){
          console.log(sent);
        })
      }).catch(function(err){
        console.log('error', err);
      })
    };

  });
