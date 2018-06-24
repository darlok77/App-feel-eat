'use strict';

angular.module('myApp.cardChange', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/cardChange', {
    templateUrl: 'cardChange/cardChange.html',
    controller: 'cardChangeCtrl'
  });
}])

.controller('cardChangeCtrl', function($scope) {

});