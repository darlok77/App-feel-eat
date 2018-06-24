'use strict';

// Declare app level module which depends on views, and components

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAiOvm3BWdPuTbCxU-zoQqjnJr-6OK_030",
    authDomain: "test-d5ddc.firebaseapp.com",
    databaseURL: "https://test-d5ddc.firebaseio.com",
    projectId: "test-d5ddc",
    storageBucket: "test-d5ddc.appspot.com",
    messagingSenderId: "1074981845477"
  };
  firebase.initializeApp(config);

angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.view3',
  'myApp.orderToCustomers',
  'myApp.home',
  'myApp.forgotMdp',
  'myApp.orderToResto',
  'myApp.profilPage',
  'myApp.customerHome',
  'myApp.customerSearch',
  'myApp.paymentMethod',
  'myApp.monResto',
  'myApp.orderHistory',
  'myApp.cardChange', 
  'myApp.recapOrder',
  'myApp.userRegister',    
  'firebase',
  //'angular-stripe'
 // 'myApp.version'
])
.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

 // $routeProvider.otherwise({redirectTo: '/view1'});
  $routeProvider.otherwise({redirectTo: '/home'});
}]);