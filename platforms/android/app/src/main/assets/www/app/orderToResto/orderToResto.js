'use strict';

angular.module('myApp.orderToResto', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/orderToResto', {
    templateUrl: 'orderToResto/orderToResto.html',
    controller: 'orderToRestoCtrl'
  });
}])

.controller('orderToRestoCtrl', function($scope) {

});