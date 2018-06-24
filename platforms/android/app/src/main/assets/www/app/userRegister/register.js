
'use strict';

angular.module('myApp.userRegister', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/userRegister', {
    templateUrl: 'userRegister/register.html',
    controller: 'userRegisterCtrl'
  });
}])

.controller('userRegisterCtrl', function($scope,$firebaseObject) {
  
    $scope.signUp = event => {
      event.preventDefault();  // To prevent form refresh
      const username = $scope.user.email;
      const password = $scope.user.password;

      const auth = firebase.auth();
      const promise = auth.createUserWithEmailAndPassword(username,password);
      promise.catch(e => { console.log(e.message); });
      window.location.href = "#!/home";
  } 

});