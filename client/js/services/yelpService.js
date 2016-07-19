function yelpService($http) {

  this.search = (searchTerm) =>
  $http({
    method: 'GET',
    url: '/api/yelp',
    params: {
      term: searchTerm.term,
      location: searchTerm.location,
    },
  })
  .then(res =>
    res.data || null
  )

  this.getOne = id =>
  $http({
    method: 'GET',
    url: `/api/yelp/${id}`,
  })
  .then(res =>
    res.data || null
  )

}

angular.module('user-auth')
.service('yelpService', yelpService);
