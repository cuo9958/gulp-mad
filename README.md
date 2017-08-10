# gulp-mad

处理文件，像处理vue的文件一样

打包css、html到js中

## 安装

``` JavaScript

npm install --save-dev gulp-mad

```

## gulp内使用方式

引用gulp-mad并调用。

``` JavaScript
const gulp = require('gulp');
const mad = require('gulp-mad');
const ts = require('gulp-typescript');

gulp.task("default", function () {
    gulp.src("expmlate/a.mad")
        .pipe(mad(".ts"))
        .pipe(ts({ module: "amd" }))
        .pipe(gulp.dest('dist'));
});
```
mad([extension])
extension:需要修改的后缀名，默认".js"。如果使用typescript，请一定设置为.ts

## 使用
- 新建一个后缀名为.mad的文件
- 将html写入template标签内
- html默认生成id为template的js变量，如果有多个可以设置id。自动生成变量名为id的变量。
- css样式写入style的标签内
- JavaScript写入script标签内

## git地址

[https://github.com/cuo9958/gulp-mad](https://github.com/cuo9958/gulp-mad) 
