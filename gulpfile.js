var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var babel = require('gulp-babel');

gulp.task('babel', function () {
  return gulp.src('src/js/*.js')
    .pipe(babel({
      modules: 'ignore'
    }))
    .pipe(concat('bxslider.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
  gulp.watch('src/js/*.js', ['babel']);
});

gulp.task('default', ['babel', 'watch']);
