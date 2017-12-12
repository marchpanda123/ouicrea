angular.module('mainController', ['authServices','newsServices','tagServices','projectServices'])
.controller('mainCtrl',function(Auth, $location, $timeout, $state, $scope, $rootScope,$location) {
	app = this;
	
	app.fullscreenfunc = function() {
		var $item = $('.carousel .item'); 
		var $wHeight = $(window).height();
		$item.eq(0).addClass('active');
		$item.height($wHeight); 
		$item.addClass('full-screen');

		$('.carousel img').each(function() {
		  var $src = $(this).attr('src');
		  var $color = $(this).attr('data-color');
		  $(this).parent().css({
		    'background-image' : 'url(' + $src + ')',
		    'background-color' : $color
		  });
		  $(this).remove();
		});

		$(window).on('resize', function (){
		  $wHeight = $(window).height();
		  $item.height($wHeight);
		});

		$('.carousel').carousel({
		  interval: 6000,
		  pause: "false"
		});
	}
	
	if(Auth.isLoggedIn()) {
		console.log('Success: User is logged in.');
		Auth.getUser().then(function(data){
			console.log(data);
		});
	} else {
		console.log('Failure: User is NOT logged in.');
	}

	app.doLogin = function() {
		app.loading = true;
		app.errorMsg = false;
		console.log(app.loginData);
		Auth.login(app.loginData)
		.then(function(data) {
			if(data.data.success) {
				app.loading = false;
				//create success message
				app.successMsg = data.data.message + '正在登录，为您跳转回主页...';
				//redirect to home page
				$timeout(function(){
					$location.path('/admin');
				}, 2000);
			} else {
				app.loading = false;
				app.errorMsg = data.data.message
			}
		});
	};

	app.doPost = function() {
		app.loading = true;
		app.errorMsg = false;

		Auth.post(app.postData)
		.then(function(data) {
			console.log(data);
			/*if(data.data.success) {
				app.loading = false;
				//create success message
				app.successMsg = data.data.message + '正在登录，为您跳转回主页...';
				//redirect to home page
				$timeout(function(){
					$location.path('/');
					window.location.reload();
				}, 2000);
			} else {
				app.loading = false;
				app.errorMsg = data.data.message
			}*/
		});
	};

	app.logout = function() {
		Auth.logout();
		$location.path('/logout');
		$timeout(function() {
			$location.path('/');
		}, 2000);
	};

	$rootScope.isNav = true;

	app.backHome = function() {
		$rootScope.isNav = true;
        $rootScope.isChinese = false;
		$location.path('/');
	};
    app.backHomeChinese = function() {
        $rootScope.isNav = true;
        $rootScope.isChinese = true;
        $location.path('/cn');
    };
	app.toChinese = function() {
        $rootScope.isChinese = true;
        $rootScope.isEnglish = false;
        $state.go('app.cnbody');
	};
    app.toFrench = function() {
        $rootScope.isChinese = false;
        $rootScope.isEnglish = false;
        $state.go('app');
    };
    app.toEnglish = function() {
        $rootScope.isEnglish = true;
        $rootScope.isChinese = false;
        $state.go('app.enbody');
    };

    $scope.toHomeOuiCrea = function() {
        $state.go('app',{},{reload:true});
	};

})
.controller('chaCtrl', function($scope,$rootScope){
	app = this;
    $rootScope.isNav = false;
    app.carousel = function() {
        setTimeout(function(){
            $( '#example3' ).sliderPro({
                width: 960,
                height: 500,
                fade: true,
                arrows: true,
                buttons: false,
                fullScreen: true,
                shuffle: true,
                smallSize: 500,
                mediumSize: 1000,
                largeSize: 3000,
                thumbnailArrows: true,
                autoplay: false
            });
        },0);
	}
})
.controller('newsCtrl', function(NewsFactory,$scope,TagFactory,$state,multipartForm, $stateParams,NewsGetFactory){
	app = this;

	$scope.currentNews = {};

	app.listNews = function() {
		app.news = NewsFactory.query();
		console.log(app.news);
	}

	$scope.NewsPage = {};

	app.createNews = function(news) {
		var pageImage = $scope.NewsPage;
		var uploadUrl = '/fr/uploadNewsPage';
		console.log(pageImage);
		multipartForm.post(uploadUrl, pageImage)
		.then(function(r){
			console.log(r);
			$scope.currentNews.n_page = r.data.filename;
			new NewsFactory(news).$create()
			.then(function(updatenews) {
				app.news.push(updatenews);
				console.log(updatenews);
				$state.go('admin.news');
			});
		});
	}

	app.updateNews = function(news) {
		news.$save({newsId:news._id})
		.then(function(UpNews) {
			app.news.splice(
				app.news.indexOf(UpNews),1,UpNews);
		});
	}

	app.deleteNews = function(news) {
		news.$delete({newsId:news._id})
		.then(function() {
			app.news.splice(app.news.indexOf(news),1)
		})
	}

	app.listTag = function() {
		app.tags = TagFactory.query();
		console.log(app.tags);
	}

	//toArticle
	app.toArticle = function(article){
		$state.go('app.newspage', {newsId: article._id});
		window.parent.$("body").animate({scrollTop:0}, 'fast');
	}

	app.listTag();
	app.listNews();

})
.controller('pageCtrl', function($stateParams,NewsGetFactory,TagFactory,$rootScope,$state){
	var app = this;
	var newsId =  $stateParams.newsId;
	NewsGetFactory.getNews(newsId)
	.then(function(data){
		app.newspage = data.data;
		console.log(app.newspage);
	})
	app.listTag = function() {
		app.tags = TagFactory.query();
	}
	app.listTag();
	$rootScope.isNav = false;
	console.log($rootScope.isNav);

})
.controller('tagCtrl', function(TagFactory,$scope,$state){
	app = this;

	app.listTag = function() {
		app.tags = TagFactory.query();
		console.log(app.tags);
	}

	app.currentTag = {};
	app.createTag = function(tags) {
		new TagFactory(tags).$create()
		.then(function(newTag) {
			app.tags.push(newTag);
			$state.reload();
		});
	}

	app.updateTag = function(tags) {
		tags.$save({tagId:tags._id})
		.then(function(UpNews) {
			app.tags.splice(
				app.tags.indexOf(UpNews),1,UpNews);
		});
	}

	$scope.deleteTag = function(tags) {
		tags.$delete({tagId:tags._id})
		.then(function() {
			app.tags.splice(app.tags.indexOf(tags),1)
		})
	}

	//addfunc
	app.addstatus = false;
	app.addfunc = function(){
		app.addstatus = !app.addstatus ;
	}

	app.listTag();
})
.controller('projectCtrl', function(ProjectFactory,$scope,$state){
	app = this;
	app.sucmsg = false;
	app.listProject = function() {
		app.projects = ProjectFactory.query();
		console.log(app.projects);
		app.sucmsg = false;
	}

	app.currentProject = {};
	app.createProject = function(projects) {
		new ProjectFactory(projects).$create()
		.then(function(newProject) {
			app.projects.push(newProject);
			app.sucmsg = true;
		});
	}

	app.updateProject = function(projects) {
		projects.$save({projectId:projects._id})
		.then(function(UpNews) {
			app.projects.splice(
				app.projects.indexOf(UpNews),1,UpNews);
		});
	}

	$scope.deleteProject = function(projects) {
		projects.$delete({projectId:projects._id})
		.then(function() {
			app.projects.splice(app.projects.indexOf(projects),1)
		})
	}

	app.listProject();
});