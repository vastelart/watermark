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
	plumber = require('gulp-plumber');

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

gulp.task('sync', function() {
	browserSync.init({
		server: {
			baseDir: paths.browserSync.baseDir
		}
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

	return gulp.src(['app/index.html', 'app/favicon.ico', 'app/lang.json'])
		.pipe(assets)
		.pipe(gulpif("*.js", uglify()))
		.pipe(gulpif("*.css", minifyCss()))
		.pipe(assets.restore())
		.pipe(useref())
		.pipe(gulp.dest("./dist"));
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


gulp.task("extras", function () {
	return gulp.src([RS_CONF.path.baseDir+"*.*","!"+RS_CONF.path.htmlDir])
		.pipe(filter([".ico"]))
		.pipe(gulp.dest(RS_CONF.path.distDir));
});


gulp.task("clean-dist", function () {
	return del(RS_CONF.path.distDelDir);
});


gulp.task("size-app", function () {
	return gulp.src(RS_CONF.path.baseDir+"/**/*").pipe(size({title: "APP size: "}));
});


gulp.task("dist", ["php","useref","images","extras","htc"], function () {
	return gulp.src(RS_CONF.path.distDir+"/**/*").pipe(size({title: "DIST size: "}));
});


gulp.task("build", ["clean-dist"], function () {
	gulp.start("dist");
});