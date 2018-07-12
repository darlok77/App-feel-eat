'use strict';

angular.module('myApp.notifLivreur', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/notifLivreur', {
    templateUrl: 'notifLivreur/notifLivreur.html',
    controller: 'notifLivreurCtrl'
  });
}])

.controller('notifLivreurCtrl', function($scope,$rootScope) {
  
  const rootRef = firebase.database().ref(); // database root ref
  const refOrders = rootRef.child('order');
  
  refOrders.on('value', function(snap){ //value = refresh all object
    let nbOffer=0;
    
    for (let offer in snap.val()) {
      nbOffer++
    }
    const refOrder = rootRef.child(nbOffer);
  });
  
   setTimeout(function(){  
     refOrder.on('value', function(snap){ //value = refresh all object
     $rootScope.order = snap.val();
       alert("b");
  });
  }, 3000);
 

  $scope.clickValidate = function() {
    window.location.href = "#!/orderToCustomers";
  }
});