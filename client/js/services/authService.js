function authService($http, $rootScope, $cookies, $state, TOKENNAME) {
  this.authorize = () =>
  $http.post('/api/auth/authorize', {}, (err) =>
  console.log(err)
  );

  this.readToken = () => {
    const token = $cookies.get(TOKENNAME);

    if (typeof token === 'string') {
      const payload = JSON.parse(atob(token.split('.')[1]));
      $rootScope.currentUser = payload;
    }
  };

  this.register = userObj =>
  $http.post('/api/auth/register', userObj);

  this.login = userObj =>
  $http.post('/api/auth/login', userObj)
  .then(res => {
    $rootScope.currentUser = res.data;
  });

  this.logout = () => {
    $cookies.remove(TOKENNAME);
    $rootScope.currentUser = null;
    $state.go('home');
  };
}

angular.module('user-auth')
.service('authService', authService);
