const gulp = require('gulp');
const del = require('del');
const gulpSass = require('gulp-sass');
const cleanCss = require('gulp-clean-css');
const gulpMinify = require('gulp-minify');
const sourcemaps = require('gulp-sourcemaps');

gulpSass.compiler = require('node-sass');

function clean(cb) {
  //Delete the existing public/ folder
  del.sync(['public/']);

  cb();
}

function doMisc(cb) {
  //Static HTML files
  gulp.src('assets/**/*.html')
    .pipe(gulp.dest('public/'));

  //Favicon
  gulp.src('assets/favicon.ico')
    .pipe(gulp.dest('public/'));

  //Any other static files that don't need preprocessing here

  cb();
}

function doCss(cb) {
  //Process .scss files into minified CSS
  gulp.src('assets/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(gulpSass().on('error', gulpSass.logError))
    .pipe(cleanCss())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/css'));

  //Other CSS preprocessing (.sass files, LESS) here

  cb();
}

function doJs(cb) {
  //Minify JS files
  gulp.src('assets/js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(gulpMinify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/js'));

  //Any Typescript preprocessing or such here

  cb();
}

var build = gulp.series(clean, doMisc, doCss, doJs);

exports.default = build;
exports.clean = clean;
