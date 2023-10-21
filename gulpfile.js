const { src, dest, watch, parallel, series } = require('gulp'); //створення констант для gulp
const scss = require('gulp-sass')(require('sass'));  //установка sass в проект
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const del = require('del');
const browserSync = require('browser-sync').create();

function browsersync() {
    browserSync.init({
        server: {
            baseDir: 'app'
        },
        notify: false,   //відключає повідомлення
        browser: 'chrome'
    });    
}

function styles() {
return src('app/scss/style.scss')
    //pipe - дія яку необхідно виконати
    .pipe(scss({ outputStyle: 'compressed' }))   //зтискає scss
    .pipe(concat('style.min.css'))  //конкатинація повертає необхідний файл
    .pipe(autoprefixer({    //автопрефіксер для браузера
        overrideBrowserslist: ['last 10 versions'],
        grid: true
    }))
    .pipe(dest('app/css'))  //обирає папку в яку поміщається файл 
    .pipe(browserSync.stream())
}

function scripts() {    //скрипти js
    return src([
        'node_modules/jquery/dist/jquery.js',
        'node_modules/slick-carousel/slick/slick.js',
        'app/js/main.js'
    ])
    .pipe(concat('main.min.js'))    //об'єднання в один файл
    .pipe(uglify())
    .pipe(dest('app/js'))
    .pipe(browserSync.stream())    
}

function images() {
    return src('app/images/**/*.*')
    .pipe(imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ quality: 75, progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
            plugins: [
                { removeViewBox: true },
                { cleanupIDs: false }
            ]
        })
    ]))
    .pipe(dest('dist/images'))    
}

function watching() {    //функція спостереження за проектом
    watch(['app/scss/**/*.scss'], styles); //спостерігає за всіма файлами .scss
    watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts)   //не спостерігає за main.min.js
    watch(['app/**/*.html']).on('change', browserSync.reload)   //слідкує за html
}

function build() {  //білд що формує папку dist
    return src([
        'app/**/*.html',
        'app/css/style.min.css',
        'app/js/main.min.js'
    ], {base: 'app'})    
    .pipe(dest('dist'))
}

function cleanDist() {  //видаляє все з папки dist
    return del('dist')    
}

exports.styles = styles;    //необідно для запуску функції
exports.scripts = scripts;
exports.browsersync = browsersync;
exports.watching = watching;    //пишеться нижче всіх функції за якими спостерігає
exports.images = images;
exports.cleanDist = cleanDist;

exports.build = series( cleanDist, images, build);  //сувора послідовність дій
exports.default = parallel( styles, scripts, browsersync, watching);    //дефолт запуск gulp