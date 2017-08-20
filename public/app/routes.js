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
	.state('admin.tag', {
		url:'/admintag',
		views: {
			'': {
				templateUrl:'app/views/pages/admin/admintag.html',
				controller: 'tagCtrl',
				controllerAs: 'tag'
			}
		}
	})
	.state('admin.news', {
		url:'/adminnews',
		views: {
			'': {
				templateUrl:'app/views/pages/admin/adminnews.html',
				controller: 'newsCtrl',
				controllerAs: 'news'
			}
		}
	})
	.state('admin.addnews', {
		url:'/adminaddnews',
		views: {
			'': {
				templateUrl:'app/views/pages/admin/adminaddnews.html',
				controller: 'newsCtrl',
				controllerAs: 'addnews'
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
})
.directive('fileModel', ['$parse', function($parse) {
	return {
		restrict: 'A',
		link: function(scope, element, attrs){
			var model = $parse(attrs.fileModel);
			var modelSetter = model.assign;

			element.bind('change', function() {
				scope.$apply(function(){
					modelSetter(scope, element[0].files[0]);
				});
			});
		}
	};
}]);

