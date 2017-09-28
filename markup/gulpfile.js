//npm init
//npm install gulp gulp-watch gulp-autoprefixer gulp-uglify gulp-sass gulp-sourcemaps gulp-rigger gulp-clean-css gulp-tinypng-compress browser-sync --save-dev
'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
    cleanCSS  = require('gulp-clean-css'),
    tinypng = require('gulp-tinypng-compress'),
    browserSync = require("browser-sync"),
    svgstore = require('gulp-svgstore'),
    svgmin = require('gulp-svgmin'),
    svgpath = require('path'),
    includes = require('gulp-file-include'),
    cheerio = require('gulp-cheerio'),
    reload = browserSync.reload;

var path = {
    build: {
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/images/',
        svg: 'dev/inc',
        fonts: 'build/fonts/'
    },
    dev: {
        html: ['dev/**/*.html', '!dev/inc/**/*.html'],
        js: 'dev/js/*.js',
        style: 'dev/style/style.scss',
        img: 'dev/images/**/*.{png,jpg,jpeg}',
        svg: 'dev/images/svg/*.svg',
        fonts: 'dev/fonts/**/*.*'
    },
    watch: {
        html: 'dev/**/*.html',
        js: 'dev/js/**/*.js',
        style: 'dev/style/**/*.*',
        img: 'dev/images/**/*.{png,jpg,jpeg}',
        svg: 'dev/images/svg/*.svg',
        fonts: 'dev/fonts/**/*.*'
    },
    clean: './build'
};



var config = {
    server: {
        baseDir: "./build"
    },
    tunnel: false,
    host: 'localhost',
    port: 9000,
    logPrefix: "Frontend"
};

gulp.task('webserver', function () {
    browserSync(config);
});


gulp.task('html:build', function () {
    console.log('html-build');
    return gulp.src(path.dev.html) 
        .pipe(includes({
          prefix: '@@',
          basepath: '@file'
        }))
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true}));
});

gulp.task('js:build', function () {
    gulp.src(path.dev.js) 
        //.pipe(uglify()) 
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}));
});



gulp.task('style:build', function () {
    gulp.src(path.dev.style) 
        //.pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: ['dev/style/'],
            errLogToConsole: true
        }).on('error', sass.logError))
        .pipe(prefixer())
        .pipe(cleanCSS()) 
        //.pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}));
});


/*gulp.task('svg:build', function () {
    return gulp
        .src(path.dev.svg)
        .pipe(svgmin(function (file) {
            var prefix = svgpath.basename(file.relative, svgpath.extname(file.relative));
            return {
                plugins: [{
                    cleanupIDs: {
                        prefix: prefix + '-',
                        minify: true
                    }
                }]
            }
        }))
        .pipe(svgstore())
        .pipe(gulp.dest(path.build.svg));
});*/


/*gulp.task('svg:build', function () {
  return gulp.src(path.dev.svg)
    .pipe(svgmin())
    .pipe(svgstore({
      fileName: 'svg.svg',
      inlineSvg: true
    }))
    .pipe(cheerio({
      run: function ($, file) {
          $('svg symbol').removeAttr('style');
          $('svg').attr('style', 'display:none');
      },
      parserOptions: { xmlMode: true }
    }))
    .pipe(gulp.dest(path.build.svg))
    .pipe(reload({ stream:true }))
})*/


gulp.task('image:build', function () {
    gulp.src(path.dev.img)
        .pipe(tinypng({
            key: '73fEeflGGhHyRfftICpYXfKDG85FCcE2', //XRZuqyo6VWQvcOmvYPYprQBjS1GUcgy- ; P3jx6VFnO6SllhgMm1gktt1olcJDTYDs ;73fEeflGGhHyRfftICpYXfKDG85FCcE2
            log: true,
            sigFile: 'build/images/.tinypng-sigs',
            summarise: true
        }))
        .pipe(gulp.dest(path.build.img))
        .pipe(reload({stream: true}));
});


gulp.task('fonts:build', function() {
    gulp.src(path.dev.fonts)
        .pipe(gulp.dest(path.build.fonts))
});

gulp.task('build', [
    // 'svg:build',
    'html:build',
    'js:build',
    'style:build',
    'fonts:build',
    'image:build'
    
]);


gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start('style:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image:build');
    });
    /*watch([path.watch.svg], function(event, cb) {
        gulp.start('svg:build');
    });*/
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
});


gulp.task('default', ['build', 'webserver', 'watch']);