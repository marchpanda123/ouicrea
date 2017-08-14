angular.module('mainController', ['authServices'])
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


});