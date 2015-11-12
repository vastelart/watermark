var
	gulp        = require('gulp'),
	scss = require('gulp-scss'),
	jade        = require('gulp-jade'),
	browserSync = require('browser-sync').create(),
	wiredep = require('wiredep').stream,
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
	plumber     = require('gulp-plumber');

/* --------- paths --------- */

var
	paths = {
		jade : {
			location    : 'ap/markup/**/*.jade',
			compiled    : 'ap/markup/pages/*.jade',
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
	var assets = useref.assets();
	gulp.src(paths.jade.compiled,paths.baseDir+ paths.browserSync.watchPaths )
		.pipe(plumber())
		.pipe(jade({
			pretty: '\t',
		}))
		.pipe(wiredep({
			derictory: RS_CONF.path.baseDir+"/bower"
		}))
		.pipe(assets)
		.pipe(gulpif("*.js", uglify()))
		.pipe(gulpif("*.css", minifyCss({compatibility: "ie8"})))
		.pipe(assets.restore())
		.pipe(useref())
		.pipe(gulp.dest(paths.jade.destination));
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


/*******************************************
 * DIST
 ******************************************/

// Переносим CSS JS HTML в папку DIST
gulp.task('jadeDist', function() {
	var assets = useref.assets();

	return gulp.src('app/js/*.js')
		.pipe(plumber())
		.pipe(jade({
			pretty: '\t',
		}))
		.pipe(wiredep({
			derictory: RS_CONF.path.baseDir+"/bower"
		}))

		.pipe(assets)
		.pipe(gulpif("*.js", uglify()))
		.pipe(gulpif("*.css", minifyCss({compatibility: "ie8"})))
		.pipe(assets.restore())
		.pipe(useref())
		.pipe(gulp.dest("./dist"));
});



// Перенос картинок
gulp.task("images", function () {
	return gulp.src(RS_CONF.path.baseDir+"/img/*")
		.pipe(gulp.dest(RS_CONF.path.distDir+"/img"));
});

// Перенос шрифтов
gulp.task("fonts", function() {
	gulp.src(RS_CONF.path.baseDir + "/fonts/*")
		.pipe(filter(["*.eot","*.svg","*.ttf","*.woff","*.woff2"]))
		.pipe(gulp.dest(RS_CONF.path.distDir+"/fonts/"))
});

/****************?????*************/
// Перенос остальных файлов (favicon и т.д.)
gulp.task("extras", function () {
	return gulp.src([RS_CONF.path.baseDir+"*.*", "!"+RS_CONF.path.htmlDir])
		.pipe(filter([ "*.php","*.ico"]))
		.pipe(gulp.dest(RS_CONF.path.distDir));
});
/****************????? END *************/

// Очищаем директорию DIST
gulp.task("clean-dist", function () {
	return del(RS_CONF.path.distDelDir);
});

// Вывод размера папки APP
gulp.task("size-app", function () {
	return gulp.src(RS_CONF.path.baseDir+"/**/*").pipe(size({title: "APP size: "}));
});


// Сборка и вывод размера папки DIST
gulp.task("dist", ["jadeDist","scss", "images", "fonts", "extras", "size-app" ], function () {
	return gulp.src(RS_CONF.path.distDir+"/**/*").pipe(size({title: "DIST size: "}));
});

// Собираем папку DIST - только когда файлы готовы
gulp.task("build", ["clean-dist"], function () {
	gulp.start("dist");
});