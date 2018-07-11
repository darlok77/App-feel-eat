'use strict';

angular.module('myApp.customerSearch', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/customerSearch', {
    templateUrl: 'customerSearch/customerSearch.html',
    controller: 'customerSearchCtrl'
  });
}])

.controller('customerSearchCtrl', function($scope, $firebaseObject, $rootScope) {
  
  $scope.restaurant = $rootScope.restaurantsDb;

  $scope.selectRestaurant = function (resto){
    
    $rootScope.resto = resto;
    $rootScope.boissons = resto.Menu.boissons;
    $rootScope.plats = resto.Menu.plats;
    $rootScope.entrees = resto.Menu.entrees;
    $rootScope.desserts = resto.Menu.desserts;
    
    
    window.location.href = "#!/cardChange";
  }
});