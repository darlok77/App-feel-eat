'use strict';

angular.module('myApp.orderHistory', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/orderHistory', {
    templateUrl: 'orderHistory/orderHistory.html',
    controller: 'orderHistoryCtrl'
  });
}])

.controller('orderHistoryCtrl', function($scope) {

});