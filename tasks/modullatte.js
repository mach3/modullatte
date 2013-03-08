/**
 * Modullatte for Grunt.js
 * -----------------------
 * Grunt task for Modullatte, simple HTML module tool
 */
module.exports = function(grunt){

	var modullatte, fs;

	modullatte = require("../lib/modullatte");
	fs = require("fs");

	grunt.registerMultiTask(
		"modullatte",
		"Simple html module tool",
		function(){
			var done, data, options;

			done = this.async();
			data = this.data;
			options = this.options({
				beautify : true,
				indent_size : 1,
				indent_char : "\t",
				max_char : 250,
				brace_style : "collapse",
				indent_scripts : "normal"
			});

			grunt.file.expand(data.src).forEach(function(path){
				var html;

				html = modullatte.build(path, options);
				fs.writeFileSync(path, html);
				grunt.log.writeln("[modulatte] : " + path);
			});

			done();
		}
	);

};