'use strict';

angular.module('myApp.view3', ['ngRoute'/*,' bande angulaire '*/])

.config(['$routeProvider'/*,'stripeProvider'*/, function($routeProvider/*,stripeProvider*/) {
  $routeProvider.when('/view3', {
    templateUrl: 'view3/view3.html',
    controller: 'View3Ctrl'
  });
 // StripeProvider .  setPublishableKey ( 'pk_test_7pnbrozEO8L8JO25HcXqlFtm' )

}])


.controller('View3Ctrl', function($scope) {
  
  $scope.mail = "bob@bla.fr";
  CreateListeEtoile('test',5);
  
  $scope.isUpdateMail = false;
  
//stripe.setPublishableKey('pk_test_7pnbrozEO8L8JO25HcXqlFtm')
$scope.uploadFile = function(){
 /* var inputFile = document.querySelector("#my-file");
  var reader = new FileReader();
  var file = reader.readAsDataURL(inputFile.files[0]);
    console.log('Done');
  alert(JSON.stringify(file));
  $scope.file =file;*/
}

$scope.updateMail= function(){
  $scope.isUpdateMail = true;
  var elMail = document.querySelector("#mailInput");

  elMail.addEventListener ('keypress', e => {
  if (e.keyCode === 13) {
    $scope.mail = elMail.value;
  }
  });
  
} 
});
