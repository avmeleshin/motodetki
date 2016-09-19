'use strict'

var gulp        = require('gulp'),
	prefixer    = require('gulp-autoprefixer'),
	uglify      = require('gulp-uglify'),
	sass        = require('gulp-sass'),
	sourcemaps  = require('gulp-sourcemaps'),
	rigger      = require('gulp-rigger'),
	cssmin      = require('gulp-clean-css'),
	imagemin    = require('gulp-imagemin'),
	pngquant    = require('imagemin-pngquant'),
	cache       = require('gulp-cache'),
	rename      = require('gulp-rename'),
	rimraf      = require('rimraf'),
	browserSync = require('browser-sync'),
	reload      = browserSync.reload;

var path = {				// Куда складывать готовые файлы
	build : {
		html  : 'build/',
		js    : 'build/js/',
		css   : 'build/',
		img   : 'build/img/',
		fonts : 'build/fonts/',
		fontsawesome : 'build/fonts/Awesome/'
	},

	src : {					// Откуда брать исходники
		html  : 'src/*.html',
		js    : 'src/js/*.js',
		css   : ['src/sass/*.scss'/*, '!src/sass/bootstrap.scss', '!src/sass/header.scss'*/],
		img   : 'src/img/**/*.{png,jpg,jpeg}',
		fonts : 'src/fonts/**/*'
	},

	watch : {				// За какими файлами наблюдать
		html  : 'src/**/*.html',
		js    : 'src/js/**/*.js',
		css   : 'src/sass/**/*.scss',
		img   : 'src/img/**/*',
		fonts : 'src/fonts/**/*'
	},

	clean : './build'
};

// Настройки dev сервера

var config = {
	server    : {
		baseDir : './build'
	},
	tunel     : true,
	host      : 'localhost',
	port      : 9013,
	logPrefix : 'Frontend_Devil'
};

// Собираем html

gulp.task('html:build', function(){
	gulp.src(path.src.html)
		.pipe(rigger())
		.pipe(gulp.dest(path.build.html))
		.pipe(reload({stream: true}));

/*	gulp.src(['src/*.php','src/.htaccess'])
		.pipe(gulp.dest(path.build.html))*/
});

// Собираем js
gulp.task('js:build', function(){
	gulp.src(path.src.js)
		.pipe(rigger())
		/*.pipe(sourcemaps.init())*/
		.pipe(uglify())
		.pipe(rename({suffix: '.min'}))
		/*.pipe(sourcemaps.write())*/
		.pipe(gulp.dest(path.build.js))
		.pipe(reload({stream: true}));
});

// Собираем css
gulp.task('css:build', function(){
	gulp.src(path.src.css)
		/*.pipe(sourcemaps.init())*/
		.pipe(sass())
		.pipe(prefixer({
			browsers: ['last 15 versions', '>1%', 'ie 8'],
			cascade: false
		}))
		.pipe(cssmin({
			keepSpecialComments: 0
		}))
		.pipe(rename({suffix: '.min'}))
		/*.pipe(sourcemaps.write())*/
		.pipe(gulp.dest(path.build.css))
		.pipe(reload({stream: true}));
});

// Собираем картинки
gulp.task('img:build', function(){
	return gulp.src(path.src.img)
		.pipe(cache(imagemin({
			optimizationLevel: 5,
			interlaced  : true,
			progressive : true,
			svgoPlugins : [{
				removeViewBox : false
			}],
			use : [pngquant()]
		})))
		.pipe(gulp.dest(path.build.img))
		.pipe(reload({stream: true }));
});

// Копируем шрифты
gulp.task('fonts:build', function(){
	gulp.src('src/libs/components-font-awesome/fonts/*.*')
		.pipe(gulp.dest(path.build.fontsawesome));

	gulp.src(path.src.fonts)
		.pipe(gulp.dest(path.build.fonts));
});

// Очистка кеша
gulp.task('cc', function (done) {
	return cache.clearAll(done);
});

// Сборка всего проекта
gulp.task('build', [
	'html:build',
	'js:build',
	'css:build',
	'fonts:build',
	'img:build'
]);

// Автоматический запуск тасков

gulp.task('watch', function () {
	gulp.watch([path.watch.html], function(event, cb) {  
		gulp.start('html:build');
	});
	gulp.watch([path.watch.css], function(event, cb) {  
		gulp.start('css:build');
	});
	gulp.watch([path.watch.js], function(event, cb) {  
		gulp.start('js:build');
	});
	gulp.watch([path.watch.img], function(event, cb) {  
		gulp.start('img:build');
	});
	gulp.watch([path.watch.fonts], function(event, cb) {  
		gulp.start('fonts:build');
	});
});

// Веб сервер

gulp.task('webserver', function(){
	browserSync(config);
});

// Очитка проекта

gulp.task('clean', function(cb){
	rimraf(path.clean, cb);
});

gulp.task('default', ['build', 'webserver', 'watch']);