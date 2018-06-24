'use strict';

angular.module('myApp.orderToCustomers', ['ngRoute','cordovaGeolocationModule'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/orderToCustomers', {
      templateUrl: 'orderToCustomers/orderToCustomers.html',
      controller: 'orderToCustomersCtrl'
    });
  }])

  .controller('orderToCustomersCtrl', function($scope,cordovaGeolocationService) {

  $scope.showMap = false;
  $scope.latitude = "";
  $scope.longitude = "";
  $scope.bla='blabb bb';

      $scope.destLatitude = "";
      $scope.destLongitude = "";

  $scope.getCurrentPosition = function() {
    $scope.showMap = !$scope.showMap;
    cordovaGeolocationService.getCurrentPosition(function(position){
      $scope.test = 3;
      $scope.latitude = position.coords.latitude;
      $scope.longitude= position.coords.latitude;

      $scope.destLatitude = 48.893808;
      $scope.destLongitude = 2.381233;

    });

  };

});