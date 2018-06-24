'use strict';

angular.module('myApp.customerHome', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/customerHome', {
    templateUrl: 'customerHome/customerHome.html',
    controller: 'customerHomeCtrl'
  });
}])

.controller('customerHomeCtrl', function($scope) {
  
 // https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=YOUR_API_KEY

});