'use strict';

angular.module('myApp.monResto', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/monResto', {
    templateUrl: 'monResto/MonResto.html',
    controller: 'monRestoCtrl'
  });
}])

.controller('monRestoCtrl', function($scope) {

});