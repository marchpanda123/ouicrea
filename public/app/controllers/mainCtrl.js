angular.module('mainController', ['authServices','newsServices','tagServices'])
.controller('mainCtrl',function(Auth, $location, $timeout, $state) {
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

	app.doLogin = function(loginData) {
		app.loading = true;
		app.errorMsg = false;

		Auth.login(app.loginData)
		.then(function(data) {
			if(data.data.success) {
				app.loading = false;
				//create success message
				app.successMsg = data.data.message + '正在登录，为您跳转回主页...';
				//redirect to home page
				$timeout(function(){
					$location.path('/admin');
					window.location.reload();
				}, 2000);
			} else {
				app.loading = false;
				app.errorMsg = data.data.message
			}
		});
	};

	app.logout = function() {
		Auth.logout();
		$location.path('/logout');
		$timeout(function() {
			$location.path('/');
			window.location.reload();
		}, 2000);
	};

})
.controller('newsCtrl', function(NewsFactory,$scope,TagFactory,$state,multipartForm){
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

	//pageupload
	$scope.newsPage = {}
	$scope.SubmitNewsPage = function(item) {
		
	}

	app.listTag();
	app.listNews();
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
});