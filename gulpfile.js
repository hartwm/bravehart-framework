var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var babel = require('gulp-babel');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var gulpSequence = require('gulp-sequence');
var browserSync = require('browser-sync')
  .create();
var useref = require('gulp-useref');
var uglify = require('gulp-terser');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
// var runSequence = require('run-sequence');



// Configuration file to keep your code DRY
var cfg = require('./config.json');
var paths = cfg.paths;


gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
});


gulp.task('sass', function() {
  return gulp.src('app/scss/**/*.scss') // Gets all files ending with .scss in app/scss
    .pipe(sass()
      .on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 4 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }));
});



gulp.task('js', function() {
  return gulp.src('app/js/*.js') // Gets all files ending with .scss in app/scss
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat('all.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('app/public'))
    .pipe(browserSync.reload({
      stream: true
    }));
});


// gulp.task('script', () =>
//   gulp.src('src/**/*.js')
//   .pipe(sourcemaps.init())
//   .pipe(babel({
//     presets: ['@babel/env']
//   }))f
//   .pipe(concat('all.js'))
//   .pipe(sourcemaps.write('.'))
//   .pipe(gulp.dest('public'))
// );


// gulp.task('js', () => {
//   return gulp.src('src/js/main.js')
//     .pipe(babel({
//       presets: ['es2015']
//     }))
//     .pipe(gulp.dest('public'));
// });

// gulp.task('default', ['js'], () => {
//   gulp.watch('src/js/main.js', ['js']);
// });



// gulp.task('sass', function() {
//   var stream = gulp.src(paths.sass + '/*.scss')
//     .pipe(plumber({
//       errorHandler: function(err) {
//         console.log(err);
//         this.emit('end');
//       }
//     }))
//     .pipe(sourcemaps.init({ loadMaps: true }))
//     .pipe(sass({ errLogToConsole: true }))
//     .pipe(autoprefixer('last 2 versions'))
//     .pipe(sourcemaps.write(undefined, { sourceRoot: null }))
//     .pipe(gulp.dest(paths.css))
//   return stream;
// });
