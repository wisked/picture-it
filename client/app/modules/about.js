angular.module('app.about', [])

.controller('aboutCtrl', function($scope, $state, $http, ImageService, UserSevice, AuthService) {
    $scope.images = [];

    $scope.profileIsVisible = AuthService.user.profileIsVisible;


    $scope.change = async function() {
        await UserSevice.update($scope.profileIsVisible)
        $state.transitionTo('about')
    }

    $scope.delete = async function(url) {
        ImageService.delete(url)
            .then(res => {
                if (res)
                $scope.images = $scope.images.filter(e => e.url !== url)
            })
    }
    $http.get('/images')
        .then(images => {
            images.data.forEach(img => {
                $scope.images.push({url: img})
            })
        })
        .catch(err => console.log(err))

})
