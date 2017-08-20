angular.module('projectServices', ['ngResource'])

.factory('ProjectFactory', function($resource) {
	return $resource(
		"/api/project/:projectId", {projectId: "@id"},
		{ create: {method:"POST"}, save: {method:"PUT"}});
});