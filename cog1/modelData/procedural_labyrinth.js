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
            var color = parameter.color;
            var textureURL = parameter.textureURL;
        }

        // Set default values if parameter is undefined.
        if (scale == undefined) {
            scale = 100;
        }
        if (textureURL == undefined) {
            textureURL = "";
        }

        if (color == undefined) {
            color = 9;
        }

        // Instance of the model to be returned.
        var instance = {};
        instance.vertices = [];
        instance.polygonVertices = [];


        //define tile map
        var h = 10;
        var w = 10;
        var d = 1;

        var tileMap = new Array(w);
        for (var x = 0; x < w; x++) {
            tileMap[x] = new Array(h);
            for (var y = 0; y < h; y++) {
                tileMap[x][y] = new Array(d);
            }
        }


        for (var x = 0; x < w; x++)
            for (var y = 0; y < h; y++)
                for (var z = 0; z < d; z++) {
                    tileMap[x][y][z] = ((Math.random()<0.5)) ? 0 : 1;
                 // tileMap[x][y][z] = 0;
                 
                   // if (Math.random()<0.4) {tileMap[x][y][z] = -1;}
                }

        ///////////////////////
        //define tiles
        var tilesVert = [];
        var tilesPoly = [];
        var tilesUDNOSW = [];
        
        //  RslashTile
        var v = [
			// bottom 
			[-0.2, 0, 0],
			[+0.2, 0, 0],
			[1.2, 1, 0],
			[0.8, 1, 0],
            
            // top 
			[-0.2, 0, 1],
			[+0.2, 0, 1],
			[1.2, 1, 1],
			[0.8, 1, 1]
          
		
          
		];

        var p = [
                [3,2,1,0],
                 [4,5,6,7],
                 
                [0,1,5,4],
                 [1,2,6,5],
                 [2,3,7,6],
                 [3,0,4,7]
			];

        
        
        tilesVert.push(v);
        tilesPoly.push(p);
        tilesUDNOSW.push([0,0,0,0,0,0]);
        
              //  LslashTile
        var v = [
			// bottom (y=-1)
			[0.8, 0, 0],
			[1.2, 0, 0],
			[0.2, 1, 0],
			[-0.2, 1, 0],
            
            	// top (y=-1)
			[0.8, 0, 1],
			[1.2, 0, 1],
			[0.2, 1, 1],
			[-0.2, 1, 1],
          
		
          
		];

         var p = [
                [3,2,1,0],
                 [4,5,6,7],
                 
                [0,1,5,4],
                 [1,2,6,5],
                 [2,3,7,6],
                 [3,0,4,7]
			];
        
        tilesVert.push(v);
        tilesPoly.push(p);
        tilesUDNOSW.push([0,0,0,0,0,0]);
        
        
        /*
         //  RslashTile
        var v = [
			// bottom (y=-1)
			[0, 0, 0],
			[0.2, 0, 0],
			[1, 0.8, 0],
			[1, 1, 0],
            [0.8, 1, 0],
            [0, 0.2, 0],
			// top (y=+1)
            [0, 0, 1],
			[0.2, 0, 1],
			[1, 0.8, 1],
			[1, 1, 1],
            [0.8, 1, 1],
            [0, 0.2, 1]
          
		];

        var p = [[0, 1, 2, 3,4,5],
                 [6,7,8,9,10,11]
			];

        
        
        tilesVert.push(v);
        tilesPoly.push(p);
        tilesUDNOSW.push([0,0,0,0,0,0]);
        
              //  LslashTile
        var v = [
			// bottom (y=-1)
			[1, 0, 0],
			[1, 0.2, 0],
			[0.2, 1, 0],
			[0, 1, 0],
            [0, 0.8, 0],
            [0.8, 0, 0]
			// top (y=+1)		
          
		];

        var p = [[0, 1, 2, 3,4,5]
			];

        
        
        tilesVert.push(v);
        tilesPoly.push(p);
        tilesUDNOSW.push([0,0,0,0,0,0]);
        
        
/*
        //  RslashTile
        var v = [
			// bottom (y=-1)
			[0, 0, 1],
			[0.5, 0, 1],
			[0.5, 0, 0],
			[0, 0, 0],
			// top (y=+1)		
			[0.5, 1, 1],
			[1, 1, 1],
			[1, 1, 0],
			[0.5, 1, 0],
		];

        var p = [[3, 2, 1, 0],
			[4, 5, 6, 7],
			[4, 0, 1, 5],
			[1, 2, 6, 5],
			[6, 2, 3, 7],
			[3, 0, 4, 7]];

        var udnosw
        
        tilesVert.push(v);
        tilesPoly.push(p);
        tilesUDNOSW.push([0,0,0,0,0,0]);
        
                //  LslashTile
        var v = [
				// bottom (y=-1)
			[0.5, 0, 1],
			[1, 0, 1],
			[1, 0, 0],
			[0.5, 0, 0],
			// top (y=+1)		
			[0, 1, 1],
			[0.5, 1, 1],
			[0.5, 1, 0],
			[0, 1, 0],
		];

        var p = [[3, 2, 1, 0],
			[4, 5, 6, 7],
			[4, 0, 1, 5],
			[1, 2, 6, 5],
			[6, 2, 3, 7],
			[3, 0, 4, 7]];

        var udnosw
        
        tilesVert.push(v);
        tilesPoly.push(p);
        tilesUDNOSW.push([0,0,0,0,0,0]);
*/
        //apply

        var i; //index shorthand
        var offset;

        for (var x = 0; x < w; x++)
            for (var y = 0; y < h; y++)
                for (var z = 0; z < d; z++) {
                    i = tileMap[x][y][z];
                    if (i >= 0) {
                        
                        //skip tiles that are not visible
                        if (x==0 || x >= w-1
                       || y==0 || y >= h-1
                        || z==0 || z >= d-1){}
                        else
                            {
                                //console.log(x+" " + y+" " + z);
                            //console.log(tileMap[x][y][z]);
                            // if (>= 0) console.log(tilesUDNOSW[tileMap[x][y][z+1]][4]);
                           
                  
                        if (tileMap[x][y+1][z]>= 0) if (tilesUDNOSW[tileMap[x][y+1][z]][0]==true)
                         if (tileMap[x][y-1][z]>= 0)  if (tilesUDNOSW[tileMap[x][y-1][z]][1]==true) 
                         if (tileMap[x][y][z+1]>= 0)  if (tilesUDNOSW[tileMap[x][y][z+1]][2]==true) 
                         if (tileMap[x+1][y][z]>= 0)  if (tilesUDNOSW[tileMap[x+1][y][z]][3]==true) 
                          if (tileMap[x][y][z-1]>= 0) if (tilesUDNOSW[tileMap[x][y][z-1]][4]==true) 
                          if (tileMap[x-1][y][z]>= 0) if (tilesUDNOSW[tileMap[x-1][y][z]][5]==true) 
                            /* */                
                        {continue;}
                        //
                     }
                        
                        v = []; //tilesVert[i].slice();
                        p = []; //tilesPoly[i].slice();
                        // debugger;
                        for (var a = 0; a < tilesVert[i].length; a++) {
                            v.push(
                            [
                             tilesVert[i][a][0] + x, 
                             tilesVert[i][a][1] + y,
                             tilesVert[i][a][2] + z
                            ]);
                        }

                       
                        for (var a = 0; a < tilesPoly[i].length; a++) {
                            
                            p[a] = [];
                            for (var b = 0; b < tilesPoly[i][a].length; b++) {
                                
                                 offset = instance.vertices.length;
                                p[a].push(tilesPoly[i][a][b] + offset);
                            }
                        }

                        instance.polygonVertices = instance.polygonVertices.concat(p);
                        instance.vertices = instance.vertices.concat(v);
                      

                    }
                }
        /*
        
		// Vertex indices:							
		//   7----6
		//	/|   /|
		// 4----5 |
		// | 3--|-2
		// |/   |/
		// 0----1
		instance.vertices = [
			// bottom (y=-1)
			[-1,-1, 1],
			[ 1,-1, 1],
			[ 1,-1,-1],
			[-1,-1,-1],
			// top (y=+1)		
			[-1,1, 1],
			[ 1,1, 1],
			[ 1,1,-1],
			[-1,1,-1],
		];
		// Use default colors, implicitly.
		// instance.colors = data.colors;

		// Corners of the faces have to fit the texture coordinates.			
		// Faces: bottom/down, top/up, front, right, back, left. 
		instance.polygonVertices = [
			[3,2,1,0],
			[4,5,6,7],
			[4,0,1,5],
			[1,2,6,5],
			[6,2,3,7],
			[3,0,4,7]
		];	

		//instance.polygonColors = [0,1,2,3,4,5];
		*/

        instance.polygonNormals = [];
        instance.textureURL = textureURL;
        data.setColorForAllPolygons.call(instance, color);
        data.applyScale.call(instance, scale);

        cleanData(instance);

        return instance;
    };
});


/**
recycles cleanData exercise
*/
function cleanData(instance) {

     

        var v = instance.vertices;
        var p = instance.polygonVertices;

        //count variables (purely for logging purposes)
        var originalVerticesCount= instance.vertices.length;
        var unusedVerticesCount=0;
        
        //functions for comparison of vertices
        function distance(a, b) {
            return Math.sqrt(Math.pow(v[b][0] - v[a][0], 2) +
                Math.pow(v[b][1] - v[a][1], 2) +
                Math.pow(v[b][2] - v[a][2], 2));
        }
        var epsilon = 0.0;

        function isSame(a, b) {
            if (epsilon==0){
                return (v[a][0]==v[b][0] &&
                       v[a][1]==v[b][1] &&
                       v[a][2]==v[b][2]);
            }
            return (distance(a, b) <= epsilon)
        }
        //////////////////////////////////////

        //special case: remove vertices never used in polygons
        //console.log(v);

        checkNext: for (var i = 0; i < v.length; i++) {
            for (var e = 0; e < p.length; e++)
                for (var r = 0; r < p[e].length; r++) {
                    if (p[e][r] == i) {
                        continue checkNext;
                    } //vertex is used
                }
            //console.log("Vertice[" + i + "] is never used.")
            unusedVerticesCount++;
            v[i] = null; //vertex is not used
        }
        //console.log(v);
        
        ///////////////////////////////////////////////////////

        // creation of a bucket list, which groups equal vertices
        // index of bucket will be new vertex index
        var bucket = [];

        for (var a = 0; a < v.length; a++) {
            var row = [];
            row.push(a);
            if (v[a] == null) {
                continue; //skip already processed vertices
            } 
            for (var b = a + 1; b < v.length; b++) {
                
                if (v[b] == null) {
                    continue; //skip already processed vertices
                } 
                if (isSame(a, b)) {
                    row.push(b);
                    v[b] = null; //mark as processed 
                }
            }

            bucket.push(row);
        }
        //console.log("bucket:");
        //console.log(bucket);
      
        //////////////////////////////////////////

        // creation of new VertexData/////////////
        var newVert = [];
        for (var i = 0; i < bucket.length; i++) {
            newVert.push(v[bucket[i][0]]); //the first bucketItem of each row is representative for all the other vertices in the row
        }
        //console.log(newVert);
        //apply
        instance.vertices = newVert;
        
        //////////////////////////////////////////

        //update the polygons according to the bucket
        //function findInBucket returns the index at which the vertex was found
        function findInBucket(vertSearched) {
            for (var y = 0; y < bucket.length; y++)
                for (var x = 0; x < bucket[y].length; x++) {
                    if (bucket[y][x] == vertSearched) {
                        return y;
                    }

                }
            //should never occur, the bucket needs to contain info for all used vertices
            console.log("Error: vertice " +vertSearched+ " searched for not in bucket");
        }

       // console.log(findInBucket(25));
        
        //update poly
        //console.log(p);
        
        for (var e = 0; e < p.length; e++)
            {
                
            for (var r = 0; r < p[e].length; r++) {
                
                p[e][r] = findInBucket(p[e][r]);
            }
            }
    
        instance.poly = p;
        //console.log(p);
        /////////////////////////////////////////////////////////////


        console.log ("Removed "+ unusedVerticesCount + " unused vertices.");
        console.log ("Merged "+ ((originalVerticesCount-instance.vertices.length)-unusedVerticesCount) + " vertices using an epsilon of "+epsilon+".");
       /* */

    }
