let gulp = require('gulp'), //all gulp tasks require gulp variable
webpack = require('webpack'); //created webpack variable

gulp.task('scripts', (callback) => { //callback shows when the webpack is complete
    webpack(require('../../webpack.config.js'), (err, stats) => {
        if(err){
            console.log(err.toString());
        }

        console.log(stats.toString());
        callback(); 
    });
});