var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var babel = require('gulp-babel');

gulp.task('babel-client', function () {
  return gulp.src([
      'src/js/base.js',
      'src/js/horizontal.js',
      'src/js/horizontal-infinite.js',
      'src/js/*.js'
    ])
    .pipe(sourcemaps.init())
    .pipe(concat('bxslider.js'))
    .pipe(babel({
      modules: 'ignore'
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'));
});

gulp.task('babel-test', function () {
  return gulp.src([
      'test/unit/*.js'
    ])
    .pipe(sourcemaps.init())
    .pipe(babel({
      modules: 'ignore'
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./test/build/unit'));
});

gulp.task('watch', function() {
  gulp.watch('src/js/*.js', ['babel-client']);
  gulp.watch('test/unit/*.js', ['babel-test']);
});

gulp.task('default', ['babel-client', 'babel-test', 'watch']);
