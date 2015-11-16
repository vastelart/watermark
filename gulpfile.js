var
	gulp = require('gulp'),
	scss = require('gulp-scss'),
	jade = require('gulp-jade'),
	browserSync = require('browser-sync').create(),
	useref = require("gulp-useref"),
	uglify = require("gulp-uglify"),
	minifyCss = require("gulp-minify-css"),
	gulpif = require("gulp-if"),
	del = require("del"),
	filter = require("gulp-filter"),
	size = require("gulp-size"),
	gutil = require("gulp-util"),
	RS_CONF = require('./rs-conf.js'),
	concatCss = require("gulp-concat-css"),
	plumber = require('gulp-plumber'),
	php = require('gulp-connect-php');

var realFavicon = require ('gulp-real-favicon');
var fs = require('fs');

/* --------- paths --------- */

var
	paths = {
		jade : {
			location    : 'app/markup/**/*.jade',
			compiled    : 'app/markup/pages/*.jade',
			destination : 'app/'
		},

		scss : {
			location    : 'app/markup/_templates/main.scss',
			entryPoint  : 'app/css/main.css'
		},

		browserSync : {
			baseDirDist : './dist',
			baseDir : 'app/',
			watchPaths : ['*.html', 'css/*.css', 'js/*.js']
		}
	}

/* --------- jade --------- */

gulp.task('jade', function() {

	gulp.src(paths.jade.compiled )
		.pipe(plumber())
		.pipe(jade({
			pretty: '\t',
		}))


		.pipe(gulp.dest('app/'));
});

/* --------- scss-compass --------- */

gulp.task('scss', function() {
	gulp.src(paths.scss.location)
		.pipe(plumber())
		.pipe(scss({'bundleExec': false}))
		.pipe(gulp.dest('app/css'));
});

/* --------- browser sync --------- */

gulp.task('serve', ['php-serve'], function() {
	browserSync.init({
        proxy: '127.0.0.1:9000',
        port: 9090,
        open: true,
        notify: false,
    });
});

gulp.task('php-serve', function() {
	php.server({
        base: 'app',
        port: 9000,
        keepalive: true
    });
});

/* --------- watch --------- */

gulp.task('watch', function(){
	gulp.watch(paths.jade.location, ['jade']);
	gulp.watch(paths.scss.location, ['scss']);
	//gulp.watch(paths.js.plugins, ['plugins']);
	gulp.watch('bower.json',['jade']);
	gulp.watch(paths.browserSync.watchPaths).on('change', browserSync.reload);
})


/* --------- default --------- */

gulp.task('default', ['jade', 'scss', 'sync', 'watch']);


/********************* BUILD **********************/


gulp.task('useref', function() {
	var assets = useref.assets();

	return gulp.src(['app/index.html', 'app/lang.json'])
		.pipe(assets)
		.pipe(gulpif("*.js", uglify()))
		.pipe(gulpif("*.css", minifyCss()))
		.pipe(assets.restore())
		.pipe(useref())
		.pipe(gulp.dest("./dist"));
});

gulp.task("icon", function () {
	return gulp.src('app/favicon.ico')
	.pipe(gulp.dest('dist'));
});

gulp.task('php', function() {
	return gulp.src('app/php/*.php')
		.pipe(gulp.dest("./dist/php"));
});


gulp.task("images", function () {
	return gulp.src([RS_CONF.path.baseDir+"/img/*", "!"+ RS_CONF.path.baseDir+"/img/test"])
		.pipe(gulp.dest(RS_CONF.path.distDir+"/img"));
});


gulp.task("htc", function (){
	return gulp.src ('app/php/files/.htaccess')
		.pipe(gulp.dest("./dist/php/files"));
});


gulp.task("clean-dist", function () {
	return del(RS_CONF.path.distDelDir);
});


gulp.task("size-app", function () {
	return gulp.src(RS_CONF.path.baseDir+"/**/*").pipe(size({title: "APP size: "}));
});


gulp.task("dist", ["php","useref","images","htc","generate-favicon"], function () {
	return gulp.src(RS_CONF.path.distDir+"/**/*").pipe(size({title: "DIST size: "}));
});


gulp.task("build", ["clean-dist"], function () {
	gulp.start("dist");
});

//------------ FAVICONS ------------//

// File where the favicon markups are stored
var FAVICON_DATA_FILE = 'faviconData.json';

// Generate the icons. This task takes a few seconds to complete. 
// You should run it at least once to create the icons. Then, 
// you should run it whenever RealFaviconGenerator updates its 
// package (see the check-for-favicon-update task below).
gulp.task('generate-favicon', function(done) {
	realFavicon.generateFavicon({
		masterPicture: 'app/img/master_icon.png',
		dest: 'dist/img/icons',
		iconsPath: '/img/icons',
		design: {
			ios: {
				pictureAspect: 'noChange'
			},
			desktopBrowser: {},
			windows: {
				pictureAspect: 'noChange',
				backgroundColor: '#da532c',
				onConflict: 'override'
			},
			androidChrome: {
				pictureAspect: 'noChange',
				themeColor: '#ffffff',
				manifest: {
					name: 'WATERMARK',
					display: 'browser',
					orientation: 'notSet',
					onConflict: 'override'
				}
			},
			safariPinnedTab: {
				pictureAspect: 'blackAndWhite',
				threshold: 50,
				themeColor: '#5bbad5'
			}
		},
		settings: {
			scalingAlgorithm: 'Mitchell',
			errorOnImageTooSmall: false
		},
		markupFile: FAVICON_DATA_FILE
	}, function() {
		done();
	});
});

// Inject the favicon markups in your HTML pages. You should run 
// this task whenever you modify a page. You can keep this task 
// as is or refactor your existing HTML pipeline.
gulp.task('inject-favicon-markups', ['generate-favicon'], function() {
	gulp.src([ 'dist/*.html' ])
		.pipe(realFavicon.injectFaviconMarkups(JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).favicon.html_code))
		.pipe(gulp.dest('dist'));
});

// Check for updates on RealFaviconGenerator (think: Apple has just
// released a new Touch icon along with the latest version of iOS).
// Run this task from time to time. Ideally, make it part of your 
// continuous integration system.
gulp.task('check-for-favicon-update', function(done) {
	var currentVersion = JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).version;
	realFavicon.checkForUpdates(currentVersion, function(err) {
		if (err) {
			throw err;
		}
	});
});