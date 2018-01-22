var gulp = require('gulp');

// Include plugins
var plugins = require('gulp-load-plugins')();
// Variables de chemins
var source = './app/src/less'; // dossier de travail
var destination = './app'; // dossier à livrer

gulp.task('css', function () {
  return gulp.src(source + '/style.less')
    .pipe(plugins.less())
    .pipe(plugins.autoprefixer())
    .pipe(gulp.dest(destination + '/src/css'));
});

// Tâche "minify" = minification CSS (destination -> destination)
gulp.task('minify', function () {
  return gulp.src(destination + '/src/css/*.css')
    .pipe(plugins.csso())
    .pipe(plugins.rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(destination + '/dist'));
});

// Tâche "build"
gulp.task('build', ['css']);

// Tâche "prod" = Build + minify
gulp.task('prod', ['build',  'minify']);

// Tâche "watch" = je surveille *less
gulp.task('watch',['build'],  function () {
  gulp.watch(source + '/*.less', ['build']);
});

// Tâche par défaut
gulp.task('default', ['build']);
