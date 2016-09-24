$(document).ready(function() {
	/* Открытие пунктов меню */
	$('.top-menu>li').removeClass('selected');

	$('.top-menu>li>a').click( function(){
		
		var thismenu   = $(this).parent('li');
		var submenuall = $('.top-menu>li>a').not(this).parent('li').find('.submenu');
		//$('.top-menu>li').removeClass('selected');
		if (submenuall.hasClass('open')) {
			submenuall.animate({
				opacity: 0,
				height: "0"
			}, 500);
			submenuall.removeClass('open');			
		}

		var submenu = $(this).parent('li').find('.submenu');
		if (submenu.length > 0) {
			if (submenu.hasClass('open')) {
//				var submenu = $(this).find('ul');
				submenu.animate({
					opacity: 0,
					height: "0"
				}, 500);
				submenu.removeClass('open');
				thismenu.removeClass('selected');
			} else {
				h = submenu.css('height', 'auto').height();
				submenu.animate({
					opacity: 1,
					height: h + 30
				}, 500);
				submenu.addClass('open');
				thismenu.addClass('selected');
			}
			return false;
		}
	});


	/* Мобильное меню */
	$('.top-toggle-menu').click(function(){
		if ($('.top-menu').css('opacity') == 0) {
			h = $('.top-menu').css('height', 'auto').height();
			$('.top-menu').animate({
				opacity: 1,
				height: h
			}, 500);
		} else {
			$('.top-menu').animate({
				opacity: 0,
				height: 0
			}, 500);
		}
	});

	/* Блоки одинаковой высоты */
	setEqualHeight($('.main-item'));

	/* Подгон картинок в блок */
/*	fix_size('.ci-img');*/

/*	if (($(window).width() <= '992') && ($(window).width() >= '768')) {
		setEqualHeight($('.footer-item'));
	};*/
	
	VK.init({
		apiId: 5640861
	});

	VK.Api.call('board.getComments', {
		group_id : 119824124,
		topic_id : 34222276,
		count    : 2,
		extended : 1,
		sort     : 'asc'
	}, function(r) {
		if(r.response) {
			$.each(r.response.comments, function() {
				obj = this;
				if ($.isPlainObject(obj)) {
					var date = new Date(obj.date*1000);

					if (date.getDate() < 10) {
						dd = '0' + date.getDate();
					} else {
						dd = date.getDate();
					}

					switch (date.getMonth()) {
						case 0:
							dm = 'января';
							break;
						case 1:
							dm = 'декабря';
							break;
						case 2:
							dm = 'марта';
							break;
						case 3:
							dm = 'апреля';
							break;
						case 4:
							dm = 'мая';
							break;
						case 5:
							dm = 'июня';
							break;
						case 6:
							dm = 'июля';
							break;
						case 7:
							dm = 'августа';
							break;
						case 8:
							dm = 'сентября';
							break;
						case 9:
							dm = 'октября';
							break;
						case 10:
							dm = 'ноября';
							break;
						case 11:
							dm = 'декабря';
							break;
					}

					var datem = dd + ' ' + dm + ' ' + date.getFullYear();

					var id = obj.from_id;

					$.each(r.response.profiles, function() {
						if (this.uid == id) {
							aname = this.first_name + ' ' + this.last_name;
							photo = this.photo_medium_rec;
						}
					});
					$('.reviews-list').append('<li class="reviews-item"><div class="reviews-img"><img src="' + photo + '" alt="' + aname + '"></div><div class="reviews-block"><div class="reviews-autors">' + aname + ' <span class="reviews-data">' + datem + '</span></div><div class="reviews-text">' + obj.text + '</div></div></li>');
				}
			});
		};
	});
});

$(window).resize(function() {
	setEqualHeight($('.main-item'));

	if ($(window).width() <= '992') {
		if ($('.top-menu').css('opacity') == 1) {
			$('.top-menu').animate({
				opacity: 0,
				height: 0
			}, 500);
		}
	}

	$('.top-menu>li').removeClass('selected');
	var submenuall = $('.top-menu>li>a').parent('li').find('.submenu');
	//$('.top-menu>li').removeClass('selected');
	if (submenuall.hasClass('open')) {
		submenuall.animate({
			opacity: 0,
			height: "0"
		}, 500);
		submenuall.removeClass('open');			
	}

});

$(window).scroll(function(){
	$('.top-menu>li').removeClass('selected');
	var submenuall = $('.top-menu>li>a').parent('li').find('.submenu');
	//$('.top-menu>li').removeClass('selected');
	if (submenuall.hasClass('open')) {
		submenuall.animate({
			opacity: 0,
			height: "0"
		}, 500);
		submenuall.removeClass('open');			
	}


	if ($(window).width() <= '992') {
		if ($('.top-menu').css('opacity') == 1) {
			$('.top-menu').animate({
				opacity: 0,
				height: 0
			}, 500);
		}
	}
});

/* Функция установки блоков одинаковой высоты */
function setEqualHeight(columns) {
	var tallestcolumn = 0;
	
	columns.each(function(){
		currentHeight = $(this).height();
		if(currentHeight > tallestcolumn) {
			tallestcolumn = currentHeight;
		}
	});

	columns.height(tallestcolumn);
};

/*  Функция подгона изображения в блок*/
/*function fix_size(im) {
	var images = $(im + ' img');
	images.each(setsize);

	function setsize() {
		var img = $(this),
			img_dom = img.get(0),
			container = img.parents(im);
		if (img_dom.complete) {
			resize();
		} else img.one('load', resize);

		function resize() {
			if ((container.width() / container.height()) < (img_dom.width / img_dom.height)) {
				img.width('100%');
				img.height('auto');
				return;
			}
			img.height('100%');
			img.width('auto');
		}
	}
};*/