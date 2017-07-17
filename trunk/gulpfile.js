var gulp = require('gulp');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var typeScript = require('gulp-typescript');
var sass = require('gulp-sass');
var coffee = require('gulp-coffee');
var minifycss = require('gulp-minify-css');
var gutil = require('gulp-util');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssgrace  = require('cssgrace');
var cssnext  = require('cssnext');
var sourcemaps = require('gulp-sourcemaps');
var tmodjs = require('gulp-tmod');

//var shell = require("shelljs");

var env = 'dev';

//gulp.task('bee', function() {
//    shell.exec('bee run', {async:true});
//});

// 模板处理
gulp.task('tmpl', function() {
    var src = 'Public/mod/*.html',
        dst = './Public/tpl';
    gulp.src(src)
        .pipe(tmodjs({
            base: './Public/mod/',
            combo: true,
            output: dst
        }));
})

//样式处理
gulp.task('scss', function() {
    //var src = 'Public/sass/**/*.scss',
    //    dst = 'Public/css';
    var src = ['Public/sass/**/*.scss'],
        dst = 'Public/css/';
    var processors = [
        autoprefixer({browsers: ['last 5 version'],
            cascade: true,
            remove: false
        }),
        cssnext(),
        cssgrace
    ];
    gulp.src(src)
        .pipe(env == 'dev' ? sourcemaps.init() : gutil.noop())
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(postcss(processors))
        .pipe(gulp.dest(dst))
        .pipe(rename({ suffix: '.min'}))
        .pipe(minifycss({compatibility: 'ie7'}))
        .pipe(env == 'dev' ? sourcemaps.write('../maps') : gutil.noop())
        .pipe(gulp.dest(dst))
})

gulp.task('css', function() {
    var src = 'Public/sass/*.css',
        dst = 'Public/css';
    var processors = [
        autoprefixer({browsers: ['last 5 version'],
            cascade: true,
            remove: false
        }),
        cssnext(),
        cssgrace
    ];
    gulp.src(src)
        .pipe(env == 'dev' ? sourcemaps.init() : gutil.noop())
        .pipe(postcss(processors))
        .pipe(gulp.dest(dst))
        .pipe(rename({ suffix: '.min'}))
        .pipe(minifycss({compatibility: 'ie7'}))
        .pipe(env == 'dev' ? sourcemaps.write('../maps') : gutil.noop())
        .pipe(gulp.dest(dst))
})

gulp.task('js', function() {
    var jsSrc = 'Public/src/**/*.js',
        jsDst = 'Public/js'
    gulp.src(jsSrc)
        .pipe(gulp.dest(jsDst))
        .pipe(env == 'dev' ? sourcemaps.init() : gutil.noop())
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(env == 'dev' ? sourcemaps.write('../maps') : gutil.noop())
        .pipe(gulp.dest(jsDst));
});

gulp.task('ts', function() {
    var src = 'Public/ts/**/*.ts',
        dst = 'Public/js';
    gulp.src(src)
        .pipe(env == 'dev' ? sourcemaps.init() : gutil.noop())
        .pipe(typeScript())
        .pipe(gulp.dest(dst))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(env == 'dev' ? sourcemaps.write('../maps') : gutil.noop())
        .pipe(gulp.dest(dst));
});

gulp.task('coffee', function() {
    var src = 'Public/coffee/**/*.ts',
        dst = 'Public/js';
    gulp.src(src)
        .pipe(env == 'dev' ? sourcemaps.init() : gutil.noop())
        .pipe(coffee({ bare: true })).on('error', gutil.log)
        .pipe(gulp.dest(dst))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(env == 'dev' ? sourcemaps.write('../maps') : gutil.noop())
        .pipe(gulp.dest(dst));
});

gulp.task('bs', function() {
    browserSync({
        files: "Public/css/*.css, **/*.html, Public/js/*.js",
        proxy: "http://localhost:80/index.php"
    });
});

gulp.task('watch', function() {
    gulp.watch('Public/src/**/*.js', function () {
        gulp.run('js')
    });

    gulp.watch('Public/sass/*.scss', function() {
        gulp.run('scss')
    });
    gulp.watch('Public/mod/*.html', function () {
        gulp.run('tmpl')
    });
});

gulp.task('default', function(callback) {
    runSequence("watch",  callback)
});

gulp.task('release', ["release"]);