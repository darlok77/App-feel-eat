'use strict';

angular.module('myApp.customerHome', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/customerHome', {
    templateUrl: 'customerHome/customerHome.html',
    controller: 'customerHomeCtrl'
  });
}])

.controller('customerHomeCtrl', function($scope) {

});