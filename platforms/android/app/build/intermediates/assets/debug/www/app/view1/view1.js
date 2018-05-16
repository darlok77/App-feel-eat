'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', function($scope, $firebaseObject) {

  const rootRef = firebase.database().ref(); // database root ref
  const refObject = rootRef.child("object"); // ref a object field in database
  const refUsers = rootRef.child("users"); // ref a users field in database
  const refHobbies = refObject.child("hobbie"); // ref a object field in hobbie
  
  $scope.user = 1;
  $scope.writeUserData = function(name, email) {
    firebase.database().ref('users/' + $scope.user).set({
      username: name,
      email: email
    });
    $scope.user++;
  };
  
  //sync a object change
  
  refObject.on('value', function(snap){ //value = refresh all object
    document.querySelector('#object').innerText = JSON.stringify(snap.val(),null, 4) ;// display in 4 line
    console.log( snap.val() ); 
  });
  
  refUsers.on('value', function(snap){ //value = refresh all object
    document.querySelector('#users').innerText = JSON.stringify(snap.val());
    console.log( snap.val() ); 
  });
  
  refHobbies.on('child_added', function(snap){ //child_added = refresh just a element added
    const li = document.createElement('li');
    li.innerText =snap.val();
    li.id = snap.key;
    document.querySelector('#list').appendChild(li) ;
    console.log( snap.val() ); 
  });
  
  refHobbies.on('child_changed', function(snap){ //child_changed = refresh a element change
    const liChanged = document.querySelector('#'+snap.key);
    liChanged.innerText =snap.val();
    
    console.log( snap.val() ); 
  });
  
  refHobbies.on('child_removed', function(snap){ //child_removed = refresh a element removed
    const liRemove = document.querySelector('#'+snap.key);
    liremove.remove();
    
    console.log( snap.val() ); 
  });
  
});
