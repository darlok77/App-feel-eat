'use strict';
 


angular.module('myApp.login', ['ngRoute','firebaseAuthService'])
 
// Declared route 
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/login', {
        templateUrl: 'login/login.html',
        controller: 'LoginCtrl'
    });
}])
 

/*.factory('UserLog', function(){
    return {
      user: function () {
        return firebaseUser;
      }
    };
})*/

      //  

.controller("LoginCtrl", function($scope,$rootScope,UserLog) {
  
  $scope.logOut = function(event) {
    event.preventDefault();  // To prevent form refresh
    UserLog.logOut();
    
  } 
  
  $scope.logIn = function(event) {
    
      const username = $scope.user.email;
      const password = $scope.user.password;
    

      UserLog.logIn(username,password);
    
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