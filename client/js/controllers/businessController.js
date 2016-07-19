function businessController($scope, $http, thingService, $rootScope, Business) {

  $scope.business = Business;

  $scope.thing = {
    users:[],
    numFavorites:0,
  };

  thingService.getThing(Business.id)
  .then(thing => {
    if (thing)
      $scope.thing = thing;
  });

  $scope.addOneThing = function () {
    thingService.addOne(Business, $rootScope.currentUser)
    .then(newThing => {
      $scope.thing.users.push($rootScope.currentUser._id);
      $scope.thing.numFavorites++;
    })
    .catch(err => {
      console.log(err);
    });
  };

  $scope.removeOneThing = function () {
    const index = $scope.thing.users.indexOf($rootScope.currentUser._id);
    thingService.removeOne($scope.thing, $rootScope.currentUser)
    .then(() => {
      $scope.thing.users.splice(index, 1);
      $scope.thing.numFavorites--;
    })
    .catch(err => {
      console.log(err);
    });
  };


}

angular.module('user-auth')
.controller('businessController', businessController);
