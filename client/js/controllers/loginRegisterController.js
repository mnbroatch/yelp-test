function loginRegisterController($scope, $state, authService) {
  $scope.user = {};
  $scope.currentState = $state.current.name;

  $scope.submit = () => {
    console.log($scope.user);
    if ($scope.currentState === 'login') {
      authService.login($scope.user)
      .then(() => {
        $state.go('home');
      })
      .catch(err => {
        console.log('err:', err);
        alert('Register failed. Error in console.');
      });
    } else {
      if ($scope.user.password !== $scope.user.password2) {
        $scope.user.password = null;
        $scope.user.password2 = null;
        alert('Passwords must match.  Try again.');
      } else {
        authService.register($scope.user)
        .then(() => {
          $state.go('login');
        })
        .catch(err => {
          console.log('err:', err);
          alert('Register failed. Error in console.');
        });
      }
    }
  };
}

angular.module('user-auth')
.controller('loginRegisterController', loginRegisterController);
