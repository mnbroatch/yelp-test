function mainController($scope, authService) {
  authService.readToken();

  $scope.logout = () => {
    authService.logout();
  };
}

angular.module('user-auth')
.controller('mainController', mainController);
