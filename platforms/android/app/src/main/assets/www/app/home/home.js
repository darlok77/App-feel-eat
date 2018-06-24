'use strict';
 


angular.module('myApp.home', ['ngRoute'])
 
// Declared route 
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/home', {
        templateUrl: 'home/home.html',
        controller: 'HomeCtrl'
    });
}])
 

/*.factory('UserLog', function(){
    return {
      user: function () {
        return firebaseUser;
      }
    };
})*/


.controller("HomeCtrl", function($scope, $firebaseObject) {
  
  $scope.logOut = function(event) {
    event.preventDefault();  // To prevent form refresh
    firebase.auth().signOut();
    
  } 
  
  $scope.logIn = function(event) {
    
      var username = $scope.user.email;
      var password = $scope.user.password;

      var auth = firebase.auth();
      var promise = auth.signInWithEmailAndPassword(username,password);
      promise.catch(function(e) { console.log(e.message); });
      window.location.href = "#!/customerHome";
    
  }

  $scope.signUp = function(event) {
      event.preventDefault();  // To prevent form refresh
      var username = $scope.user.email;
      var password = $scope.user.password;

      var auth = firebase.auth();
      var promise = auth.createUserWithEmailAndPassword(username,password);
      promise.catch(function(e) { console.log(e.message); });
  } 
  
  firebase.auth().onAuthStateChanged( function(firebaseUser) {
    if(firebaseUser){
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