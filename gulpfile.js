var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var babel = require('gulp-babel');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cssnano = require('gulp-cssnano');
var terser = require('gulp-terser');
var browserSync = require('browser-sync')
  .create();
var gulpSequence = require('gulp-sequence');
var useref = require('gulp-useref');
var gulpIf = require('gulp-if');
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
    .pipe(plumber({
      errorHandler: function(err) {
        console.log(err);
        this.emit('end');
      }
    }))
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sass({ errLogToConsole: true }))
    .pipe(autoprefixer({
      browsers: ['last 4 versions'],
      cascade: false
    }))
    .pipe(cssnano())
    .pipe(sourcemaps.write(undefined, { sourceRoot: null }))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }));
});



gulp.task('js', function() {
  return gulp.src('app/js/*.js') // Gets all files ending with .scss in app/scss
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(babel())
    .pipe(terser())
    .pipe(concat('all.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('app/public'))
    .pipe(browserSync.reload({
      stream: true
    }));
});


gulp.task('images', function() {
  return gulp.src('app/img/*')
    .pipe(imagemin([
    imagemin.gifsicle({ interlaced: true }),
    imagemin.jpegtran({ progressive: true }),
    imagemin.optipng({ optimizationLevel: 5 }),
    imagemin.svgo({
        plugins: [
          { removeViewBox: true },
          { cleanupIDs: false }
        ]
      })
]))
    .pipe(gulp.dest('app/public/img'))
    .pipe(browserSync.reload({
      stream: true
    }));
});



// gulp.task('default', ['js', sass], () => {
//   gulp.watch('src/js/main.js', ['js']);
// });
