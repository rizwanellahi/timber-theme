const { src, dest, parallel, series, watch, gulp } = require("gulp");
// const sass = require("gulp-sass");
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require("gulp-autoprefixer");
const cssnano = require("gulp-cssnano");
const changed = require("gulp-changed");
const terser = require("gulp-terser");
const concat = require("gulp-concat");
// const { de, deleteSyncl } = require("del");
const imagemin = require("gulp-imagemin");
const newer = require("gulp-newer");
const browsersync = require("browser-sync").create();
const sourcemaps = require("gulp-sourcemaps");

// Clean assets
// function clean() {
//   return del(["public"], { force: true });
// }

// Compile sass into CSS & auto-inject into browsers
function styles() {
  const source = "./assets/styles/scss/main.scss";
  return (
    src(source)
      .pipe(sourcemaps.init())
      // .pipe(changed(source))
      .pipe(sass())
      .pipe(
        autoprefixer({
          overrideBrowserslist: ["last 4 versions"],
          cascade: false,
        })
      )
      .pipe(cssnano())
      .pipe(concat("styles.min.css"))
      .pipe(sourcemaps.write())
      .pipe(dest("public/css"))
      .pipe(browsersync.reload({ stream: true }))
  );
}

// function vendorStyles() {
//   return src(["assets/styles/vendor/*.css"])
//     .pipe(concat("vendor.min.css"))
//     .pipe(dest("public/assets/styles"));
// }

// function scripts() {
//   const source = "./assets/scripts/custom/**/*.js";
//   return (
//     src(source)
//       // .pipe(changed(source))
//       .pipe(concat("app.min.js"))
//       .pipe(terser())
//       .pipe(dest("public/assets/scripts/app"))
//       .pipe(browsersync.stream())
//   );
// }

// function vendorScripts() {
//   return src([
//     "assets/scripts/vendor/bootstrap.min.js",
//     "assets/scripts/vendor/locomotive.min.js",
//     "assets/scripts/vendor/gsap.min.js",
//     "assets/scripts/vendor/modalAnimate.js",
//   ]).pipe(dest("public/assets/scripts"));
// }

// function jquery() {
//   return src(["assets/scripts/jquery/jquery-3.5.1.min.js"])
//     .pipe(concat("jquery.min.js"))
//     .pipe(dest("public/assets/scripts"));
// }

// function fonts() {
//   return src(["assets/fonts/**/*"]).pipe(dest("public/assets/fonts"));
// }

// Optimize Media Files
// function images() {
//   return src("assets/images/**/*")
//     .pipe(newer("public/assets/images"))
//     .pipe(
//       imagemin([
//         imagemin.gifsicle({ interlaced: true }),
//         imagemin.mozjpeg({ progressive: true }),
//         imagemin.optipng({ optimizationLevel: 5 }),
//         imagemin.svgo({
//           plugins: [
//             {
//               removeViewBox: false,
//               collapseGroups: true,
//             },
//           ],
//         }),
//       ])
//     )
//     .pipe(dest("public/assets/images"));
// }

function watchFiles() {
  // Watch CSS
  watch("./assets/styles/scss/**/*.scss", styles);
  // watch("./assets/styles/custom/**/*.scss", styles);
  // watch("./assets/scripts/custom/**/*.js", scripts);
}

function browserSync() {
  // index.html
  browsersync.init({
    // You can tell browserSync to use this directory and serve it as a mini-server
    // server: {
    //   baseDir: "./",
    // },
    // If you are already serving your website locally using something like apache
    // You can use the proxy setting to proxy that instead
    // proxy: "http://localhost/vape-website",
    proxy: "http://vape-website.test",
  });
  // watch("./**.html").on("change", browsersync.reload);

  // https://wpbeaches.com/getting-browsersync-running-with-gulp-4-and-valet/
  watch("./**/**/*.php").on("change", browsersync.reload);
  watch("./**/**/*.twig").on("change", browsersync.reload);
  // watch("./assets/styles/custom/**/*.scss", styles).on('change',browsersync.reload);
  // watch("./assets/scripts/custom/**/*.js", scripts).on('change',browsersync.reload);
  // watch('./*.php', ['php']).on('change', browsersync.reload);
  // watch('./js/*.js').on('change', browserSync.reload);
  // watch('./css/*.css').on('change', browserSync.reload);
  // watch('./*css').on('change', browserSync.reload);
}

const build = series(
  // clean,
  // parallel(styles, vendorStyles, scripts, vendorScripts, jquery, fonts, images)
  parallel(styles)
);

exports.styles = styles;
// exports.vendorStyles = vendorStyles;
// exports.scripts = scripts;
// exports.vendorScripts = vendorScripts;
// exports.jquery = jquery;
// exports.fonts = fonts;
// exports.images = images;
exports.build = build;
exports.watch = parallel(watchFiles, browserSync);
exports.style = watchFiles;