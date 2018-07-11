
'use strict';

angular.module('myApp.userRegister', ['ngRoute', 'firebaseAuthService'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/userRegister', {
    templateUrl: 'userRegister/register.html',
    controller: 'userRegisterCtrl'
  });
}])

.controller('userRegisterCtrl', function($scope, UserLog, $firebaseObject, $rootScope) {
  
  const rootRef = firebase.database().ref(); // database root ref
  const refUsers = rootRef.child("users"); // ref a users field in database
  

  
  $scope.user = {
      id: "",
      email: "",
      password: "",
      confirmPassword: "",
      firstname: "",
      lastname: "",
      role: "",
      postalAdress: "",
      phoneNumber: "",
      compagny: "",
      siret: "",
      total: ""
  };
  $scope.validate = true;
  
  let mail =  $scope.user.email;
  let password = $scope.user.password;
  let confirmPassword = $scope.user.confirmPassword;
  let firstname = $scope.user.firstname;
  let lastname = $scope.user.lastname;
  let role = $rootScope.role;
  let compagny = $scope.user.compagny;
  let siret = $scope.user.siret;
  let postalAdress = $scope.user.postalAdress;
  let phoneNumber = $scope.user.phoneNumber;
  
  if($rootScope.role == 'client'){
    $scope.compagny = false;
  }
  else{
    $scope.compagny = true;
  }
  
  
  
  $scope.validateTest = function (){
    if($scope.compagny){
      if(mail != "" && password != "" && firstname != "" && lastname != "" && compagny != "" && siret != "" && postalAdress != "" && phoneNumber && confirmPassword != password && compagny != "" && siret != ""){
        $scope.validate = false;
      }
    }else{
      if(password != "" && firstname != "" && lastname != "" && compagny != "" && siret != "" && postalAdress != "" && phoneNumber && confirmPassword !=password){
        $scope.validate = false;
      }
    }
  }
    

 
  
  refUsers.on('value', function(snap){ //value = refresh all object
    let nbUser=0;
    
    for (let user in snap.val()) {
      nbUser++
    }   
      $scope.user.total = nbUser +1;
  });
  
  $scope.signUp = function(event) {
    
    
    event.preventDefault();  // To prevent form refresh

    UserLog.signUp(mail,password);
   
    
    setTimeout(function(){  
      if ($scope.compagny) {
         firebase.database().ref('users/' + $scope.user.total).set({
           id: $scope.user.total,
           mail: mail,
           firstname: $scope.user.firstname,
           lastname: $scope.user.lastname,
           role: $scope.user.role,
           postalAdress: $scope.user.postalAdress,
           phoneNumber: $scope.user.phoneNumber,
        });
        console.log('user');

      } else {
        firebase.database().ref('users/' + $scope.user.total).set({
          id: $scope.user.total,
          mail: mail,
          firstname: $scope.user.firstname,
          lastname: $scope.user.lastname,
          role: $scope.user.role,
          postalAdress: $scope.user.postalAdress,
          phoneNumber: $scope.user.phoneNumber,
          compagny: $scope.user.compagny,
          siret: siret
        });
        console.log('autre');

      }
       
    
      window.location.href = "#!/login";
    }, 3000); 
  } 
     
/*
   $scope.writeUserData = function(name, email) {
    firebase.database().ref('users/' + $scope.user).set({
      id: $scope.user,
      username: name,
      email: email
    });
    $scope.user++;
  };*/

});