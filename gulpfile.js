var gulp = require('gulp'),
concat = require('gulp-concat'),
uglify = require('gulp-uglify-es').default;
var replace = require('gulp-replace');

gulp.task('default', function () {

    var jsFilesInOrder = [
        "js/assets.js",
        "js/sprite.js",
        "js/background.js",
        "js/colors.js",
        "js/doodadManager.js",
        "js/treeManager.js",
        "js/hitboxDisplay.js",
        "js/player.js",
        "js/customer.js",
        "js/seagull.js",
        "js/gnats.js",
        "js/customerManager.js",
        "js/audioManager.js",
        "js/textWriter.js",
        "js/game.js"
        ]

    return gulp.src(jsFilesInOrder)
        .pipe(concat('seemore-run.js'))
        .pipe(replace('img/', '/assets/game/img/'))
        .pipe(replace('audio/', '/assets/game/audio/'))
        .pipe(uglify())
        .pipe(gulp.dest('c:\\dev\\website\\src\\assets\\game'))
});