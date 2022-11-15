'use strict';

// В этих переменных gulp&less  будут находится спец объекты или функции
const gulp = require('gulp');
const less = require('gulp-less');
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');
const concatCss = require('gulp-concat-css');

// Эта функция содержит в себе код по преобразованию файла
// используем .pipe(), чтобы передавать предыдущее значение в следующий шаг
exports.less = function () {
    // цепочка вызовов
    return gulp.src('./src/css/*.less') // Используем объект gulp и вызываем у него функцию src, этой функцией мы указываем что там находятся исходники файлов с которыми будем работать
        .pipe(less())
        .pipe(concatCss("styles.css")) // Объединяем файлы в один
        .pipe(cssmin()) //Минифицируем
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./dist')); // Сохраняем в папку dist
}

exports.watch = function () {
    gulp.watch('./src/css/*.less', gulp.series('less'));
};