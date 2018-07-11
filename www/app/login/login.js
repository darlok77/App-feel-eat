'use strict';
 


angular.module('myApp.login', ['ngRoute','firebaseAuthService'])
 
// Declared route 
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/login', {
        templateUrl: 'login/login.html',
        controller: 'LoginCtrl'
    });
}])
 

/*.factory('DB', function($firebaseObject){
   
 
  console.log('DB here');
    return {
      Menu: function () {
        return menu;
      },
       Restaurants: function () {
        return console.log(restaurants + 'laaaaaa');
         ;
      }
    };
})*/


.controller("LoginCtrl", function($scope,$rootScope,UserLog) {
  
  const rootRef = firebase.database().ref(); // database root ref
  const refRestaurants = rootRef.child("restaurants");

  

 refRestaurants.on('value', function(snap){ //value = refresh all object
    $rootScope.restaurantsDb = snap.val();
  });
  
  $scope.logOut = function(event) {
    event.preventDefault();  // To prevent form refresh
    UserLog.logOut();
  } 
  
  $scope.logIn = function(event) {
    
      const username = $scope.user.email;
      const password = $scope.user.password;
    

      UserLog.logIn(username,password);
      $rootScope.showNavBar = true;
    
      switch ($rootScope.role) {
        case "restaurant":
          window.location.href = "#!/monResto";
          break;
        case "client":
          window.location.href = "#!/customerHome";
          break;
        case "delivery":
          window.location.href = "#!/customerHome";
          break;
        default:
          window.location.href = "#!/chooseStatus";
      }
      
    
  }
  
  firebase.auth().onAuthStateChanged( function(firebaseUser) {
    if(firebaseUser){
      $rootScope.user = firebaseUser;
      console.log(firebaseUser);
      $scope.showLogOut = true;
      $scope.$apply(); 
    }else{
      
      console.log('not logged in');
      $scope.showLogOut = false;
      $scope.$apply(); 
      
    }
  })
  
});