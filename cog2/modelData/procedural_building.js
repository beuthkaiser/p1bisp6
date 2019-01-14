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
            scale = 1;
        }
        if (textureURL == undefined) {
            textureURL = "";
        }

        if (color == undefined) {
            color = 8;
        }

        // Instance of the model to be returned.
        var instance = {};
        instance.vertices = [];
        instance.polygonVertices = [];
        instance.polygonColors = [];

        //define tile map
        var h = 15;
        var w = 15;
        var d = 13;

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
                    // tileMap[x][y][z] = ((Math.random()<0.5)) ? 0 : 1;

                    tileMap[x][y][z] = -1;

                    // if (Math.random()<0.4) {tileMap[x][y][z] = -1;}
                }
       
      //  tileMap[0][0][0] = 0;
    //    tileMap[0][1][0] = 0;
      //  tileMap[1][1][2] = 0;
    //     tileMap[2][1][1] = 0;
    //     tileMap[1][2][1] = 1;
    //     tileMap[1][3][1] = 0;
         
        
        //rooms
        var use = 2 + Math.floor(Math.random() * 5);
        while (use > 0) {
            //make room
            var xStart = Math.floor(Math.random() * (w - 5));
            var yStart = Math.floor(Math.random() * (h - 5));
            var xEnd = Math.min(xStart + 4 + Math.random() * 4, w - 1);
            var yEnd = Math.min(yStart + 4 + Math.random() * 4, h - 1);

            for (var x = xStart; x < xEnd; x++)
                for (var y = yStart; y < yEnd; y++) {
                    tileMap[x][y][0] = 0;
                }

            use--;
        }
        //walls
        for (var x = 0; x < w; x++)
            for (var y = 0; y < h; y++) {
                //for every groundpiece
                if (tileMap[x][y][0] == 0) {
                    //check if it is next to an empty wall
                    if (x == 0 || y == 0 || x == w - 1 || y == h - 1 || tileMap[x - 1][y - 1][0] == -1 ||
                        tileMap[x - 1][y + 1][0] == -1 ||
                        tileMap[x + 1][y - 1][0] == -1 ||
                        tileMap[x + 1][y + 1][0] == -1) {
                        //if yes grow wall
                        for (var z = 1; z < d; z++) {
                            tileMap[x][y][z] = 0;
                        }

                    }
                }
            }

        //doors 
        for (var x = 1; x < w - 1; x++)
            for (var y = 1; y < h - 1; y++) {
                if (tileMap[x][y][1] == 0)
                    if (tileMap[x - 1][y][1] == 0 && tileMap[x + 1][y][1] == 0) {
                        tileMap[x][y][1] = -1;
                        tileMap[x][y][2] = -1;
                    }


            }

        //windows
        var random = 3 + Math.floor(Math.random() * 5);
        for (var x = 0; x < w; x++)
            for (var y = 0; y < h; y++)
                for (var z = 4; z < h - random; z++) {
                    if (tileMap[x][y][z] == 0 &&
                        (x % 2 == 0 || y % 2 == 0) &&
                        z % 2 == 0) {
                        tileMap[x][y][z] = 1;
                        //   if  (Math.random()<0.05){tileMap[x][y][z]=-1;}
                    }
                }

        //floors
        for (var x = 0; x < w; x++)
            for (var y = 0; y < h; y++)
                for (var z = 5; z < h - 2; z += 2) {
                    if (tileMap[x][y][0] == 0) {
                        tileMap[x][y][z] = 0;
                    }
                }

        //stairs

        for (var x = 0; x < w; x++)
            for (var y = 0; y < h; y++)
                for (var z = 5; z < h - 1; z += 5) {
                    if (tileMap[x][y][0] == 0 && tileMap[x][y][1] == -1) {
                        if (tileMap[x][y + 1][0])
                            tileMap[x][y + 1][0] = 2;
                    }
                }

        //walls inside
        for (var x = 0; x < w; x++)
            for (var y = 0; y < h; y++)
                for (var z = 6; z < h - 4; z += 2) {
                    if (tileMap[x][y][0] == 0 && tileMap[x][y][z] == -1) {
                        if (Math.random() < 0.3) {
                            tileMap[x][y][z] = 3;
                            if (Math.random() < 0.5) tileMap[x][y][z] = 4;
                        }
                    }
                }

        //roof
        for (var x = 0; x < w; x++)
            for (var y = 0; y < h; y++) {
                if (tileMap[x][y][0] == 0 && tileMap[x][y][d - 1] == -1) {
                    // tileMap[x][y][d-1] = 3;
                    // if (Math.random()<0.5) tileMap[x][y][d-1] = 4;
                    if (Math.random() < 0.02) tileMap[x][y][d - 1] = 1;
                }
            }

        ///////////////////////
        //define tiles
        var tilesVert = [];
        var tilesPoly = [];
        var tilesPolyUDNOSW = [];
        var tilesUDNOSW = [];
        var tilesColor = [];

        //cubeTile
        var v = [
			// bottom (y=-1)
			[0, 0, 1],
			[1, 0, 1],
			[1, 0, 0],
			[0, 0, 0],
			// top (y=+1)		
			[0, 1, 1],
			[1, 1, 1],
			[1, 1, 0],
			[0, 1, 0],
		];

        var p = [
            [3, 2, 1, 0],
			[4, 5, 6, 7],
			[4, 0, 1, 5],
			[1, 2, 6, 5],
			[6, 2, 3, 7],
			[3, 0, 4, 7]];

        tilesVert.push(v);
        tilesPoly.push(p);
        tilesUDNOSW.push([1, 1, 1, 1, 1, 1]);
        tilesColor.push([8, 8, 7, 7, 7, 7]);
        tilesPolyUDNOSW.push([1, 0, 2, 3, 4, 5]);
        //iTile
        var v = [
			// bottom (y=-1)
			[0.4, 0.4, 1],
			[0.6, 0.4, 1],
			[0.6, 0.4, 0],
			[0.4, 0.4, 0],
			// top (y=+1)		
			[0.4, 0.6, 1],
			[0.6, 0.6, 1],
			[0.6, 0.6, 0],
			[0.4, 0.6, 0],
		];

        var p = [[3, 2, 1, 0],
			[4, 5, 6, 7],
			[4, 0, 1, 5],
			[1, 2, 6, 5],
			[6, 2, 3, 7],
			[3, 0, 4, 7]];

        tilesVert.push(v);
        tilesPoly.push(p);
        tilesUDNOSW.push([0, 0, 0, 0, 0, 0]);
        tilesColor.push([8, 8, 7, 7, 7, 7]);
        tilesPolyUDNOSW.push([-1, -1, -1, -1, -1, -1]);
        // \ Tile in y-direction
        var v = [
			// bottom (y=-1
			[0, 0, 1],
			[1, 0, 1],
			[1, 0, 0],
			[0, 0, 0],
			// top (y=+1)		
			[0, 1, 0],
			[1, 1, 0],
			[1, 1, 0],
			[0, 1, 0],
		];

        var p = [[3, 2, 1, 0],
			[4, 5, 6, 7],
			[4, 0, 1, 5],
			[1, 2, 6, 5],
			[6, 2, 3, 7],
			[3, 0, 4, 7]];

        tilesVert.push(v);
        tilesPoly.push(p);
        tilesUDNOSW.push([0, 0, 0, 0, 0, 0]);
        tilesColor.push([8, 8, 7, 7, 7, 7]);
        tilesPolyUDNOSW.push([-1, -1, -1, -1, -1, -1]);

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
                [3, 2, 1, 0],
                 [4, 5, 6, 7],
                 [0, 1, 5, 4],
                 [1, 2, 6, 5],
                 [2, 3, 7, 6],
                 [3, 0, 4, 7]
			];
        tilesColor.push([8, 8, 7, 7, 7, 7]);
        tilesPolyUDNOSW.push([-1, -1, -1, -1, -1, -1]);


        tilesVert.push(v);
        tilesPoly.push(p);
        tilesUDNOSW.push([0, 0, 0, 0, 0, 0]);

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
                [3, 2, 1, 0],
                 [4, 5, 6, 7],

                [0, 1, 5, 4],
                 [1, 2, 6, 5],
                 [2, 3, 7, 6],
                 [3, 0, 4, 7]
			];

        tilesVert.push(v);
        tilesPoly.push(p);
        tilesUDNOSW.push([0, 0, 0, 0, 0, 0]);
        tilesColor.push([8, 8, 7, 7, 7, 7]);
        tilesPolyUDNOSW.push([-1, -1, -1, -1, -1, -1]);

        //apply
        var i; //index shorthand
        var offset;

        for (var x = 0; x < w; x++)
            for (var y = 0; y < h; y++)
                for (var z = 0; z < d; z++) {
                    i = tileMap[x][y][z];
                    if (i >= 0) {

                        //skip tiles that are not visible
                        if (x == 0 || x >= w - 1 ||
                            y == 0 || y >= h - 1 ||
                            z == 0 || z >= d - 1) {} else {
                            //console.log(x+" " + y+" " + z);
                            //console.log(tileMap[x][y][z]);
                            // if (>= 0) console.log(tilesUDNOSW[tileMap[x][y][z+1]][4]);

                            if (tileMap[x][y + 1][z] >= 0)
                                if (tilesUDNOSW[tileMap[x][y + 1][z]][0] == true)
                                    if (tileMap[x][y - 1][z] >= 0)
                                        if (tilesUDNOSW[tileMap[x][y - 1][z]][1] == true)
                                            if (tileMap[x][y][z + 1] >= 0)
                                                if (tilesUDNOSW[tileMap[x][y][z + 1]][2] == true)
                                                    if (tileMap[x + 1][y][z] >= 0)
                                                        if (tilesUDNOSW[tileMap[x + 1][y][z]][3] == true)
                                                            if (tileMap[x][y][z - 1] >= 0)
                                                                if (tilesUDNOSW[tileMap[x][y][z - 1]][4] == true)
                                                                    if (tileMap[x - 1][y][z] >= 0)
                                                                        if (tilesUDNOSW[tileMap[x - 1][y][z]][5] == true)

                            {
                                continue;
                            }

                        }

                        v = []; 
                        p = []; 
                        var c = [];

                        // push all of the tiles vertices;
                        for (var a = 0; a < tilesVert[i].length; a++) {
                            v.push(
                            [
                             tilesVert[i][a][0] + x,
                             tilesVert[i][a][1] + y,
                             tilesVert[i][a][2] + z
                            ]);
                        }

                        // push all of the tiles faces
                        var offset = instance.vertices.length;
                        var a = 0;
                        
                        for (var qq = 0; qq < tilesPoly[i].length; qq++) {

                            var skip = false;
                            //if (qq % 2 == 0) {skip = true;}
                            // console.log(tilesPolyUDNOSW[i][qq]);
                            
                            ////////////////////////////////////////////////////////
                            // face is up  
                            function isFilledFacing(x,y,z,facing)
                            {
                                 if (x>=0)if (y>=0)if (z>=0)
                                     if (x<w) if (y<h) if (z<d)
                                     if (tileMap[x][y][z]>=0)
                                         if (tilesUDNOSW[tileMap[x][y][z]][facing]==1)
                                         
                                         return true;
                                return false;
                            }
                            
                            if (tilesPolyUDNOSW[i][qq] == 0) {
                              skip=isFilledFacing(x,y+1,z,1);
                            }
                            if (tilesPolyUDNOSW[i][qq] == 1) {
                              skip=isFilledFacing(x,y-1,z,0);
                            }
                            if (tilesPolyUDNOSW[i][qq] == 2) {
                              skip=isFilledFacing(x,y,z+1,4);
                            }
                            if (tilesPolyUDNOSW[i][qq] == 3) {
                              skip=isFilledFacing(x+1,y,z,5);
                            }
                            if (tilesPolyUDNOSW[i][qq] == 4) {
                              skip=isFilledFacing(x,y,z-1,2);
                            }
                            if (tilesPolyUDNOSW[i][qq] == 5) {
                              skip=isFilledFacing(x-1,y,z,3);
                            }
                            
                         
                           /////////////////////////////////////////////////////////

                            if (!skip) {
                               
                                var currentPolygon = p.length;
                                p[currentPolygon] = [];

                                for (var b = 0; b < tilesPoly[i][a].length; b++) {
                                    p[currentPolygon].push(tilesPoly[i][a][b] + offset);
                                    //c[currentPolygon].push()
                                   
                                }
                             //   color=a;
                             
                             //   console.log(tilesColor[i]);
                              
                                 instance.polygonColors.push(tilesColor[i][a]); 
                             
                               //   instance.polygonColors.push(tilesColor[i][color]);                     
                            
                            }
                             a += 1;
                          
                             
                        }
                     
                          instance.polygonVertices = instance.polygonVertices.concat(p);
                        instance.vertices = instance.vertices.concat(v);
                        ////fill colors if missing               
                       /* var i = instance.polygonVertices.length;
                        while (i <= instance.polygonVertices.length) {
                            instance.polygonColors.push(i % 5);
                            i++;
                        }*/
                        //////
                    }
                }

        instance.polygonNormals = [];
        instance.vertexNormals = [];
        instance.textureURL = textureURL;
        //data.setColorForAllPolygons.call(instance, color);

        ///////
        data.applyScale.call(instance, scale);

        var i = instance.polygonColors.length;
        while (i <= instance.polygonVertices.length) {
            instance.polygonColors.push(i % 5);
            i++;
        }
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
    var originalVerticesCount = instance.vertices.length;
    var unusedVerticesCount = 0;

    //functions for comparison of vertices
    function distance(a, b) {
        return Math.sqrt(Math.pow(v[b][0] - v[a][0], 2) +
            Math.pow(v[b][1] - v[a][1], 2) +
            Math.pow(v[b][2] - v[a][2], 2));
    }
    var epsilon = 0.0;

    function isSame(a, b) {
        if (epsilon == 0) {
            return (v[a][0] == v[b][0] &&
                v[a][1] == v[b][1] &&
                v[a][2] == v[b][2]);
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
        console.log("Error: vertice " + vertSearched + " searched for not in bucket");
    }

    // console.log(findInBucket(25));

    //update poly
    //console.log(p);

    for (var e = 0; e < p.length; e++) {

        for (var r = 0; r < p[e].length; r++) {

            p[e][r] = findInBucket(p[e][r]);
        }
    }

    instance.poly = p;
    //console.log(p);
    /////////////////////////////////////////////////////////////


    console.log("Removed " + unusedVerticesCount + " unused vertices.");
    console.log("Merged " + ((originalVerticesCount - instance.vertices.length) - unusedVerticesCount) + " vertices using an epsilon of " + epsilon + ".");
    /* */

}
