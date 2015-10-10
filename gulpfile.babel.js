import gulp   from 'gulp';
import gbabel from 'gulp-babel'
import del    from 'del';
import gutil  from 'gutil'

const source = 'src'
const dist   = 'lib'

gulp.task('clean', () =>
  del [`dist/**/*`]
)

gulp.task('build', () =>
  gulp.src(`${source}/**/*`)
    .pipe(gbabel({experimental: true}))
    .pipe(gulp.dest(dist))
)

gulp.task('buildAll', ['clean', 'build'])

gulp.task('build', () =>
  gulp.src(`${source}/**/*`)
    .pipe(gbabel({experimental: true}))
    .pipe(gulp.dest(dist))
);

gulp.task('watch', (done) => {
  gulp.watch(`${source}/**/*`, ['build'])
  done()
});

// gulp.task('dev', gulp.series('build', 'watch'));
gulp.task('dev', ['build', 'watch'])
gulp.task('default', ['buildAll'])
