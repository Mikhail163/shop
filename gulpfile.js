var gulp = require('gulp');
var argv = require('yargs').argv; // считываем аргументы
var sass = require('gulp-sass');
var cssPrefix = require('gulp-autoprefixer'); // корректируем css
var uglifyjs = require('gulp-uglify-es').default;
var BS = require('browser-sync');
var reload = BS.reload;
var bower = require('gulp-bower');


// Определяем, какую сборку собираем
var isProduction = (argv.production === undefined) ? false : true;

// Начальные настройки
var config = {
    app: './app',
    dist: isProduction ? './dist/prod' : './dist/dev',
}


gulp.task('default', ['bower', 'html', 'sass', 'js', 'json', 'test', 'mywatch', 'server', 'images', 'favicon'], function () {
    console.log('task default');
});

gulp.task('html', function () {
    gulp.src([config.app + '/html/*.html'])
        .pipe(gulp.dest(config.dist))
        .pipe(reload({
            stream: true
        }));

});

gulp.task('images', function () {

    gulp.src([config.app + '/i/*+(.jpg|png|gif|svg)'])
        .pipe(gulp.dest(config.dist + '/i'))
        .pipe(reload({
            stream: true
        }));


});

gulp.task('favicon', function () {

    gulp.src([config.app + '/favicon.ico'])
        .pipe(gulp.dest(config.dist))
        .pipe(reload({
            stream: true
        }));
});


gulp.task('test', function () {
    if (!isProduction) {

        gulp.src([config.app + '/html/test/*.html'])
            .pipe(gulp.dest(config.dist))
            .pipe(reload({
                stream: true
            }));

        gulp.src([config.app + '/js/test/*.js'])
            .pipe(uglifyjs())
            .pipe(gulp.dest(config.dist + '/js'))
            .pipe(reload({
                stream: true
            }));
    }



});

gulp.task('json', function () {


    gulp.src([config.app + '/json/**/*.json'])
        .pipe(gulp.dest(config.dist + '/json'))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('sass', function () {

    gulp.src([config.app + '/sass/main.scss'])
        .pipe(sass())
        .pipe(cssPrefix())
        .pipe(gulp.dest(config.dist + '/css'))
        .pipe(reload({
            stream: true
        }));


});

gulp.task('js', function () {
    gulp.src([config.app + '/js/*.js'])
        .pipe(uglifyjs())
        .pipe(gulp.dest(config.dist + '/js'))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('mywatch', function () {
    gulp.watch([config.app + '/html/*.html'], ['html']);
    gulp.watch([config.app + '/sass/**/*.scss'], ['sass']);
    gulp.watch([config.app + '/js/*.js'], ['js']);
    gulp.watch([config.app + '/json/**/*.json'], ['json']);

    if (!isProduction)
        gulp.watch([config.app + '/html/test/*.html', config.app + '/js/test/*.js'], ['test']);

    gulp.watch([config.app + '/bower/*.json'], ['bower']);
});

// Server
gulp.task('server', function () {
    BS({
        server: {
            baseDir: config.dist
        }
    })
});

gulp.task('bower', function () {

    if (!isProduction)
        return bower({
            directory: '../../' + config.dist + '/bower_components',
            cwd: config.app + '/bower'
        });
});
