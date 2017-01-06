angular.module('user.service', [])

.factory('UserSevice', function($http) {
    const user = {};

    user.update = async function(profile) {
        let res = await $http.post('/update', {
            profile: profile
        })
    }
    return user
})
