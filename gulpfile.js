var gulp = require('gulp');
var server = require('gulp-server-livereload');
var scss = require('gulp-scss');
var watch = require('gulp-watch');
var jade = require('gulp-jade');
var plumber = require('gulp-plumber');
var livereload = require('gulp-livereload');
var spritesmith = require('gulp.spritesmith');

var paths = {
	scss: 'app/markup/_templates/main.scss',
	jade: 'app/markup/pages/*.jade',
	jadeToWatch: 'app/markup/**/*.jade',
	scssToWatch: 'app/markup/**/*.scss'
};

gulp.task('serve', function() {
  gulp.src('app')
  	.pipe(plumber())
    .pipe(server({
      livereload: true,
      open: true
    }));
});

gulp.task('scss', function() {
	gulp.src(paths.scss)
	.pipe(plumber())
	.pipe(scss({'bundleExec': false}))
	.pipe(gulp.dest('app/css'));
});

gulp.task('jade', function() {
	gulp.src(paths.jade)
	.pipe(plumber())
	.pipe(jade({
		pretty: '\t'
	}))
	.pipe(gulp.dest('app/'));
});

gulp.task('watch', function(){
	gulp.watch(paths.jadeToWatch, ['jade']);
	gulp.watch(paths.scssToWatch, ['scss']);
});


