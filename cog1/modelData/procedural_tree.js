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
///treeeeeeeeeeeeeeee
        // Instance of the model to be returned.
        var instance = {};

        instance.vertices = [

		];

        instance.polygonVertices = [
					];


        var divs = 8; // max 21 divisions, not working numbers: 6,
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
        instance.polygonColors = [];

        //bottomFace
        /* for (var i = 0; i < divs - 1; i++) {
            instance.polygonVertices.push(
	        [i + 2, i + 1, 0]
            );

        }

        instance.polygonVertices.push( [0, 1, divs]);
        //*/


        function extrude(points, start, offset, rad = 1, noise = 0) {
            var newVerts = [];
            for (var i = 0; i < points.length; i++) {
                newVerts.push([(points[i][0] + offset[0]) * (rad + Math.random() * noise), (points[i][1] + offset[1]) * (rad + Math.random() * noise), points[i][2] + offset[2]]);
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

        for (var i = 0; i < 6 + Math.random() * 32; i++) {

            extrude(instance.vertices.slice(n, instance.vertices.length), n, [(Math.random() - 0.5) * 0.1, (Math.random() - 0.5) * 0.1, 0.25], 0.9, 0.05);
            n += divs;
            for (var j = 0; j < divs; j++) {
                instance.polygonColors.push(8);
            }

        }

        var barkEnd = instance.polygonVertices.length - 1;


        // instance.polygonColors[instance.polygonColors.length-1]=8;
        extrude(instance.vertices.slice(n, instance.vertices.length), n, [0, 0, 0.25], 4 + Math.random() * 8, .1);
        for (var j = 0; j < divs; j++) instance.polygonColors.push(1);
        n += divs;

        var g = 1.1;
        var steps = Math.random() * 11 + 2;
        var noise = 0.0;
        for (var i = 0; i < steps; i++) {
            if (i == steps - 1) {
                g = 0;
                noise = 0;
            }
            extrude(instance.vertices.slice(n, instance.vertices.length), n, [(Math.random() - 0.5) * 0.01, (Math.random() - 0.5) * 0.01, 0.5], g, noise);
            n += divs;
            for (var j = 0; j < divs; j++) {
                instance.polygonColors.push(1);
            }
            g *= 0.95;
        }





        function extrudeQuad(n, offset, range, color = 8) {
            var va = instance.vertices[instance.polygonVertices[n][0]].slice();
            var vb = instance.vertices[instance.polygonVertices[n][1]].slice();
            var vc = instance.vertices[instance.polygonVertices[n][2]].slice();
            var vd = instance.vertices[instance.polygonVertices[n][3]].slice();


            var ab = [vb[0] - va[0], vb[1] - va[1], vb[2] - va[2]];
            var ac = [vc[0] - va[0], vc[1] - va[1], vc[2] - va[2]];
            var normal = [0, 0, 0];

            normal[0] = -(va[1] * vb[2] - va[2] * vb[1]);
            normal[1] = -(va[2] * vb[0] - va[0] * vb[2]);
            normal[2] = -(va[0] * vb[1] - va[1] * vb[0]);

            function qadd(vec, off) {
                vec[0] += normal[0] * range + off[0];
                vec[1] += normal[1] * range + off[1];
                vec[2] += normal[2] * range + off[2];
            }

            qadd(va, offset);
            qadd(vb, offset);
            qadd(vc, offset);
            qadd(vd, offset);

            instance.vertices.push(va);
            var a = instance.vertices.length - 1;
            instance.vertices.push(vb);
            var b = instance.vertices.length - 1;
            instance.vertices.push(vc);
            var c = instance.vertices.length - 1;
            instance.vertices.push(vd);
            var d = instance.vertices.length - 1;

            /*
            instance.vertices = instance.vertices.concat(va); var a = instance.vertices.length-1;
            instance.vertices = instance.vertices.concat(vb); var b = instance.vertices.length-1;
            instance.vertices = instance.vertices.concat(vc); var c = instance.vertices.length-1;
            instance.vertices = instance.vertices.concat(vd); var d = instance.vertices.length-1;
            */

            instance.polygonVertices.push(
                [instance.polygonVertices[n][1], instance.polygonVertices[n][0], a, b]);
            instance.polygonVertices.push(
                [instance.polygonVertices[n][2], instance.polygonVertices[n][1], b, c]);
            instance.polygonVertices.push(
                [instance.polygonVertices[n][3], instance.polygonVertices[n][2], c, d]);
            instance.polygonVertices.push(
                [instance.polygonVertices[n][0], instance.polygonVertices[n][3], d, a]);

            instance.polygonVertices.push([b, a, d, c]);


            instance.polygonColors.push(8);
            instance.polygonColors.push(8);
            instance.polygonColors.push(8);
            instance.polygonColors.push(8);
            instance.polygonColors.push(8);
        }

        extrude(instance.vertices.slice(n, instance.vertices.length), n, [0, 0, 0], 0, noise);
        instance.polygonColors.push(1);
        instance.polygonColors.push(1);
        instance.polygonColors.push(1);
        instance.polygonColors.push(1);
        instance.polygonColors.push(1);
        instance.polygonColors.push(1);
        instance.polygonColors.push(1);
        instance.polygonColors.push(1);

        if (Math.random() < 0.66)
        {
            extrudeQuad(Math.floor(Math.random() * (barkEnd-10))+10, [0, 0, Math.random()+0.25], Math.random() * 4);
        }

        //instance.vertexNormals = [];
        //instance.polygonNormals = [];
        var i = instance.polygonColors.length;
        while (i <= instance.polygonVertices.length) {
            instance.polygonColors.push(i % 5);
            i++;
        }


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
