var gulp = require('gulp');
var argv = require('yargs').argv; // считываем аргументы
var sass = require('gulp-sass');
var cssPrefix = require('gulp-autoprefixer'); // корректируем css
var uglifyjs = require('gulp-uglify-es').default;
var BS = require('browser-sync');
var reload = BS.reload;


// Определяем, какую сборку собираем
var isProduction = (argv.production === undefined) ? false : true;

// Начальные настройки
var config = {
    app: './app',
    dist: isProduction ? './dist/prod' : './dist/dev',
}


gulp.task('default', ['html', 'sass', 'js', 'json', 'mywatch', 'server'], function () {
    console.log('task default');
});

gulp.task('html', function () {
    gulp.src([config.app + '/html/*.html'])
        .pipe(gulp.dest(config.dist))
        .pipe(reload({
            stream: true
        }));

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
    gulp.src([config.app + '/js/**/*.js'])
        .pipe(uglifyjs())
        .pipe(gulp.dest(config.dist + '/js'))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('mywatch', function () {
    gulp.watch([config.app + '/html/**/*.html'], ['html']);
    gulp.watch([config.app + '/sass/**/*.scss'], ['sass']);
    gulp.watch([config.app + '/js/**/*.js'], ['js']);
    gulp.watch([config.app + '/json/**/*.json'], ['json']);
});

// Server
gulp.task('server', function () {
    BS({
        server: {
            baseDir: config.dist
        }
    })
});
