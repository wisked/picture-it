import angular from 'angular';

angular.module('user.service', [])

.factory('UserSevice', function($http) {
    const user = {};

    user.updateProfile = function(profile) {
        return $http.post('/api/set-userVisibility', {profile: profile})
            .then(response => response.data)
    }
    user.getUserList = function () {
        return $http.get('/api/get-usersList')
                .then(res => res.data)
    }
    user.checkProfileVisability = function (userId) {
        return $http.get('/api/check-userProfile', {userId: userId})
                .then(res => res.data)
    }
    return user
})
