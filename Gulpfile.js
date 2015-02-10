var gulp = require('gulp');
var raml = require('gulp-raml');
var jsonlint = require("gulp-jsonlint");

gulp.task('raml', function() {
  return gulp.src('./raml/index.raml')
    .pipe(raml())
    .pipe(raml.reporter('default'));
});

gulp.task('json', function() { 
  return gulp.src("./schemas/**/**.json")
      .pipe(jsonlint())
      .pipe(jsonlint.reporter());
});

gulp.task('default', ['raml', 'json' ]);