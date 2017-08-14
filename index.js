/**
 * 将内容处理成js结果
 */
var through = require('through2');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
const PLUGIN_NAME = 'gulp-madx';

function replaceExtension(path, extension) {
    return gutil.replaceExtension(path, extension || '.js');
}

function setContent(content) {
    var html_list = content.match(/(<template\s*((id=\")[a-z\-A-Z0-9_]+\")?\s*>\s*((?!<\/template>).)*\s*<\/template>)/g);
    var js = content.match(/<script>([\s\S]*)<\/script>/);
    var style = content.match(/<style>([\s\S]*)<\/style>/);
    var html = "";
    html_list.map(template => {
        var arr = template.match(/id=\"([a-zA-Z\-_0-9]*)\"/);
        var id = arr && arr.length > 1 ? arr[1] : "template";
        id=id.replace("-","_");
        var arr = template.match(/<template\s*[a-zA-Z0-9\-=\"_]*\s*>\s*(((?!<\/template>).)*)\s*<\/template>/);
        var tt = arr && arr.length > 1 ? arr[1] : "";
        html += `var ${id}=\`${tt}\`;\n`;
    });
    style = style[1] || "";
    js = js[1] || "";
    var result = `${html} var style=\`${style}\`\n` + js;
    return result;
}

//处理文件
function madLoader(extension) {

    var stream = through.obj(function (file, enc, cb) {
        //如果文件内容为空，则返回继续处理
        if (file.isNull()) return cb(null, file);
        var dest = replaceExtension(file.path, extension);
        if (file.isBuffer()) {
            file.contents = new Buffer(setContent(file.contents.toString('utf8')), "utf-8");
            file.path = dest;
            return cb(null, file);
        }

        if (file.isStream()) {
            streamer.on('error', this.emit.bind(this, 'error'));
            // 开始转换
            var content = setContent(fs.readFileSync(file.path).toString("utf-8"));
            file.contents = new Buffer(content, "utf-8");
            file.path = dest;
        }
        this.push(file);
        cb(null, file);
    });

    // 返回文件 stream
    return stream;
}

module.exports = madLoader;