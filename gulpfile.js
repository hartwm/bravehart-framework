var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var babel = require('gulp-babel');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var terser = require('gulp-terser');
var gulpSequence = require('gulp-sequence');
var useref = require('gulp-useref');
var gulpIf = require('gulp-if');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var rename = require('gulp-rename');
var postcss = require('gulp-postcss');
var precss = require('precss');

var browserSync = require('browser-sync')
  .create();
var reload = browserSync.reload;
var stream = browserSync.stream;

// Configuration file to keep your code DRY
var cfg = require('./config.json');
var paths = cfg.paths;


gulp.task('browser-sync', function() {
  browserSync.init(cfg.browserSyncWatchFiles, cfg.browserSyncOptions);
});


var opacity = function(css, opts) {
  css.eachDecl(function(decl) {
    if (decl.prop === 'opacity') {
      decl.parent.insertAfter(decl, {
        prop: '-ms-filter',
        value: '"progid:DXImageTransform.Microsoft.Alpha(Opacity=' + (parseFloat(decl.value) * 100) + ')"'
      });
    }
  });
};


gulp.task('styles', function() {

  var plugins = [
    autoprefixer({
      browsers: ['last 4 versions'],
      cascade: false
    }),
    cssnano({ discardComments: { removeAll: true } }),
  ];

  return gulp.src('app/scss/**/*.scss') // Gets all files ending with .scss in app/scss
    .pipe(plumber({
      errorHandler: function(err) {
        console.log(err);
        this.emit('end');
      }
    }))
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sass({ errLogToConsole: true }))
    .pipe(postcss(plugins))
    .pipe(concat('main.css'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('public/css'))
    .pipe(browserSync.stream())
});



gulp.task('scripts', function() {
  return gulp.src('app/js/*.js') // Gets all files ending with .scss in app/scss
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(babel())
    .pipe(terser())
    // .pipe(concat('main.js'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('public/js'))
});

gulp.task('html', function() {
  return gulp.src('app/**/*.{html, php}') // Gets all files ending with .scss in app/scss 
    .pipe(gulp.dest('public'))
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
    .pipe(gulp.dest('public/img'))
});



gulp.task('watch:styles', ['styles'], function() {
  gulp.watch('app/scss/**/*.scss', ['styles']);
});
gulp.task('watch:scripts', ['scripts'], function() {
  gulp.watch('app/js/**/*.js', ['scripts']);
});
gulp.task('watch:images', ['images'], function() {
  gulp.watch('app/img/*.{png,gif,jpg,jpeg,svg}', ['images'])
    .on("change", reload);
});
gulp.task('watch:html', ['html'], function() {
  gulp.watch('app/**/*.{html,php}', ['html']);
});
gulp.task('clean-dist', function() {
  return del([paths.dist + '/**']);
});
gulp.task('clean-public', function() {
  return del([paths.public + '/**']);
});


// gulp dist
// Copies the files to the /dist folder for distribution as simple theme
gulp.task('dist', function() {
  return gulp.src([paths.public + '/**/*', '!readme.txt', '!readme.md', '!package.json', '!package-lock.json', '!gulpfile.js', '!gulpconfig.json', '!CHANGELOG.md', '!.travis.yml', '!jshintignore', '!codesniffer.ruleset.xml'], { 'buffer': true })
    .pipe(gulp.dest(paths.dist));
});



gulp.task('clean', ['clean-public', 'clean-dist']);
gulp.task('copy', ['styles', 'scripts', 'images', 'html']);
gulp.task('watch', ['watch:styles', 'watch:scripts', 'watch:images', 'watch:html']);
gulp.task('production', gulpSequence('clean-public', 'clean-dist', 'copy', 'dist'));
gulp.task('default', gulpSequence('watch', 'browser-sync'));
