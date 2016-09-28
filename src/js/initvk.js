<!-- Отзывы в VK -->
var script = document.createElement('SCRIPT'); 
script.src = "https://api.vk.com/method/board.getComments?group_id=119824124&topic_id=34222276&extended=1&callback=callbackFunc";
document.getElementsByTagName("head")[0].appendChild(script);

function callbackFunc(r) {
	if (r.response) {
		$.each(r.response.comments, function() {
			obj = this;
			if ($.isPlainObject(obj)) {
				var date = new Date(obj.date*1000);

				if (date.getDate() < 10) {
					dd = '0' + date.getDate();
				} else {
					dd = date.getDate();
				};

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
				};

				var datem = dd + ' ' + dm + ' ' + date.getFullYear();

				var id = obj.from_id;

				$.each(r.response.profiles, function() {
					if (this.uid == id) {
						aname = this.first_name + ' ' + this.last_name;
						photo = this.photo_medium_rec;
					};
				});
				$('.reviews-list').append('<li class="reviews-item"><div class="reviews-img"><img src="' + photo + '" alt="' + aname + '"></div><div class="reviews-block"><div class="reviews-autors">' + aname + ' <span class="reviews-data">' + datem + '</span></div><div class="reviews-text">' + obj.text + '</div></div></li>');
			};
		});
	};
};