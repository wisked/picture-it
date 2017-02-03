import angular from 'angular'
import ngFileUpload from 'ng-file-upload';


angular.module('img.service', [
    ngFileUpload
])

.factory('ImageService', function($http, Upload) {
    const img = {};

    img.loadImgs = function (files) {
        Upload.upload({
            url: '/api/loadImgs',
            data: {files: files}
        })
        .then(res => {
            if (res.status = 200) {
                return res.data;
            }
        })
    }
    img.getImgs = function (user_id) {
        let userId = user_id ? user_id : ''
        return $http.get('/api/getImages/' + userId)
    }
    //TODO: check work or not
    img.deleteImage = function(id, user_id) {
        let userId = user_id ? user_id : ''
        return $http.post('/api/delete-image/' + userId, {
            id: id
        });
    }
    return img;
})
