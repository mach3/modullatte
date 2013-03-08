
module.exports = function(grunt){

	var fs = require("fs"),
		cp = require("child_process");

	grunt.loadTasks("./tasks/");

	grunt.initConfig({
		modullatte : {
			options : {
			},
			test : {
				src : [
					"test/**/*.html",
					"!test/modules/*",
					"!test/**/~*.html"
				]
			}
		}
	});

	/**
	 * Install dependencies
	 */
	grunt.registerTask("install", function(){
		var done = this.async();
		cp.exec("bower install", function(e, out, error){
			if(e){
				grunt.log.error(error);
			} else {
				cp.exec("cat ./components/js-beautify/beautify-html.js > ./lib/beautify-html.js");
			}
		});
	});

	/**
	 * Test task
	 */
	grunt.registerTask("test", "modullatte");

	/**
	 * Reset for test
	 */
	grunt.registerTask("reset", function(){
		var files, dest, source;

		grunt.log.writeln("Reset test files\n");
		files = {
			"./test/test.html" : "./test/~test.html",
			"./test/sub/test.html" : "./test/sub/~test.html",
			"./test/sub/sub/test.html" : "./test/sub/sub/~test.html"
		};
		for(dest in files){
			if(files.hasOwnProperty(dest)){
				source = fs.readFileSync(files[dest], "utf-8");
				fs.writeFileSync(dest, source);
				grunt.log.writeln(dest + " < " + files[dest]);;
			}
		}
		grunt.log.writeln("\ndone.");
	});

};