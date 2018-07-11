'use strict';

angular.module('myApp.chooseStatus', ['ngRoute'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/chooseStatus', {
      templateUrl: 'chooseStatus/chooseStatus.html',
      controller: 'chooseStatusCtrl'
    });
  }])

.controller('chooseStatusCtrl', function($scope,$rootScope) {


  $rootScope.showNavBar = false;
  
$rootScope.role="";


    $scope.clickRestaurant = function(){
      $rootScope.role = "restaurant";
      window.location.href = "#!/login";

    }

    $scope.clickClient = function(){
      $rootScope.role = "client";
      $rootScope.showNavBar = true;
      window.location.href = "#!/login";

    }

    $scope.clickDelivery = function(){
      $rootScope.role = "delivery";
      $rootScope.showNavBar = true;
      window.location.href = "#!/login";

    }

});