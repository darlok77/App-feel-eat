'use strict';
 


angular.module('myApp.home', ['ngRoute'])
 
// Declared route 
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/home', {
        templateUrl: 'home/home.html',
        controller: 'HomeCtrl'
    });
}])
 
// Home controller
/*.controller('HomeCtrl', ['$scope','$firebaseArray',function($scope,$firebaseArray) {
 


var ref = firebase.database().ref().child("messages");
  // create a synchronized array
  $scope.messages = $firebaseArray(ref);
  // add new items to the array
  // the message is automatically added to our Firebase database!
  $scope.addMessage = function() {
    $scope.messages.$add({
      text: $scope.newMessageText
    });
  };
  
  
}]);*/

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
  
  const rootRef = firebase.database().ref();
  const ref =  rootRef.child('object');
  this.object = $firebaseObject(ref);
  
});