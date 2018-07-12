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

  /*console.log($rootScope.restaurant);
  console.log($rootScope.boissons);
  console.log($rootScope.plats);
  console.log($rootScope.desserts);*/
  
  const rootRef = firebase.database().ref(); // database root ref
  const refOrders = rootRef.child('order'); // ref a users field in database
  $rootScope.latitudeResto = $rootScope.resto.adresse.latitude;
  $rootScope.longitudeResto = $rootScope.resto.adresse.longitude;
  $scope.nomPlat = "";
  $scope.prixPlat = 0;
  $rootScope.shop = {};
  $scope.entreesInShop = [];
  $scope.platsInShop = [];
  $scope.dessertsInShop = [];
  $scope.boissonsInShop = [];
  $scope.totalPrice = 2.5;
  
  switch ($rootScope.role) {
        case "restaurant":
          $scope.IsRestaurant = true;
          break;
        case "client":
          $scope.IsRestaurant = false;
          break;
  }
  
  $scope.dataToMoal = function (nom,prix,type){
  
  $scope.totalPrice = $scope.totalPrice + prix;
  $scope.nomPlat = nom;
  $scope.prixPlat = prix;
  $scope.typePlat = type;
  console.log($scope.totalPrice);
    
  
  
  }
  
  $scope.addShop = function (){
    console.log('ici');
    console.log($scope.typePlat);
    
    switch ($scope.typePlat) {
        case "entrees":
          $scope.entreesInShop.push({nom: $scope.nomPlat, prix: $scope.prixPlat});
          break;
        case "plats":
          $scope.platsInShop.push({nom: $scope.nomPlat, prix: $scope.prixPlat});
          break;
        case "desserts":
          $scope.dessertsInShop.push({nom: $scope.nomPlat, prix: $scope.prixPlat});
          break;
        case "boissons":
          $scope.boissonsInShop.push({nom: $scope.nomPlat, prix: $scope.prixPlat});
          break;
      }   
  }
  
  $scope.validateOrder = function (){
    console.log($scope.totalPrice);
    
    
    refOrders.on('value', function(snap){ //value = refresh all object
      let nbOrder = 0;

      for (let order in snap.val()) {
        nbOrder++
      }  
      $rootScope.totalOrders = nbOrder +1;

      $rootScope.order = {
        id: $rootScope.totalOrders,
            plats: {
              entrees: $scope.entreesInShop,
              plats: $scope.platsInShop,
              desserts: $scope.dessertsInShop,
              boissons: $scope.boissonsInShop
            },
            destination:{ 
              client: {
                adress: '6 Rue de Champrenard Courpalay',
                latitude: $rootScope.latitudeClient,
                longitude :$rootScope.longitudeClient
              },
              restaurant:{
                adress: $rootScope.resto.adresse.nom,
                latitude: $rootScope.resto.adresse.latitude,
                longitude : $rootScope.resto.adresse.longitude
              },
            },
            price: $scope.totalPrice,
            typeOffer: 'restaurant'
      }
      console.log($rootScope.order);
    });
  
  setTimeout(function(){  
    $rootScope.typeOffer = 'restaurant';
    firebase.database().ref('order/' + $rootScope.totalOrders).set($rootScope.order);
    window.location.href = "#!/recapOrder";
    
  }, 3000);
    
  }
  
  

});