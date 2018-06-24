'use strict';

angular.module('myApp.customerSearch', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/customerSearch', {
    templateUrl: 'customerSearch/customerSearch.html',
    controller: 'customerSearchCtrl'
  });
}])

.controller('customerSearchCtrl', function($scope) {

});