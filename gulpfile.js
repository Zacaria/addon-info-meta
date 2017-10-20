const gulp = require('gulp');
const watch = require('gulp-watch');
const shell = require('shelljs');

gulp.task('default', function () {
    // Callback mode, useful if any plugin in the pipeline depends on the `end`/`flush` event
    return watch('src/**/*.js', function () {
        shell.exec('node ./compile.js');
    });
});
