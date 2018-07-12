'use strict';

angular.module('myApp.recapOrder', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/recapOrder', {
    templateUrl: 'recapOrder/recapOrder.html',
    controller: 'recapOrderCtrl'
  });
}])

.controller('recapOrderCtrl', function($scope, $rootScope) {
  
  console.log($rootScope.latitude);
  console.log($rootScope.longitude);
  console.log($rootScope.destLatitude);
  console.log($rootScope.destLongitude);
  $scope.order = $rootScope.order
 // alert(JSON.stringify($rootScope.latitude));
 // alert('b');

  
  setTimeout(function(){  
 
    const elNewIframe = document.createElement('iframe');
    const elIframeArea = document.querySelector('.iframe');

      elNewIframe.setAttribute('width', '100%');
      elNewIframe.setAttribute('height', '400');
      elNewIframe.setAttribute('frameborder', '0');
      elNewIframe.setAttribute('style', 'border:0');
      elNewIframe.setAttribute('src', 'https://www.google.com/maps/embed/v1/directions?key=AIzaSyBzhXQGlpp20V71dGCT_67REdUlWe-Gpog&origin='+$rootScope.latitude+','+$rootScope.longitude+'&destination='+$rootScope.destLatitude+','+$rootScope.destLongitude+'&avoid=tolls|highways');  
      elIframeArea.appendChild(elNewIframe);

      $scope.clickRecovered = function(){
        $rootScope.typeOffer = client;

      }
  }, 1000);
});