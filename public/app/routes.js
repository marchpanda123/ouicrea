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
	})

	.state('ouicreaadmin', {
		url:'/ouicreaadmin',
		views: {
			'': {
				templateUrl:'app/views/pages/login.html'
			}
		}
	})
	.state('logout', {
		url:'/logout',
		views: {
			'': {
				templateUrl:'app/views/pages/logout.html'
			}
		}
	})
	.state('admin', {
		url:'/admin',
		views: {
			'': {
				templateUrl:'app/views/pages/admin/admin.html'
			}
		}
	})
	.state('admin.news', {
		url:'/adminnews',
		views: {
			'': {
				templateUrl:'app/views/pages/admin/adminnews.html'
			}
		}
	})
	.state('admin.project', {
		url:'/adminproject',
		views: {
			'': {
				templateUrl:'app/views/pages/admin/adminproject.html'
			}
		}
	});

	$urlRouterProvider.otherwise('/');

	$locationProvider.html5Mode(true).hashPrefix('!');
});

