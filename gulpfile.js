const gulp = require("gulp");

const minifycss = require("gulp-csso");
const postcss = require("gulp-postcss");
const stylus = require("gulp-stylus");
const pug = require("gulp-pug");
const autoprefixer = require("autoprefixer");
const browserSync = require("browser-sync").create();

gulp.task("browserSync", function() {
  browserSync.init({
    server: {
      baseDir: "build"
    }
  });
});

gulp.task("styles", function() {
  return gulp
    .src("src/styles/*.styl")
    .pipe(stylus())
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest("build/styles"))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
});

gulp.task("pug", function() {
  return (
    gulp
      .src("src/pages/*.pug")
      //.pipe(pug()) // компиляция в html
      .pipe(pug({ pretty: true }))
      .pipe(gulp.dest("build/"))
      .pipe(
        browserSync.reload({
          stream: true
        })
      )
  );
});

gulp.task("cook", ["styles", "pug"]);

gulp.task("watch", ["browserSync"], function() {
  gulp.watch("src/styles/*.styl", ["styles"]);
  gulp.watch("src/pages/*pug", ["pug"]);
});
