/** 
 * This script is the entry point of the framework, called from index.
 * Project dependent code may go into the index file.
 * Load initial set of dependencies and start rendering.
 * This is the file to set the initial breakpoint when debugging. 
 */ 
require(["dojo", "dojo/parser", "dojo/domReady!"], function(dojo) {
    "use strict";

    // Check the dojo version.
	//alert("Dojo version " + dojo.version + " is loaded" + '\n\ndojoConfig = '+ dojo.toJson(dojo.config, true));

	// Reconfigure the loader at runtime by passing
	// require a configuration object as the first parameter.
	require({
		async : true,
		parseOnLoad : true,
		debug : true,
		cacheBust : new Date(),
		waitSeconds : 5,
		// Base URL replaces the path to dojo as default,
		// When dojo come from the local file-system,
		// we need the path to dojo to load siblings like dijit.
		// Thus the path must then be reset in packages.
		// baseUrl: "cog2/",
		// Set absolute path to dojo packages if not linked via http.
		// packages:[
		  // {
		    // name:'dojo',
		    // //location:'/Users/felixgers/BHT/software/dojo-release-xxxx/dojo'
		    // location:'/Users/felixgers/BHT/src/cog2/cog2_JS_template/dojo-release-xxxx/dojo'
		  // },{
		    // name:'dijit',
		    // //location:'/Users/felixgers/BHT/software/dojo-release-xxxx/dijit'
		    // location:'/Users/felixgers/BHT/src/cog2/cog2_JS_template/dojo-release-xxxx/dijit'
		  // }],
		// If the local path to dojo is kept, we can set an absolute path to
		// the cog2 project instead.
		paths : {
			// Absolute path to cog2 project, local directory without
			// HTTP-server:
			// "cog2" : "/Users/felixgers/BHT/src/cog2/cog2_JS_template/cog2"
			//"cog2" : "/Users/felixgers/BHT/src/cog2/cog2_JS_template/cog2"
			//"cog2" : "/home/felix/BHT/src/cog2/cog2_JS_template/cog2"
			// "cog2" : "file:///U:/BHT/src/cog2/cog2_JS_template"
			// On same [maybe local] HTTP-server as used to load dojo:
			"cog2" : "/cog2"
			// "cog2" : "/~gers/cog2_sol/cog2"
		},
		// Add one entry for each custom module.
		// This is, among others, necessary to apply the path parameter.
		aliases : [
			["app","cog2/app"],
			["layout","cog2/layout"],
			["ui","cog2/ui"],
			["scene","cog2/scene"],
			["scenegraph","cog2/scenegraph"],
			["createScene","cog2/createScene"],
			["model","cog2/model"],
			["node","cog2/node"],
			["raster","cog2/raster"],
			["shader","cog2/shader"],
			["framebuffer","cog2/framebuffer"],
			["texture","cog2/texture"],
			["animation","cog2/animation"],
			// Template data for models (other models are not aliased here)
			["data","cog2/data"],
			["importerOBJ","cog2/importerOBJ"],
			// external (ext)
			["glMatrix","cog2/ext/glMatrix.js"]
		]
	});

	// Load the framework with the re-configured parameters.
	require(["app"], function(app) {
		
		
		
		app.load();
	});
});
