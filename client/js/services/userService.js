function userService($http) {
  this.getAll = () =>
  $http({
    method: 'GET',
    url: '/api/users',
  })
  .then(res =>
    res.data || null
  )
  .catch(err => {
    console.log('err: ', err);
  });


  this.addOne = (user) =>
  $http({
    method: 'POST',
    url: '/api/users',
    data: user,
  })
  .then(res =>
    res.data || null
  )
  .catch(err => { console.log('err: ', err); });


  this.removeOne = (user) =>
  $http({
    method: 'DELETE',
    url: `/api/users/${user._id}`,
  });


  this.editOne = (user) =>
  $http({
    method: 'PUT',
    url: `/api/users/${user._id}`,
    data: user,
  })
  .then(res =>
    res.data || null
  )
  .catch(err => { console.log('err: ', err); });
}

angular.module('user-auth')
.service('userService', userService);
