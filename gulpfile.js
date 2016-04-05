var gulp = require('gulp'),
    gutil = require('gulp-util'),
    uglify = require('gulp-uglify'),
    open = require('gulp-open'),
    connect = require('gulp-connect'),
    requireDir = require('require-dir'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    concat = require('gulp-concat'),
    minifyCss = require('gulp-minify-css'),
    clean = require('gulp-clean'),
    angularTemplateCache = require('gulp-angular-templatecache');


var sdk_files = [
    'src/stellar.js',
    'src/modules/**/*.js',
    'src/run.js'
];

var js_vendor_files = ['src/vendor/*.js'];
var css_file = 'src/default.css';

/*
 * TODO: Implement browserify and replace this task
 * NOTE: Making splitting of js files work for now
 */
gulp.task('generate-sdk', function() {
    return gulp.src(sdk_files)
        .pipe(concat('sdk.js'))
        .pipe(gulp.dest('stellar-js/dev'))
        .on('error', gutil.log);
});

gulp.task('generate-vendor', function() {
    return gulp.src(js_vendor_files)
        .pipe(gulp.dest('stellar-js/dev/vendor'))
        .on('error', gutil.log);
});

gulp.task('generate-css', function() {
    return gulp.src(css_file)
        .pipe(gulp.dest('stellar-js/dev'))
        .on('error', gutil.log);
});

gulp.task('watch', function() {
    gulp.watch(sdk_files, ['generate-sdk']);
    gulp.watch(js_vendor_files, ['generate-vendor']);
    gulp.watch(css_file, ['generate-css']);
});

gulp.task('build-dev', ['generate-sdk', 'generate-vendor', 'generate-css']);

gulp.task('default', ['build-dev', 'watch']);

/**
 * Manual Build
 */
var bases = {
    buildDist: 'build/dist/'
};

gulp.task('stellar-build-sdk', ['clean'], function() {
  return gulp.src(sdk_files)
    .pipe(concat('sdk.js'))
    .pipe(uglify())
    .pipe(gulp.dest(bases.buildDist))
    .on('error', gutil.log);
});

gulp.task('stellar-build-css', ['clean'], function() {
  return gulp.src(css_file)
    .pipe(minifyCss({compatibility: 'ie9'}))
    .pipe(gulp.dest(bases.buildDist))
    .on('error', gutil.log);
});

gulp.task('stellar-build-js', ['clean'], function() {
  return gulp.src('src/vendor/jquery.magnific-popup.min.js')
    .pipe(gulp.dest(bases.buildDist + 'vendor'))
    .on('error', gutil.log)
});

gulp.task('manual-stellar-build-sdk', [
          'stellar-build-sdk',
          'stellar-build-css',
          'stellar-build-js']);


gulp.task('clean', function() {
 return gulp.src(bases.buildDist)
 .pipe(clean());
});