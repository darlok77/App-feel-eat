'use strict';

angular.module('myApp.orderToCustomers', ['ngRoute','cordovaGeolocationModule'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/orderToCustomers', {
      templateUrl: 'orderToCustomers/orderToCustomers.html',
      controller: 'orderToCustomersCtrl'
    });
  }])

  .controller('orderToCustomersCtrl', function($scope, cordovaGeolocationService, $rootScope) {
  
  console.log($rootScope.typeOffer);

    $scope.latitude = "";
    $scope.longitude = "";
    $scope.destLatitude = "";
    $scope.destLongitude = "";
   
    $scope.typeOffer = $rootScope.typeOffer;
  
      /*console.log($rootScope.latitudeResto);
      console.log($rootScope.longitudeResto);
      console.log($rootScope.latitudeClient);
      console.log($rootScope.longitudeClient);
*/
    $scope.mapToResto = function() {
      //$scope.showMap = true;
       const elIframeArea = document.querySelector('.iframe');
       elIframeArea.innerHTML = "";

    cordovaGeolocationService.getCurrentPosition(function(position){
        $rootScope.latitude = position.coords.latitude;
        $rootScope.longitude= position.coords.longitude;
      
        if($scope.typeOffer == 'restaurant'){
          $rootScope.destLatitude = $rootScope.latitudeResto;
          $rootScope.destLongitude = $rootScope.longitudeResto;
          console.log('enter in resto');
        }else if ($scope.typeOffer == 'client'){
          $rootScope.destLatitude = $rootScope.latitudeClient;
          $rootScope.destLongitude = $rootScope.longitudeClient;
          console.log('enter in client');
        }else{
          console.log('enter in nada');
        }
        
        const elNewIframe = document.createElement('iframe');

        elNewIframe.setAttribute('width', '100%');
        elNewIframe.setAttribute('height', '400');
        elNewIframe.setAttribute('frameborder', '0');
        elNewIframe.setAttribute('style', 'border:0');
        elNewIframe.setAttribute('src', 'https://www.google.com/maps/embed/v1/directions?key=AIzaSyBzhXQGlpp20V71dGCT_67REdUlWe-Gpog&origin='+$rootScope.latitude+','+$rootScope.longitude+'&destination='+$rootScope.destLatitude+','+$rootScope.destLongitude+'&avoid=tolls|highways');
        elIframeArea.appendChild(elNewIframe);
    });
  };
  $scope.mapToResto('restaurant');
  
  $scope.clickRecovered = function(){
    $scope.mapToResto();
    
  }
  $scope.clickLivery = function(){
    
  }

});