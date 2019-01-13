/**
 *  used to import external model data
 * 
 * @namespace cog1.data
 * @
 */

define(["exports", "data"], function(exports, data)
       {
	"use strict";

	/**
	 * Create an instance of the model defined in this module.
	 * 
	 * @parameter object with fields:
	 * @parameter scale is the edge length of the cube.
	 * @parameter color 
	 * 
	 * @returns instance of this model.
	 */
	exports.create = function(parameter) {
	
		if(parameter) {
			var scale = parameter.scale;
			var color = parameter.color;
			var textureURL = parameter.textureURL;
			var obj = parameter.objData;
			//var callback = parameter.callback;
			//var callbackParam = parameter.callbackParam;
			
		}
		//console.log(callback);
		// Set default values if parameter is undefined.
		if(scale == undefined){
			scale = 200;
		}
		if(color == undefined) {
			color = 9;
		}
		
		if(textureURL == undefined){
			textureURL = obj.tex;
		}
		if(textureURL == undefined){
			textureURL = "";
		}

		// Instance of the model to be returned.
		var instance = {};
        instance.vertices = obj.v;
		instance.polygonVertices = obj.p;	
        instance.textureCoord = obj.vt;
		instance.polygonTextureCoord = obj.pt;
	    //if(instance.textureCoord.length>0) {instance.polygonTextureCoord = obj.p;}
		instance.polygonColors = [];
		instance.vertexNormals = [];
		instance.polygonNormals = [];
		instance.textureURL = textureURL;

		data.applyScale.call(instance, scale);    
        
            //fill colors if missing       
            var x = instance.polygonColors.length;
            while (x <= instance.polygonVertices.length) {
            instance.polygonColors.push(x % 5);
            x++;
            }
            //
        instance.textureURL = textureURL;

		
        
		
        data.applyScale.call(instance, scale);
 
    console.log(instance);
     return instance;

				
	} 	
});