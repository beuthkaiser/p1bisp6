/**
 * 3D Data Store for a model.
 * Missing properties/arrays (commented out)
 * are mixed in from data module.
 *  
 * @namespace cog1.data
 * @module king
 */
define(["exports", "data"], function (exports, data) {
    "use strict";

    /**
     * Create an instance of the model defined in this module.
     * 
     * @parameter object with fields:
     * @parameter scale is the edge length of the cube.
     * @returns instance of this model.
     */
    exports.create = function (parameter) {

        if (parameter) {
            var scale = parameter.scale;
            var textureURL = parameter.textureURL;
            // Each face shows a different area of the given texture (e.g, a dice).
            var sixFacesTexture = parameter.sixFacesTexture;
        }
        // Set default values if parameter is undefined.
        if (scale == undefined) {
            scale = 200;
        }
        if (textureURL == undefined) {
            textureURL = "";
        }
        if (sixFacesTexture == undefined) {
            sixFacesTexture = false;
        }

        // Instance of the model to be returned.
        var instance = {};

        instance.vertices = [

		];

        instance.polygonVertices = [
					];


        var divs = 21; // max 21 divisions, not working numbers: 6,
        // divs = 2;
        var s = 2 * Math.PI / divs; //step size
        //create the center point
        instance.vertices.push([0, 0, 0]);
        // pCount++;
        //create the circle points
        for (var d = 0; d < 2 * Math.PI; d += s) {
            instance.vertices.push(
            [Math.cos(d) * 0.5, Math.sin(d) * 0.5, 0]
            );

        }


        //bottomFace
        for (var i = 0; i < divs - 1; i++) {
            instance.polygonVertices.push(
	        [i + 2, i + 1, 0]
            );

        }

        instance.polygonVertices.push(
	        [0, 1, divs]);
        //


        function extrude(points, start, offset, rad = 1) {
            var newVerts = [];
            for (var i = 0; i < points.length; i++) {
                newVerts.push([(points[i][0] + offset[0]) * rad, (points[i][1] + offset[1]) * rad, points[i][2] + offset[2]]);
            }
            //  console.log(newVerts);

            var l = newVerts.length;
            //push array on array does not work for some reason

            instance.vertices = instance.vertices.concat(newVerts);


            // var start = 1;
            //for every new vert a new quad
            for (var i = 0; i < newVerts.length; i++) {
                var a = start + i;
                var b = a + 1;
                var c = start + l + i;
                var d = c + 1;

                //close the face loop
                if (i == newVerts.length - 1) {
                    b = start;
                    d = start + l;

                    instance.polygonVertices.push([a, b, d, c]);
                    return;
                }

                instance.polygonVertices.push([a, b, d, c]);
            }
            return newVerts;

        }

        //here comes the main part of the actual model:
        var n = 1;
        extrude(instance.vertices.slice(n, instance.vertices.length), n, [0, 0, 0.22]);

        n += divs;
        extrude(instance.vertices.slice(n, instance.vertices.length), n, [0, 0, 0], 0.88);

        n += divs;
        extrude(instance.vertices.slice(n, instance.vertices.length), n, [0, 0, 0.27]);

        n += divs;
        extrude(instance.vertices.slice(n, instance.vertices.length), n, [0, 0, 0.11], 0.72);

        n += divs;
        extrude(instance.vertices.slice(n, instance.vertices.length), n, [0, 0, 1.35], 0.75);

        n += divs;
        extrude(instance.vertices.slice(n, instance.vertices.length), n, [0, 0, 0], 1.25);

        n += divs;
        extrude(instance.vertices.slice(n, instance.vertices.length), n, [0, 0, 0.23]);

        n += divs;
        extrude(instance.vertices.slice(n, instance.vertices.length), n, [0, 0, 0], 1.0 / 1.25);

        n += divs;
        extrude(instance.vertices.slice(n, instance.vertices.length), n, [0, 0, 0.11], 0.9);

        n += divs;
        extrude(instance.vertices.slice(n, instance.vertices.length), n, [0, 0, 0.15], 1);

        n += divs;
        extrude(instance.vertices.slice(n, instance.vertices.length), n, [0, 0, 0.16], 1.05);

        n += divs;
        extrude(instance.vertices.slice(n, instance.vertices.length), n, [0, 0, 0.], 1.5);

        n += divs;
        extrude(instance.vertices.slice(n, instance.vertices.length), n, [0, 0, 0.1], 1);

        n += divs;
        extrude(instance.vertices.slice(n, instance.vertices.length), n, [0, 0, 0], 1 / 1.5);

        n += divs;
        extrude(instance.vertices.slice(n, instance.vertices.length), n, [0, 0, 0.2]);


        //cross base vertices
        var d = 0.05;
        var h = instance.vertices[instance.vertices.length - 1][2];
        instance.vertices.push([-d, -d, h]);
        instance.vertices.push([d, -d, h]);
        instance.vertices.push([d, d, h]);
        instance.vertices.push([-d, d, h]);

        instance.vertices.push([0, 0, h]); //hack
        var vl = instance.vertices.length;

        //fake connection to cross
        var vl = instance.vertices.length;
        var middle = [0, 0, h];

        instance.polygonVertices.push([vl - 1 - 1 - 4, vl - divs - 4 -1, vl]);
        for (var i = 2; i <= divs; i++) {
            instance.polygonVertices.push([vl - i - 4, vl, vl - i - 1 - 4]);
        }
        instance.vertices.push(middle);

        var w = 0.05;//size of
        var z = 0.1;
        var f = 0.01;
        var stretch = 0.1;
        var lvl1 = h;
        var lvl2 = lvl1+stretch+stretch;
        var lvl3 = lvl2+stretch;
        var lvl4 = lvl3+stretch;
        
      
        
        //new Cross
        //FRONT
        
        var af=[-w,-f,lvl1]; instance.vertices.push(af);
        var ai = instance.vertices.length-1;
        
        var bf=[+w,-f,lvl1]; instance.vertices.push(bf);
        var bi = instance.vertices.length-1;
        
        var kf=[-w*3,-f,lvl2];instance.vertices.push(kf);
        var ki = instance.vertices.length-1;
        var lf=[-w,-f,lvl2];instance.vertices.push(lf);
        var li = instance.vertices.length-1;
        var cf=[+w,-f,lvl2];instance.vertices.push(cf);
        var ci = instance.vertices.length-1;
        var df=[+w*3,-f,lvl2];instance.vertices.push(df);
        var di = instance.vertices.length-1;
        
        var jf=[-w*3,-f,lvl3];instance.vertices.push(jf);
        var ji = instance.vertices.length-1;
        var iif=[-w,-f,lvl3];instance.vertices.push(iif);
        var ii = instance.vertices.length-1;
        var ff=[+w,-f,lvl3];instance.vertices.push(ff);
        var fi = instance.vertices.length-1;
        var ef=[+w*3,-f,lvl3];instance.vertices.push(ef);
        var ei = instance.vertices.length-1;
        
        var hf=[-w,-f,lvl4];instance.vertices.push(hf);
        var hi = instance.vertices.length-1;
        var gf=[+w,-f,lvl4];instance.vertices.push(gf);
        var gi = instance.vertices.length-1;
       
        instance.polygonVertices.push([ai,bi,ci,li]);
        instance.polygonVertices.push([ki,li,ii,ji]);
        instance.polygonVertices.push([li,ci,fi,ii]);
        instance.polygonVertices.push([ci,di,ei,fi]);
        instance.polygonVertices.push([ii,fi,gi,hi]);
        /**/
        //BACK
        f=-f;
        var ab=[-w,-f,lvl1]; instance.vertices.push(ab);
        var aib = instance.vertices.length-1;
        
        var bb=[+w,-f,lvl1]; instance.vertices.push(bb);
        var bib = instance.vertices.length-1;
        
        var kb=[-w*3,-f,lvl2];instance.vertices.push(kb);
        var kib = instance.vertices.length-1;
        var lb=[-w,-f,lvl2];instance.vertices.push(lb);
        var lib = instance.vertices.length-1;
        var cb=[+w,-f,lvl2];instance.vertices.push(cb);
        var cib = instance.vertices.length-1;
        var db=[+w*3,-f,lvl2];instance.vertices.push(db);
        var dib = instance.vertices.length-1;
        
        var jb=[-w*3,-f,lvl3];instance.vertices.push(jb);
        var jib = instance.vertices.length-1;
        var iib=[-w,-f,lvl3];instance.vertices.push(iib);
        var iib = instance.vertices.length-1;
        var fb=[+w,-f,lvl3];instance.vertices.push(fb);
        var fib = instance.vertices.length-1;
        var eb=[+w*3,-f,lvl3];instance.vertices.push(eb);
        var eib = instance.vertices.length-1;
        
        var hb=[-w,-f,lvl4];instance.vertices.push(hb);
        var hib = instance.vertices.length-1;
        var gb=[+w,-f,lvl4];instance.vertices.push(gb);
        var gib = instance.vertices.length-1;
    
        instance.polygonVertices.push([aib,lib,cib,bib]);
        instance.polygonVertices.push([kib,jib,iib,lib]);
        instance.polygonVertices.push([lib,iib,fib,cib]);
        instance.polygonVertices.push([cib,fib,eib,dib]);
        instance.polygonVertices.push([iib,hib,gib,fib]);
        //TOP
        instance.polygonVertices.push([hi,gi,gib,hib]);
        //LEFT
        instance.polygonVertices.push([aib,ai,li,lib]);
        instance.polygonVertices.push([kib,ki,ji,jib]);
        instance.polygonVertices.push([iib,ii,hi,hib]);
        //LEFTBOTTOM
        instance.polygonVertices.push([lib,li,ki,kib]);
        //RIGHTBOTTOM
        instance.polygonVertices.push([ci,cib,dib,di]);
        //LEFTTOP
        instance.polygonVertices.push([ii,iib,jib,ji]);
        //RIGHTTOP
        instance.polygonVertices.push([fib,fi,ei,eib]);
        //RIGHT
        instance.polygonVertices.push([bib,cib,ci,bi]);
        instance.polygonVertices.push([dib,eib,ei,di]);
        instance.polygonVertices.push([fib,gib,gi,fi]);

        /* 
        for (var i = (vl - 4 - divs); i < (vl - 1 - 4); i++) {

            var corner = vl - 3;

            var center = [
                0.5 * instance.vertices[i + 1][0] + 0.5 * instance.vertices[i][0],
                0.5 * instance.vertices[i + 1][1] + 0.5 * instance.vertices[i][1],
                0.5 * instance.vertices[i + 1][2] + 0.5 * instance.vertices[i][2]
            ];


            if (center[0] <= 0 && center[1] <= 0) {
                corner = vl - 4;
            } else if (center[0] > 0 && center[1] <= 0) {
                corner = vl - 3;
            } else if (center[0] > 0 && center[1] > 0) {
                corner = vl - 2;
            } else if (center[0] <= 0 && center[1] > 0) {
                corner = vl - 1;
            }


            instance.polygonVertices.push([i, i + 1, corner]);
        }
*/

        /*
        vl-=vertices.length-2; // because of middle
        var h = 0.15;
        extrude(instance.vertices.slice(vl - 4, vl), vl - 4, [0, 0, h]);

        var b = [vl - 4, vl - 3, vl - 2, vl - 1, ];
        var t = [b[0] + 4, b[1] + 4, b[2] + 4, b[3] + 4];
        extrude(instance.vertices.slice(vl - 4, vl), vl - 4, [0, 0, h]);

        extrude(instance.vertices.slice(vl - 4, vl), vl - 4, [0, 0, h]);
        */
/*
        //highest top face of cross
        instance.polygonVertices.push([
            instance.vertices.length - 4, instance.vertices.length - 3, instance.vertices.length - 2, instance.vertices.length - 1]);

        function vertCopy(sourceIndex, x) {
            instance.vertices.push([
            instance.vertices[sourceIndex][0] + x, instance.vertices[sourceIndex][1], instance.vertices[sourceIndex][2]]);

        }
        //RIGHT CUBE
        var width = 0.1;
        vertCopy(b[1], width);
        vertCopy(b[2], width);
        vl = instance.vertices.length;
        instance.polygonVertices.push([b[1], b[2], vl - 1, vl - 2]);

        vertCopy(t[1], width);
        vertCopy(t[2], width);
        vl = instance.vertices.length;
        instance.polygonVertices.push([t[1], t[2], vl - 1, vl - 2]);

        instance.polygonVertices.push([b[1], t[1], vl - 2, vl - 4]);
        instance.polygonVertices.push([t[2], b[2], vl - 3, vl - 1]);

        instance.polygonVertices.push([vl - 1, vl - 2, vl - 4, vl - 3]);
        /* */
        //LEFT CUBE
        /*
                vertCopy(b[0], -width);
                vertCopy(b[3], -width);
                vl = instance.vertices.length;
                instance.polygonVertices.push([b[0], b[3], vl - 1, vl - 2]);

                vertCopy(t[0], -width);
                vertCopy(t[3], -width);
                vl = instance.vertices.length;
                instance.polygonVertices.push([t[3], t[0], vl - 2, vl - 1]);
                instance.polygonVertices.push([t[0], b[0], vl - 4, vl - 2]);

                instance.polygonVertices.push([b[3], t[3], vl - 1, vl - 3]);

                instance.polygonVertices.push([vl - 2, vl - 1, vl - 3, vl - 4]);

                vl = instance.vertices.length;


                //instance.polygonVertices.push([b[0],b[1],vl-1,vl-2]);

                //   console.log(instance.vertices);
                // Use default colors, implicitly.
                // instance.colors = data.colors;
        /* */
        // Corners of the faces have to fit the texture coordinates.			
        // Faces: bottom/down, top/up, front, right, back, left. 
        instance.polygonColors = [];

        var i = instance.polygonColors.length;
        while (i <= instance.polygonVertices.length) {
            instance.polygonColors.push(i % 5);
            i++;
        }


        //instance.vertexNormals = [];
        //instance.polygonNormals = [];

        if (!sixFacesTexture) {
            // Use default texture coordinates.
            // instance.textureCoord = [];	
            // For order of corners of faces, see polygonVertices.
            /*instance.polygonTextureCoord = [
            	[1,2,3,0],
            	[1,2,3,0],
            	[1,0,3,2],
            	[3,0,1,2],
            	[3,0,1,2],
            	[3,0,1,2]
            ];*/
        } else {
            // BEGIN exercise Cube-Dice-Texture

            // Order 0 to 16 form bottom-left to top-right
            // line by line, indices in spatial order:
            instance.textureCoord = [];
            // ...

            // Use textureCoord in order given for textureCoord.
            // The order of corners of faces must fit the one given in polygonVertices.
            // Match orientation of face given for polygonVertices.
            // D=bottom/down, U=top/up, F=front, R=right, B=back, L=left
            // The mapping is explained on the texture image.
            // instance.polygonTextureCoord = [ ....];

            // END exercise Cube-Dice-Texture			
        }

        instance.textureURL = textureURL;

        data.applyScale.call(instance, scale);


        return instance;
    };
});
