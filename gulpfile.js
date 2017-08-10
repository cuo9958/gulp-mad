const gulp = require('gulp');
const madx = require('./index');
const ts = require('gulp-typescript');


gulp.task("default", function () {
    gulp.src("expmlate/a.mad")
        .pipe(madx(".ts"))
        // .pipe(ts())
        .pipe(ts({ module: "amd" }))
        .pipe(gulp.dest('dist'));
});
