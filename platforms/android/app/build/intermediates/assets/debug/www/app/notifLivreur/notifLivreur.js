'use strict';

angular.module('myApp.notifLivreur', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/notifLivreur', {
    templateUrl: 'notifLivreur/notifLivreur.html',
    controller: 'notifLivreurCtrl'
  });
}])

.controller('notifLivreurCtrl', function($scope) {

});