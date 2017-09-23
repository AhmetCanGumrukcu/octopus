var gulp = require("gulp");
var sass = require("gulp-sass");
var jade = require("gulp-jade");
var concat = require('gulp-concat');
var watch = require("gulp-watch");
var sourcemaps = require('gulp-sourcemaps');
var cleanCSS = require('gulp-clean-css');
var imagemin = require('gulp-imagemin');
var babel = require("babel-core");
var babel = require("gulp-babel");


// Sasss

gulp.task("sass", function() {
    return gulp.src("assets/scss/pro-main.scss")
        .pipe(sass().on("error", sass.logError))
        .pipe(gulp.dest("assets/css"));
});

// CSS Min

gulp.task("cssmin",function(){
    return gulp.src("assets/css/pro-main.css")
    .pipe(cleanCSS({compatibility:'ie8'}))
    .pipe(gulp.dest("assets/css"))
});


// Jade

gulp.task("jade", function() {
    return gulp.src("assets/jade/*.jade")
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest("./"))
});

// Babel

gulp.task("babel",function(){
    return gulp.src("assets/js/main.min.js")
    .pipe(babel({
            presets: ['env']
        }))
    .pipe(gulp.dest("assets/js"))
});

// Css Files Concat

gulp.task('cssConcat', function() {
  return gulp.src(['./assets/libs/css/bootstrap.min.css',"./assets/libs/slick.min.css","./assets/libs/slick-theme.min.css","./assets/libs/animate.min.css","./assets/libs/font-awesome.min.css"])
    .pipe(sourcemaps.init())
    .pipe(concat('cssLibs.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./assets/css'));
});

// Script Concat

gulp.task('scripts', function() {
  return gulp.src(['./assets/libs/js/jquery.min.js',"./assets/libs/js/bootstrap.min.js","./assets/libs/js/wow.min.js"])
  	.pipe(sourcemaps.init())
    .pipe(concat('starterLibs.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./assets/js'));
});

// Image min

gulp.task('imagemin', function(){
    gulp.src('assets/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('assets/img/news'))
});


// Watch

gulp.task("watch", function() {
    gulp.watch("assets/scss/pro-main.scss", ["sass"]);
    gulp.watch("assets/css/pro-main.css", ["cssmin"]);
    gulp.watch("assets/jade/*.jade", ["jade"]);
    gulp.watch("assets/jade/include/*.jade", ["jade"])
});

gulp.task("default", ["jade","sass","cssmin","imagemin","scripts","cssConcat","watch"]);