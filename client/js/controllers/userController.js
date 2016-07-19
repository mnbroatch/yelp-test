function userController($scope, $http, userService) {
  $scope.userArray = [];

  userService.getAll()
  .then(users => {
    if (users) $scope.userArray.push(...users);
  })
  .catch(err => {
    console.log(err);
  });


  $scope.addOneUser = function (user) {
    userService.addOne(user)
    .then(newUser => {
      if (newUser) $scope.userArray.push(newUser);
    })
    .catch(err => {
      console.log(err);
    });
  };


  $scope.removeOneUser = function (user) {
    const index = $scope.userArray.indexOf(user);
    userService.removeOne(user)
    .then(() => {
      $scope.userArray.splice(index, 1);
    })
    .catch(err => {
      console.log(err);
    });
  };


  //  assumes uuid that doesn't change on edit
  $scope.editOneUser = function (editedUser) {
    console.log(editedUser);
    userService.editOne(editedUser)
    .then(() => {
      console.log('edited');
    })
    .catch(err => {
      console.log(err);
    });
  };
}

angular.module('user-auth')
.controller('userController', userController);
