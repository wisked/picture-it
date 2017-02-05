import angular from 'angular'
import ngFileUpload from 'ng-file-upload';


angular.module('img.service', [
    ngFileUpload
])

.factory('ImageService', function($http, Upload) {
    const img = {};

    img.loadImgs = function (files, user_id) {
        let userId = user_id ? user_id : ''
        return Upload.upload({
            url: '/api/loadImgs/' + userId,
            data: {files: files}
        })
        .then(res => {
            if (res.status = 201) {
                return res.data;
            }
        })
    }

    img.getImgs = function (user_id) {
        let userId = user_id ? user_id : ''
        return $http.get('/api/getImages/' + userId)
    }

    img.deleteImage = function(id, user_id) {
        let userId = user_id ? user_id : ''
        return $http.post('/api/delete-image/' + userId, {
            id: id
        });
    }

    img.addLike = function (user_id) {
        let userId = user_id ? user_id : ''
        return $http.post('/api/add-like/' + userId, {
            id: user_id
        })

    }
    return img;
})
