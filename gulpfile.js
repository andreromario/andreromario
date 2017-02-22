var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var stylus = require('gulp-stylus');
var autoPrefixer = require('gulp-autoprefixer');
//if node version is lower than v.0.1.2
require('es6-promise').polyfill();
var cssComb = require('gulp-csscomb');
var cmq = require('gulp-merge-media-queries');
var cleanCss = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var pug = require('gulp-pug');
var minifyHtml = require('gulp-minify-html');
var imageMin = require('gulp-imagemin');
var cache = require('gulp-cache');
gulp.task('stylus',function(){
    gulp.src(['src/stylus/*.styl'])
        .pipe(plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(stylus({
            'include css': true
        }))
        .pipe(sourcemaps.init())
        .pipe(autoPrefixer())
        .pipe(cssComb())
        .pipe(cmq({log:true}))
        .pipe(concat('main.css'))
        .pipe(gulp.dest('css'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(cleanCss())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('css'))
        .pipe(reload({stream:true}))
});
gulp.task('js',function(){
    var src = 'src/js/';

    var jquery = src + 'jquery.min.js';
    var bootstrap = src + 'bootstrap.min.js';
    var easing = src + 'jquery.easing.min.js';
    var fancybox = src + 'jquery.fancybox.min.js';
    var scripts = src + 'scripts.js';

    gulp.src([jquery,bootstrap,easing,fancybox,scripts])
        .pipe(plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(sourcemaps.init())
        .pipe(concat('main.js'))
        .pipe(gulp.dest('js'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('js'))
        .pipe(reload())
});
gulp.task('pug',function(){
    gulp.src(['src/*.pug'])
        .pipe(plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(pug())
        .pipe(minifyHtml())
        .pipe(gulp.dest('./'))
});
gulp.task('img',function(){
    gulp.src(['src/img/**/*'])
        .pipe(plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(cache(imageMin()))
        .pipe(gulp.dest('img'))
        .pipe(reload())
});
gulp.task('default',function(){
    browserSync.init({
        server: "./"
    });
    gulp.watch('src/js/**/*.js',['js']);
    gulp.watch('src/stylus/**/*.styl',['stylus']);
    gulp.watch('src/**/*.pug',['pug']);
    gulp.watch('src/img/**/*',['img']);
});
