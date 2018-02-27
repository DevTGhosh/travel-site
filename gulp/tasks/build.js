let gulp = require('gulp'),
imagemin = require('gulp-imagemin'),
del = require('del'),
usemin = require('gulp-usemin'),
rev = require('gulp-rev'),
cssnano = require('gulp-cssnano'),
uglify = require('gulp-uglify'),
browserSync = require('browser-sync').create();

gulp.task('previewDist', ()=> {

    browserSync.init({
        notify: false,
        server: {
            baseDir: "docs"
        }
    });
});

gulp.task('deleteDistFolder',['icons'], () => {
    return del('./docs');
});

// if you want to copy some other files and folders to docs folder
gulp.task('copyGeneratedFiles',['deleteDistFolder'], () => {
    let pathsToCopy = [
        './app/**/*',
        '!./app/index.html',
        '!./app/assets/images/**',
        '!./app/assets/styles/**',
        '!./app/assets/scripts/**',
        '!./app/temp',
        '!./app/temp/**'
    ];
    return gulp.src(pathsToCopy)
        .pipe(gulp.dest('./docs'));
});

gulp.task('optimizeImages', ['deleteDistFolder'],()=> {
    return gulp.src(['./app/assets/images/**/*', '!./app/assets/images/icons', '!../app/assets/images/icons/**/*'])
        .pipe(imagemin({
            progressive: true,
            interlaced: true,
            multipass: true
        }))
        .pipe(gulp.dest("./docs/assets/images"));
});

gulp.task('useminTrigger', ['deleteDistFolder'], ()=>{
    gulp.start('usemin');
});

gulp.task('usemin',['styles', 'scripts'] ,() => {
    return gulp.src('./app/index.html')
        .pipe(usemin({
            css: [()=> {return rev()}, ()=> {return cssnano()}],
            js: [()=> {return rev()}, ()=> {return uglify()}]
        }))
        .pipe(gulp.dest('./docs'));
});

gulp.task('build',['deleteDistFolder', 'copyGeneratedFiles', 'optimizeImages', 'useminTrigger']);

