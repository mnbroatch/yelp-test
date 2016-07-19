function thingService($http) {
  this.getAll = () =>
  $http({
    method: 'GET',
    url: '/api/things',
  })
  .then(res =>
    res.data || null
  )
  .catch(err => {
    console.log('err: ', err);
  });

  this.getAllOfUser = (userId) =>
  $http({
    method: 'GET',
    url: `/api/things/${userId}`,
  })
  .then(res =>
    res.data.things || null
  )
  .catch(err => { console.log('err: ', err); });

  this.addOne = (thing, user) =>
  $http({
    method: 'POST',
    url: '/api/things',
    data: { thing, user },
  })
  .then(res =>
    res.data || null
  )
  .catch(err => { console.log('err: ', err); });

  this.removeOne = (thing, user) => {
    return $http({
      method: 'PUT',
      url: `/api/users/removeThing/${user._id}`,
      data: { thing }
    })
    .then(() => {
      $http({
        method: 'DELETE',
        url: `/api/things/${thing._id}`,
      })
    });
  };

  this.getThing = id =>
  $http({
    method: 'GET',
    url: `/api/things/yelpId/${id}`,
  })
  .then(res => {
    console.log('redata',res.data);
    return res.data || null;
  })

  this.editOne = (thing) =>
  $http({
    method: 'PUT',
    url: `/api/things/${thing._id}`,
    data: thing,
  })
  .then(res =>
    res.data || null
  )
  .catch(err => { console.log('err: ', err); });
};

angular.module('user-auth')
.service('thingService', thingService);
