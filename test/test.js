var fs = require("fs");
var path = require("path");
var should = require("should");

function getFiles (dir, files_){
	var p = path.dirname(dir.toLowerCase()).replace(/\\/g, "/");
	if (	// ignore root
		p === __dirname
	){
		return files_;
	}
	p = p.split("/");
	p = p[p.length-1];
	if (	// ignore asset folders
		p === "bower_components" ||
		p === "test" ||
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
        	if (path.extname(name).toLowerCase() === ".wav" ){
        		files_.push(name);
        	}
        }
    }
    return files_;
}


describe("validation", function() {
	it("should hold only lowercased filenames", function() {
		var files = getFiles(path.join(__dirname, ".."));

		for (var i = 0; i < files.length; i++) {
			var file = path.basename(files[i]);
			file.toLowerCase().should.be.equal(file);
		}
	});
});