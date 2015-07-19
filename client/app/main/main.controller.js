'use strict';

angular.module('angelHackOsApp')
  .controller('MainCtrl', function ($scope, User) {
    function getCycleDay(day) {
        var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
        var firstDate = new Date(day);
        var secondDate = new Date();
        var dayDiff = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
        return dayDiff % 28;
  }
    User.get().$promise.then(function(user) {
        $scope.day = getCycleDay(user.entryDate);
        if ($scope.day <= 5) {
            $scope.message =  "You are on day " + $scope.day + "of your period. The first day is the most important. "
        }
        if ($scope.day >=6 && $scope.day <=7) {
            $scope.message = `You are in the first half of your cycle. This is when the levels of estrogen (the "female hormone") start to rise. Estrogen plays an important role in keeping you healthy, especially by helping you to build strong bones and to help keep them strong as you age. Estrogen also makes the lining of the uterus (womb) grow and thicken. This lining of the womb is a place that will nourish the embryo if a pregnancy occurs. At the same time the lining of the womb is grown, an egg, or ovum, in one of the ovaries starts to mature. During this phase we usually feel no dramatic change in our disposition or physical well being as a result of our changing cycle. `
        }
        if ($scope.day >=10 && $scope.day <=20  ) {
            $scope.message = "This portion of your cycle suggestions ovulation and fertility. During this time, you may feel a positive disposition and increased sense of hormones.\n\n You are most likely to get pregnant during this phase. Avoid sexual intercourse during this time to avoid conception. "
        }
        if ($scope.day >=21 && $scope.day <=28  ) {
            $scope.message = `During this time, your days may be shadowed by symptoms associated with premenstrual syndrome or PMS.  PMS is a group of symptoms linked to the menstrual cycle. PMS symptoms usually occur before your period starts. The symptoms generally go away after you start bleeding. PMS can affect menstruating women of any age and the effect is different for each woman. For some people, PMS is just a monthly bother. For others, it may be so severe that it makes it hard to even get through the day.

The causes of PMS are not completely clear, but several factors may be involved. Changes in hormones during the menstrual cycle seem to be an important cause. These changing hormones levels may affect some women more than others. Chemical changes in the brain may also be involved.`
        }

    });
  });

>>>>>>> 50218f631ff7e2f22763ca894bbb516e071b44ed
