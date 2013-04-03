/**
 *
 * Modullatte
 * ----------
 * Simple HTML module tool
 *
 */

var beautify = require("./beautify-html.js").html_beautify,
	fs = require("fs"),
	path = require("path");

var Modullatte = function(){

	this.file = null;
	this.fileDir = null;
	this.content = null;

	this.pattern = {
		module : /([\t\ ]+?)?((<!--\s*?#module\s*?")(.+?)("\s?-->))[\s\S]*?(<!--\s*?\/#module\s*?-->)/g,
		link : /((src|href)=('|"))(.+?)('|")/g,
		absoluteLink : /^(\/|(http|https|ftp):\/\/)/,
		nullLink : /^#$/
	};

	this.option = {
		beautify : false,
		indent_size : 1,
		indent_char : "\t",
		max_char : 250,
		brace_style : "collapse",
		indent_scripts : "normal"
	};

	this.init = function(file, option){
		this.file = file;
		this.fileDir = this._getDir(this.file);
		this.config(option);
		this.content = fs.readFileSync(this.file, "utf-8");
	};

	this.config = function(option){
		var key;

		for(key in option){
			if(this.option.hasOwnProperty(key)){
				this.option[key] = option[key];
			}
		}
	};

	this.build = function(){
		var content = this.content.replace(
			this.pattern.module,
			this._loadModule.bind(this)
		);
		if(this.option.beautify){
			content = beautify(content, this.option);
		}
		return content;
	};

	this._getDir = function(file){
		return path.normalize(file.replace(/[^\/]+?$/, ""));
	};

	this._loadModule = function(all, indent, header, d, file, f, footer){
		var module = {};

		indent = indent || "";
		module.path = path.normalize(this.fileDir + file);
		module.dir = this._getDir(file);
		module.content = fs.readFileSync(module.path, "utf-8")
		.replace(
			this.pattern.link, 
			(function(a, header, c, d, url, footer){
				if(this._isRelativeLink(url)){
					url = path.normalize(module.dir + url);
				}
				return header + url + footer;
			}).bind(this)
		)
		.replace(/[\r\n]+?/g, "\n" + indent);

		return [indent + header, indent + module.content, indent + footer].join("\n");
	};

	this._isRelativeLink = function(url){
		return url.match(this.pattern.absoluteLink) === null
			&& url.match(this.pattern.nullLink) === null;
	};

	this.init.apply(this, arguments);
};

exports.build = function(file, option){
	var modullatte = new Modullatte(file, option);
	return modullatte.build();
};
