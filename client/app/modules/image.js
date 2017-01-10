angular.module('app.image', [])
.controller('imageCtrl', function($scope, $stateParams) {
    $scope.url = $stateParams.img
})
