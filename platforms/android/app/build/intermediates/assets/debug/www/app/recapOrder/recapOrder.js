'use strict';

angular.module('myApp.recapOrder', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/recapOrder', {
    templateUrl: 'recapOrder/recapOrder.html',
    controller: 'recapOrderCtrl'
  });
}])

.controller('recapOrderCtrl', function($scope) {

});