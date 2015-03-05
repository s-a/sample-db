#!/usr/bin/env node


var fs = require("fs");
var path = require("path");
var beautify = require('js-beautify').js_beautify;

// A simple node script to generate a channel.json file.
function getFiles (dir, files_){
	var p = path.dirname(dir.toLowerCase());
	if (	// ignore root
		p === __dirname
	){
		return files_;
	}
	p = p.split("/");
	p = p[p.length-1];
	if (	// ignore asset folders
		p === "bower_components" ||
		p === "images" ||
		p === "javascripts" ||
		p === "stylesheets" ||
		p === "node_modules"
	){
		return files_;
	}
    files_ = files_ || [];
    var files = fs.readdirSync(dir);
    for (var i in files){
        var name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory()){
            getFiles(name, files_);
        } else {
        	if (path.extname(name).toLowerCase() === ".wav" || path.basename(name).toLowerCase() === "package.json"){
            	files_.push(name);
        	}
        }
    }
    return files_;
}

function bundle (files) {
	var result = [];
	var tmp = [];
	var i;

	// fetch all files
	for (i = 0; i < files.length; i++) {
		var file = files[i].replace(/\\/g, "/");
		var dirname = __dirname.replace(/\\/g, "/") + "/";
		tmp.push(file.replace(dirname, ""));

	}

	// categorize files
	for (i = 0; i < tmp.length; i++) {
		var f = path.basename(tmp[i]).toLowerCase();
		var p = tmp[i].split("/");
		p.pop();
		var pack = p.join("/");
		if (!result[pack]){
			result[pack] = {};
			result[pack].meta = {};
			result[pack].files = [];
			result[pack].path = pack
		}
		if (f.toLowerCase() === "package.json"){
			result[pack].meta = require(path.join(__dirname, pack,f));
		} else {
			result[pack].files.push(f);
		}
		//console.log(pack);
	}

	var res = [];
	// map result

	for (var key in result) {
		var item = result[key].meta;
		item.files = result[key].files;
		item.path = result[key].path;
		res.push(item)
	}

	return res;
}

var files = getFiles(__dirname);
var bundle = bundle(files);
var bundleData = JSON.stringify(bundle);
bundleData = beautify(bundleData, { 
	brace_style  : "expand" ,
	indent_char  : "\t",
	good_stuff   : true,
    keep_array_indentation: true
});

fs.writeFileSync('channel.json', bundleData);
console.log("done");