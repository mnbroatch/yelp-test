function thingController($scope, $http, thingService, $rootScope) {
  $scope.thingArray = [];

  thingService.getAllOfUser($rootScope.currentUser._id)
  .then(things => {
    console.log('things', things);
    if (things) {
      $scope.thingArray = things;
    }
  })
  .catch(err => {
    console.log(err);
  });

  $scope.addOneThing = function (thing) {
    thingService.addOne(thing, $rootScope.currentUser)
    .then(newThing => {
      if (newThing) $scope.thingArray.push(newThing);
    })
    .catch(err => {
      console.log(err);
    });
  };

  $scope.removeOneThing = function (thing) {
    const index = $scope.thingArray.indexOf(thing);
    thingService.removeOne(thing, $rootScope.currentUser)
    .then(() => {
      console.log($scope.thingArray)
      $scope.thingArray.splice(index, 1);
      console.log($scope.thingArray)
    })
    .catch(err => {
      console.log(err);
    });
  };

  $scope.editOneThing = function (editedThing) {
    console.log(editedThing);
    thingService.editOne(editedThing)
    .then(updatedThing => {
      console.log(updatedThing);
    })
    .catch(err => {
      console.log(err);
    });
  };
}

angular.module('user-auth')
.controller('thingController', thingController);
