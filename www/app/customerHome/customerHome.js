'use strict';

angular.module('myApp.customerHome', ['ngRoute','cordovaGeolocationModule'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/customerHome', {
    templateUrl: 'customerHome/customerHome.html',
    controller: 'customerHomeCtrl'
  });
}])

.controller('customerHomeCtrl', function($scope, $rootScope, cordovaGeolocationService) {

  $scope.adress="";
  $scope.clickValidate = function() {
     $rootScope.adress = $scope.adress;
     window.location.href = "#!/customerSearch";
  }
  
  $scope.clickGeoloc = function() {
    console.log('click geoloc');
    
    cordovaGeolocationService.getCurrentPosition(function(position){
        $rootScope.latitudeClient = position.coords.latitude;
        $rootScope.longitudeClient = position.coords.longitude;     
    });
    window.location.href = "#!/customerSearch";
  }
  
  
  
  
});
 