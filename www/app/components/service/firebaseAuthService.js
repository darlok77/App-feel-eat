var firebaseAuthService = angular.module('firebaseAuthService', []);

firebaseAuthService.factory('UserLog', function(){
    return {
      logIn: function (username,password) {

        const auth = firebase.auth();
        const promise = auth.signInWithEmailAndPassword(username,password);
        promise.catch(function(e) { console.log(e.message); });
      },
      
      signUp: function (username,password) {

        const auth = firebase.auth();
        const promise = auth.createUserWithEmailAndPassword(username,password);
        promise.catch(function(e) { console.log(e.message); });
      },
      
      logOut: function () {
        firebase.auth().signOut();   
      }
      
      
  };
});