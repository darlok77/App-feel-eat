'use strict';

angular.module('myApp.paymentMethod', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/paymentMethod', {
    templateUrl: 'paymentMethod/paymentMethod.html',
    controller: 'paymentMethodCtrl'
  });
}])

.controller('paymentMethodCtrl', function($scope) {

});