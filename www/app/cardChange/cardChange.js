'use strict';

angular.module('myApp.cardChange', ['ngRoute','cordovaGeolocationModule'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/cardChange', {
    templateUrl: 'cardChange/cardChange.html',
    controller: 'cardChangeCtrl'
  });
}])

.controller('cardChangeCtrl', function($scope, $rootScope, $firebaseObject, cordovaGeolocationService) {
  
  $scope.IsRestaurant = "";

  console.log($rootScope.restaurant);
  console.log($rootScope.boissons);
  console.log($rootScope.plats);
  console.log($rootScope.desserts);
  
  const rootRef = firebase.database().ref(); // database root ref
  const refOrders = rootRef.child('order'); // ref a users field in database
  $rootScope.latitudeResto = $rootScope.resto.adresse.latitude;
  $rootScope.longitudeResto = $rootScope.resto.adresse.longitude;
  
  
  
  switch ($rootScope.role) {
        case "restaurant":
          $scope.IsRestaurant = true;
          break;
        case "client":
          $scope.IsRestaurant = false;
          break;
  }
  
 refOrders.on('value', function(snap){ //value = refresh all object
    let nbOrder = 0;
    
    for (let order in snap.val()) {
      nbOrder++
    }  
      $rootScope.totalOrders = nbOrder +1;
   
   $rootScope.order = {
    id: $rootScope.totalOrders,
        plats: {
          entrees: ['SALADE COLORFULLY'],
          plats: ['RISOTTO'],
          desserts: ['COMPOTINE'],
          boissons: ['ALO DRINK','ST GEORGES']
        },
        destination:{ 
          client: {
            adress: '6 Rue de Champrenard Courpalay',
            latitude: 48.649435,
            longitude :2.959477
          },
          restaurant:{
            adress: $rootScope.resto.adresse.nom,
            latitude: $rootScope.resto.adresse.latitude,
            longitude : $rootScope.resto.adresse.longitude
          },
        },
        price: 27,
        typeOffer: 'restaurant'
    }
  });
  
  setTimeout(function(){  
    $rootScope.typeOffer = 'restaurant';
    firebase.database().ref('order/' + $rootScope.totalOrders).set($rootScope.order)
  }, 3000);
});