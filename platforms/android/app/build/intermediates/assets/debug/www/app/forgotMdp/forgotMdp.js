'use strict';

angular.module('myApp.forgotMdp', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/forgotMdp', {
    templateUrl: 'forgotMdp/forgotMdp.html',
    controller: 'forgotMdpCtrl'
  });
}])

.controller('forgotMdpCtrl', function($scope) {

});