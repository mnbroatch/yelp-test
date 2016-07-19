const app = angular.module('user-auth', ['ui.bootstrap', 'ui.router', 'ngCookies']);

function module($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('home', {
    url: '/home',
    templateUrl: '/html/home.html',
  })
  .state('thing', {
    url: '/thing',
    templateUrl: 'html/thing.html',
    controller: 'thingController',
    resolve: {
      authorize: authService =>
      authService.authorize(),
    },
  })
  .state('login', {
    url: '/login',
    templateUrl: '/html/loginregister.html',
    controller: 'loginRegisterController',
  })
  .state('register', {
    url: '/register',
    templateUrl: '/html/loginregister.html',
    controller: 'loginRegisterController',
  })
  .state('search', {
    url: '/search',
    templateUrl: '/html/search.html',
    controller: 'searchController',
  })
  .state('business', {
    url: '/business/:id',
    templateUrl: '/html/business.html',
    controller: 'businessController',
    resolve: {
      Business: (yelpService,$stateParams) =>
      yelpService.getOne($stateParams.id),
    },
  });




  $urlRouterProvider.otherwise('/home');
}

app.constant('TOKENNAME', 'authtoken');
app.config(module);
