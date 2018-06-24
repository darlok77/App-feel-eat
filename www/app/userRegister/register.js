
'use strict';

angular.module('myApp.userRegister', ['ngRoute','firebaseAuthService'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/userRegister', {
    templateUrl: 'userRegister/register.html',
    controller: 'userRegisterCtrl'
  });
}])

.controller('userRegisterCtrl', function($scope,UserLog) {
  
     $scope.signUp = function(event) {
      event.preventDefault();  // To prevent form refresh
      const username = $scope.user.email;
      const password = $scope.user.password;

      UserLog.signUp(username,password);
      window.location.href = "#!/login";

  } 

});