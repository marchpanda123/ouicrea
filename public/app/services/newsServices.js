angular.module('newsServices', ['ngResource'])

.factory('NewsFactory', function($resource) {
	return $resource(
		"/api/news/:newsId", {newsId: "@id"},
		{ create: {method:"POST"}, save: {method:"PUT"}});
})
.factory('NewsGetFactory', function($http) {
	var NewsGetFactory = {};

	NewsGetFactory.getNews = function(newsId) {
		return $http.get('/api/news/' + newsId);
	}

	return NewsGetFactory;
})
.service('multipartForm', ['$http', function($http) {
	this.post = function(uploadUrl, data) {
		var fd = new FormData();
		for(var key in data)
			fd.append(key, data[key]);
		return $http.post(uploadUrl, fd, {
			transformRequest: angular.identity,
			headers: {'Content-Type': undefined}
		})
		
	}
}]);