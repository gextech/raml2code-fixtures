var gulp = require('gulp');
var raml = require('gulp-raml');
var mocha = require('gulp-mocha');
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


gulp.task('test', function(cb){
  gulp.src(['./*spec.js'])
    .pipe(mocha(
      {
        require: ['chai', 'chai-as-promised'],
        reporter: 'spec',
        growl: true
      }
    ));
});

gulp.task('default', ['raml', 'json' ]);
