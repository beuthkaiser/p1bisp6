/**
 * Populate the scene-graph with nodes,
 * calling methods form the scene-graph and node modules.
 * 
 * Texture files have to exist in the "textures" sub-directory.
 * 
 * @namespace cog1
 * @module createScene
 */
define(["exports", "scenegraph", "animation","importerOBJ"], //
    function (exports, scenegraph, animation,importerOBJ) {
        "use strict";

        /**
         * 	Call methods form the scene-graph (tree) module to create the scene.
         *
         */
        function init() {
            
       

          
            // BEGIN exercise myModel
            var myModelNode = scenegraph.createNodeWithModel("king", "king", {
                scale: 200
            });
            myModelNode.rotateTo([-1.6, 0, 0]);
            myModelNode.translate([0, -400, 0]);
     /*
                 var cubeNode = scenegraph.createNodeWithModel("cube", "cube", {
                scale: 100
            }); //300
            cubeNode.rotateTo([1.6, -3.87, 0]);
     
     
            var sphereNode = scenegraph.createNodeWithModel("sphere", "sphere", {
                scale: 200
            });
            
            // END exercise myModel

            //return;

            //var cubeNode = scenegraph.createNodeWithModel("cube", "cube", {scale:100, textureURL:"brickWall.jpg"});		
            var cubeNode1 = scenegraph.createNodeWithModel("cube 1", "cube", {
                scale: 70,
                textureURL: "stoneWall.jpg"
            });
            cubeNode1.translate([50, 200, 0]);
            //cubeNode1.rotate([1,1,1]);
            var cubeNode2 = scenegraph.createNodeWithModel("cube 2", "cube", {
                scale: 50,
                textureURL: "uvTest.jpg"
            });
            cubeNode2.translate([-100, -400, 0]);
            //cubeNode2.rotate([-1,-1,-1]);
            var cubeNode3 = scenegraph.createNodeWithModel("cube procedural texture", "cube", {
                scale: 50,
                textureURL: "sampleProceduralRGB"
            });
            var cubeNode4 = scenegraph.createNodeWithModel("cube six faces texture", "cube", {
                scale: 200,
                textureURL: "OrbitCube.gif",
                sixFacesTexture: true
            });
            var cubeNode5 = scenegraph.createNodeWithModel("cube 3x3 texture", "cube", {
                scale: 50,
                textureURL: "cubeColor.png",
                sixFacesTexture: true
            });
            var cubeNode6 = scenegraph.createNodeWithModel("cube Escher texture", "cube", {
                scale: 200,
                textureURL: "EscherCubeFish.gif",
                sixFacesTexture: true
            });
              cubeNode6.rotateTo([0, 0, 0]);

            var insideOutPolyNode = scenegraph.createNodeWithModel("insideOutPoly", "insideOutPoly",{scale : 1});
          
            var diamondNode = scenegraph.createNodeWithModel("diamond", "diamond");

            var torusNode = scenegraph.createNodeWithModel("torus", "torus");
            var torusNode1 = scenegraph.createNodeWithModel("torus 13", "torus", {
                r2: 50,
                n2: 13,
                color: 8
            });

            var teapotNode = scenegraph.createNodeWithModel("teapot", "teapot", {
                color: 0,
                scale: 40
            });
            var dirtyTeapotNode = scenegraph.createNodeWithModel("dirtyTeapot", "teapot_dirty", {
                color: 8
            });
            
                var cleanTeapotNode = scenegraph.createNodeWithModel("cleanTeapot", "teapot_clean", {
                color: 7
            });
            //teapotNode.rotate([1,1,1]);

            var waltheadNode = scenegraph.createNodeWithModel("walthead", "walthead", {
                color: 8
            });

            var planeNode1 = scenegraph.createNodeWithModel("plane", "plane", {
                scale: 100,
                color: 9,
                textureURL: "land_ocean_ice_2048.jpg"
            });
            
        
                   var planeNode2 = scenegraph.createNodeWithModel("plane2", "plane2", {
                scale: 100,
                color: 9,
                textureURL: "land_ocean_ice_2048.jpg"
            });
            planeNode2.setVisible(false);
            
         
       
            var dates = importerOBJ.getDates();
            var importedNodes = [];
            for (var i =0 ; i <dates.length; i++)
            {
               
                importedNodes[i] = scenegraph.createNodeWithModel(dates[i].name, "import", {
                scale: 10,
                color: 9,
              //  textureURL: "land_ocean_ice_2048.jpg",
                objData: dates[i],
                
                //textureURL: "sampleProceduralRGB"
               // callback: importAllNodesInTheCorrectOrder,
               // callbackParam: ++i
                });
            
            }
        
      
            
            
              
  ////////////////////////////////////////////
  
  //          var emptyNode1 = scenegraph.createNodeWithModel("empty", "empty");
            
            

            // BEGIN exercise Scenegraph		

            // Set parent-child relationships for scene-graph nodes.

            // END exercise Scenegraph		

            // Assign animations.
            // animation.assign(cubeNode, "move");
            // animation.assign(cubeNode1, "move");
            // animation.assign(cubeNode2, "rotate");

            // BEGIN exercise Rotating-Planet-Animation

            // Mind the the order of transformation types get mixed up
            // then traversing the hierarchy in the scene-graph.
            //
            // Animation of a Planet with an also rotation moon or a ring. 
            // The planet rotates around an small sun.        

            // END exercise Rotating-Planet-Animation


            // Set visibility of nodes (hide: set to false).
            // Comment out what you want to see as the default is visible.
            // 

            myModelNode.setVisible(false);
            cubeNode.setVisible(false);
            sphereNode.setVisible(false);
            cubeNode1.setVisible(false);
            cubeNode2.setVisible(false);
            cubeNode3.setVisible(false);
            cubeNode4.setVisible(false);
            cubeNode5.setVisible(false);
            cubeNode6.setVisible(false);
            insideOutPolyNode.setVisible(false);
            diamondNode.setVisible(false);
            torusNode.setVisible(false);
            torusNode1.setVisible(false);
            teapotNode.setVisible(false);
            dirtyTeapotNode.setVisible(false);
            cleanTeapotNode.setVisible(false);
            waltheadNode.setVisible(false);
            planeNode1.setVisible(false);
            
          //  emptyNode1.setVisible(false);
            
            
              var procedural_labyrinthNode = scenegraph.createNodeWithModel("procedural_labyrinth", "procedural_labyrinth", {
                scale: 100
            });
            
            procedural_labyrinthNode.setVisible(false);
            
               var procedural_tree = scenegraph.createNodeWithModel("procedural_tree", "procedural_tree", {
                scale: 50
            });
            procedural_tree.setVisible(false);
             procedural_tree.rotateTo([1.82, 3.12, 0]);
            procedural_tree.translate([200, -150, 0]);
     
                 var procedural_building = scenegraph.createNodeWithModel("procedural_building", "procedural_building", {
                scale: 50
            });
               procedural_building.rotateTo([1.82, 3.12, 0]);
            procedural_building.translate([200, -150, 0]);
            procedural_building.setVisible(false);
            
            */
            
            // Set the initially interactive node [by name].
            // If not set, it is the first node created.
            //scenegraph.setInteractiveNodeByName("sphere");
            //scenegraph.setInteractiveNode(torusNode);

            // Create a node for the light, which is not visible by default.
            var lightnode = scenegraph.createPointLightNode("light", "diamond");

            // Set light parameter.
            // ambientLI, pointLI, pointPos, specularLI, specularLIExpo
            scenegraph.setLights(0.5, 0.6, [200, 200, 300], 4.0, 10);
        }

        // Public API.
        exports.init = init;
    });
