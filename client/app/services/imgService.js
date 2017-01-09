angular.module('img.service', [])

.factory('ImageService', function($http) {
    const img = {};

    img.delete = function(url) {
        return $http.post('/delete', {
            url: url
        });
    }
    img.deleteUserImg = function (url, user) { 
        return $http.post('/deleteUserImg', {
            url: url,
            user: user
        })
     }
    return img;
})
