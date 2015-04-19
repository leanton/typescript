var gulp = require('gulp'),
	ts = require('gulp-typescript'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	plumber = require('gulp-plumber'),
	tsPath = "typescript/*.ts",
	compilePath = "app/tsjs",
	dist = "js/dist",
	browserSync = require('browser-sync'),
	reload = browserSync.reload;

gulp.task('compressScripts', function() {
	gulp.src([
		compilePath + 'typescript/*.js'
	])
		.pipe(plumber())
		.pipe(concat('scripts.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest(dist));
});

gulp.task('typescript', function() {
	var tsResults = gulp.src(tsPath)
				.pipe(ts({
					target: 'ES5',
					declarationFiles: false,
					noExternalResolve: true
				}));
	tsResults.dts.pipe(gulp.dest(compilePath + '/tsdefinitions'));
	return tsResults.js.pipe(gulp.dest(compilePath));
});

gulp.task('watch', function() {

	gulp.watch([tsPath], ['typescript'])

});

gulp.task('serve', function() {
  browserSync({
    server: {
      baseDir: 'app'
    }
  });

  gulp.watch(['*.html', 'css/**/*.css', 'js/**/*.js'], {cwd: 'app'}, reload);
});

gulp.task('default', ['typescript', 'watch', 'compressScripts']);
