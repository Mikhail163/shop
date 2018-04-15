var gulp = require('gulp');
var argv = require('yargs').argv; // считываем аргументы


var isProduction = (argv.production === undefined) ? false : true;


gulp.task('default', function () {
    console.log(isProduction);
});
