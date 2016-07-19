function searchController($scope, $http, yelpService, $rootScope, thingService) {
  $scope.resultArray = [];

  $scope.search = function (searchTerm) {
    yelpService.search(searchTerm)
    .then(data => {
    console.log('bus',data.businesses);
      $scope.resultArray = data.businesses;
    })
    .catch(err => {
      console.log(err);
    })
  }

}

angular.module('user-auth')
.controller('searchController', searchController);
