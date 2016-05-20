'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');

// gulp.task    - define a task
// gulp.src     - identify the source of the input file-custom
// gulp.dest    - output files with changes
// gulp.watch   - watch files/directories for changes
// *.pipe       - chain actions together ~ 'lay pips'

gulp.task('default', ['js', 'css', 'watch']);   // == gulp.task(name [, deps] [, fn]) ==> name; Type: String ; The name of the task. Tasks that you want to run from the command line should not have spaces in them.; deps; Type: Array; An array of tasks to be executed and completed before your task will run.

gulp.task('watch', ['watch.js', 'watch.css']);

gulp.task('watch.js', function(){                    // watch for any changes to js folder
  return gulp.watch('./client/**/*.js', ['js']);  // == gulp.watch(glob [, opts], tasks) or gulp.watch(glob [, opts, cb])
});

gulp.task('watch.css', function(){
  return gulp.watch('./client/**/*.css', ['css']);
});

gulp.task('js', function(){                       //

  return gulp.src('./client/js/*.js')
  .pipe(concat('bundle.js'))
  .pipe(gulp.dest('./public/'));

});

gulp.task('css', function(){
  var stream = gulp.src('./client/css/**/*.css')
  .pipe(gulp.dest('./public/css'));
  return stream;
});
