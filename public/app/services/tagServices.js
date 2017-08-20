angular.module('tagServices', ['ngResource'])

.factory('TagFactory', function($resource) {
	return $resource(
		"/api/tag/:tagId", {tagId: "@id"},
		{ create: {method:"POST"}, save: {method:"PUT"}});
});