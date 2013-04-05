/**
 * Modullatte for Grunt.js
 * -----------------------
 * Grunt task for Modullatte, simple HTML module tool
 */
module.exports = function(grunt){

	var modullatte, fs, path;

	modullatte = require("../lib/modullatte");
	fs = require("fs");
	path = require("path");

	grunt.registerMultiTask(
		"modullatte",
		"Simple html module tool",
		function(){
			var done, data, options;

			done = this.async();
			data = this.data;
			options = this.options({
				verbose : true,
				ignore : true,
				ignore_names : ["^_"],

				beautify : false,
				indent_size : 1,
				indent_char : "\t",
				max_char : 250,
				brace_style : "collapse",
				indent_scripts : "normal"
			});

			if(typeof options.ignore_names === "string"){
				options.ignore_names = [options.ignore];
			}

			grunt.file.expand(data.src).forEach(function(file){
				var ignore, ins, log;

				ignore = false;
				ins = modullatte.create(file, options);
				log = function(file, message, error){
					var method;

					if(options.verbose){
						method = error ? "error" : "writeln";
						grunt.log[method]( message + "(" + file + ")");
					}
				};

				if(options.ignore){
					options.ignore_names.forEach(function(value, index){
						if(path.basename(file).match(value)){
							ignore = true;
						}
					});
				}


				if(! ignore){
					ins.validate(function(e, m){
						var html;

						if(e === null){
							html = ins.build();
							if(html){
								fs.writeFileSync(file, html);
								log(file, "Modules inserted.");
							} else {
								log(file, "Something goes wrong.", true);
							}
						} else if(e.type === "invalid") {
							log(file, e.message, true);
						}
					});
				}

			});

			done();
		}
	);

};
