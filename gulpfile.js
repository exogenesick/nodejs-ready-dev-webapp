var gulp = require('gulp');
var jsSourceFiles = ['app.js', 'src/*/*.js'];
var testFiles = ['test/*/*.test.js'];

gulp.task('lint', function () {
    var jshint = require('gulp-jshint');

    return gulp.src(jsSourceFiles)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('jscs', function () {
    var jscs = require('gulp-jscs');

    return gulp.src(jsSourceFiles.concat(testFiles))
        .pipe(jscs());
});

gulp.task('mocha', function () {
    var mocha = require('gulp-mocha');

    return gulp.src(testFiles, { read: false })
        .pipe(mocha());
});

gulp.task('istanbul', function (cb) {
    var istanbul = require('gulp-istanbul');
    var mocha = require('gulp-mocha');
    var tap = require('gulp-tap');
    var coverageReportDir = 'coverage-report';

    gulp.src(jsSourceFiles)
        .pipe(istanbul({ includeUntested: true }))
        .pipe(istanbul.hookRequire())
        .on('finish', function () {
            gulp.src(testFiles)
                .pipe(mocha())
                .pipe(istanbul.writeReports({
                    dir: coverageReportDir
                }))
                .on('end', cb);
        });
});

gulp.task('default', ['lint', 'jscs', 'mocha']);
gulp.task('code:coverage', ['lint', 'jscs', 'istanbul']);