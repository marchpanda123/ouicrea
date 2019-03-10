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
	.state('app.cha', {
        url:'cha',
        views: {
            'body@': {
                templateUrl:'app/views/pages/cha.html',
                controller: 'chaCtrl',
                controllerAs: 'cha'
            }
        }
	})
	.state('app.news', {
		url:'news',
		views: {
			'body@': {
				templateUrl:'app/views/pages/news.html',
				controller: 'newsCtrl',
				controllerAs: 'news'
			}
		}
	})
	.state('app.tour', {
		url:'tour',
		views: {
			'body@': {
				templateUrl:'app/views/pages/tour.html',
				controller: 'chaCtrl',
				controllerAs: 'cha'
			}
		}
	})
	.state('app.space1', {
		url:'space/cha',
		views: {
			'body@': {
				templateUrl:'app/views/pages/space1.html',
				controller: 'chaCtrl',
				controllerAs: 'cha'
			}
		}
	})
	.state('app.space2', {
		url:'space/shanghai',
		views: {
			'body@': {
				templateUrl:'app/views/pages/space2.html',
				controller: 'chaCtrl',
				controllerAs: 'cha'
			}
		}
	})
	.state('app.space3', {
		url:'space/suzhou',
		views: {
			'body@': {
				templateUrl:'app/views/pages/space3.html',
				controller: 'chaCtrl',
				controllerAs: 'cha'
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
	.state('app.cnbody', {
		url:'cn',
		views: {
			'body@': {
                templateUrl:'app/views/pages/cn/cnbody.html',
                controller: 'mainCtrl',
                controllerAs: 'main'
			}
		}
	})
	.state('app.cncha', {
		url:'chacn',
		views: {
			'body@': {
				templateUrl:'app/views/pages/cn/cncha.html',
				controller: 'chaCtrl',
				controllerAs: 'cha'
			}
		}
	})
	.state('app.cnnews', {
		url:'cnnews',
		views: {
			'body@': {
				templateUrl:'app/views/pages/cn/cnnews.html',
				controller: 'newsCtrl',
				controllerAs: 'news'
			}
		}
	})
	.state('app.cntour', {
		url:'tourcn',
		views: {
			'body@': {
				templateUrl:'app/views/pages/cn/cntour.html',
				controller: 'chaCtrl',
				controllerAs: 'cha'
			}
		}
	})
        .state('app.cnclub', {
            url:'clubcn',
            views: {
                'body@': {
                    templateUrl:'app/views/pages/cn/cnclub.html',
                    controller: 'chaCtrl',
                    controllerAs: 'cha'
                }
            }
        })
	.state('app.cnspace1', {
		url:'cnspace/cha',
		views: {
			'body@': {
				templateUrl:'app/views/pages/cn/cnspace1.html',
				controller: 'chaCtrl',
				controllerAs: 'cha'
			}
		}
	})
	.state('app.cnspace2', {
		url:'cnspace/shanghai',
		views: {
			'body@': {
				templateUrl:'app/views/pages/cn/cnspace2.html',
				controller: 'chaCtrl',
				controllerAs: 'cha'
			}
		}
	})
	.state('app.cnspace3', {
		url:'cnspace/suzhou',
		views: {
			'body@': {
				templateUrl:'app/views/pages/cn/cnspace3.html',
				controller: 'chaCtrl',
				controllerAs: 'cha'
			}
		}
	})
        .state('app.enbody', {
            url:'en',
            views: {
                'body@': {
                    templateUrl:'app/views/pages/en/enbody.html',
                    controller: 'mainCtrl',
                    controllerAs: 'main'
                }
            }
        })
        .state('app.encha', {
            url:'chaen',
            views: {
                'body@': {
                    templateUrl:'app/views/pages/en/encha.html',
                    controller: 'chaCtrl',
                    controllerAs: 'cha'
                }
            }
        })
        .state('app.ennews', {
            url:'ennews',
            views: {
                'body@': {
                    templateUrl:'app/views/pages/en/ennews.html',
                    controller: 'newsCtrl',
                    controllerAs: 'news'
                }
            }
        })
        .state('app.entour', {
            url:'touren',
            views: {
                'body@': {
                    templateUrl:'app/views/pages/en/entour.html',
                    controller: 'chaCtrl',
                    controllerAs: 'cha'
                }
            }
        })
        .state('app.enclub', {
            url:'cluben',
            views: {
                'body@': {
                    templateUrl:'app/views/pages/en/enclub.html',
                    controller: 'chaCtrl',
                    controllerAs: 'cha'
                }
            }
        })
        .state('app.enspace1', {
            url:'enspace/cha',
            views: {
                'body@': {
                    templateUrl:'app/views/pages/en/enspace1.html',
                    controller: 'chaCtrl',
                    controllerAs: 'cha'
                }
            }
        })
        .state('app.enspace2', {
            url:'enspace/shanghai',
            views: {
                'body@': {
                    templateUrl:'app/views/pages/en/enspace2.html',
                    controller: 'chaCtrl',
                    controllerAs: 'cha'
                }
            }
        })
        .state('app.enspace3', {
            url:'enspace/suzhou',
            views: {
                'body@': {
                    templateUrl:'app/views/pages/en/enspace3.html',
                    controller: 'chaCtrl',
                    controllerAs: 'cha'
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

