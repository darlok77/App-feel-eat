'use strict';

angular.module('myApp.orderToCustomers', ['ngRoute','cordovaGeolocationModule'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/orderToCustomers', {
      templateUrl: 'orderToCustomers/orderToCustomers.html',
      controller: 'orderToCustomersCtrl'
    });
  }])

  .controller('orderToCustomersCtrl', function($scope, cordovaGeolocationService, $rootScope) {

    $scope.latitude = "";
    $scope.longitude = "";
    $scope.destLatitude = "";
    $scope.destLongitude = "";
    //$scope.typeOffer=$rootScope.typeOffer
  
      /*console.log($rootScope.latitudeResto);
      console.log($rootScope.longitudeResto);
      console.log($rootScope.latitudeClient);
      console.log($rootScope.longitudeClient);
*/
    $scope.getCurrentPosition = function() {
      //$scope.showMap = true;

    cordovaGeolocationService.getCurrentPosition(function(position){
        $scope.latitude = position.coords.latitude;
        $scope.longitude= position.coords.longitude;
      
        if($rootScope.typeOffer == 'restaurant'){
          $scope.destLatitude = $rootScope.latitudeResto;
          $scope.destLongitude = $rootScope.longitudeResto;
          console.log('enter in resto');
        }else if ($rootScope.typeOffer == 'client'){
          $scope.destLatitude = $rootScope.latitudeClient;
          $scope.destLongitude = $rootScope.longitudeClient;
          console.log('enter in client');
        }else{
          console.log('enter in nada');
        }
        
        const elNewIframe = document.createElement('iframe');
        const elIframeArea = document.querySelector('.iframe');

        elNewIframe.setAttribute('width', '100%');
        elNewIframe.setAttribute('height', '400');
        elNewIframe.setAttribute('frameborder', '0');
        elNewIframe.setAttribute('style', 'border:0');
        elNewIframe.setAttribute('src', 'https://www.google.com/maps/embed/v1/directions?key=AIzaSyBzhXQGlpp20V71dGCT_67REdUlWe-Gpog&origin='+$scope.latitude+','+$scope.longitude+'&destination='+$scope.destLatitude+','+$scope.destLongitude+'&avoid=tolls|highways');  
        elIframeArea.appendChild(elNewIframe);
    });
  };
  
  $scope.clickRecovered = function(){
    $rootScope.typeOffer == 'client';
    
  }
  $scope.clickLivery = function(){
    
  }

});