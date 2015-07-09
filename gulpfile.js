var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');
var mocha = require('gulp-mocha');
var tap = require('gulp-tap');
var coverageReportDir = 'coverage-report';

var jsSourceFiles = ['app.js', 'src/*/*.js'];
var testFiles = ['test/*/*.test.js'];

gulp.task('lint', function () {
    return gulp.src(jsSourceFiles)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('jscs', function () {
    return gulp.src(jsSourceFiles.concat(testFiles))
        .pipe(jscs());
});

gulp.task('mocha', function () {
    return gulp.src(testFiles, { read: false })
        .pipe(mocha());
});

gulp.task('istanbul', function (cb) {
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
