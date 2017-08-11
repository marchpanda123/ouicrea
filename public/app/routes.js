var app = angular.module('appRoutes',['ui.router']);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
	$stateProvider
	.state('app', {
		url:'/',
		views: {
			'header': {
				templateUrl:'app/views/pages/header.html'
			},
			'body': {
				templateUrl:'app/views/pages/body.html'
			},
			'footer': {
				templateUrl:'app/views/pages/footer.html'
			}
		}
	});

	$urlRouterProvider.otherwise('/');

	$locationProvider.html5Mode(true).hashPrefix('!');
});

