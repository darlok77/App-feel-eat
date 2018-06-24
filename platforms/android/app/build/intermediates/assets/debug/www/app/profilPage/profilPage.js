
'use strict';

angular.module('myApp.profilPage', ['ngRoute'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/profilPage', {
      templateUrl: 'profilPage/profilPage.html',
      controller: 'profilPageCtrl'
    });
  }])

  .controller('profilPageCtrl', function($scope,$firebaseObject,) {

  $scope.mail = "bob@bla.fr";
  CreateListeEtoile('test',5);

  $scope.isUpdateMail = false;
  $scope.updateMail= function(){
    $scope.isUpdateMail = true;
    var elMail = document.querySelector("#mailInput");

    elMail.addEventListener ('keypress', e => {
      if (e.keyCode === 13) {
        $scope.mail = elMail.value;
      }
    });

  } 
  
  $firebaseObject
  $scope.logOut = event => {
    event.preventDefault();  // To prevent form refresh
    firebase.auth().signOut();
    
  }

});