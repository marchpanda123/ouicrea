var app = angular.module('appRoutes',['ui.router','authServices']);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
	$stateProvider
	.state('app', {
		url:'/',
		views: {
			'header': {
				templateUrl:'app/views/pages/header.html',
				controller:'mainCtrl',
				controlleras:'main'
			},
			'body': {
				templateUrl:'app/views/pages/body.html'
			},
			'footer': {
				templateUrl:'app/views/pages/footer.html'
			}
		}
	})
	.state('app.newspage', {
		url:'newspage/:newsId',
		views: {
			'body@': {
				templateUrl:'app/views/pages/newspage.html',
				controller: 'pageCtrl',
				controllerAs: 'page'
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
	.state('ouicreaadminpostoch', {
		url:'/ouicreaadminpostoch',
		views: {
			'': {
				templateUrl:'app/views/pages/post.html'
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
		data:{
				needLogin: true
		},
		views: {
			'': {
				templateUrl:'app/views/pages/admin/admin.html'
			}
		}
	})
	.state('admin.tag', {
		url:'/admintag',
		data:{
				needLogin: true
		},
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
		data:{
				needLogin: true
		},
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
		data:{
				needLogin: true
		},
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
		data:{
				needLogin: true
		},
		views: {
			'': {
				templateUrl:'app/views/pages/admin/adminproject.html',
				controller: 'projectCtrl',
				controllerAs: 'project'
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
}])
.run(['$rootScope', '$state', 'Auth', function($rootScope, $state, Auth) {
  $rootScope.$on('$stateChangeStart', function(e, to) {

    if (to.data && to.data.needLogin) {
    	if(!Auth.isLoggedIn()) {
    		e.preventDefault();
		      $state.go('app');
    	}
      
    }

  });
}]);

