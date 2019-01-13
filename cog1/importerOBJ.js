/**
 * Initialize the canvas.
 * Render the scene.
 * @namespace cog1
 * @module scene
 */
//define(["exports", "dojo", "dojo/dom-style", "app", "scenegraph", "createScene", "animation", "raster", "shader", "framebuffer", "data", "glMatrix"], //
 //   function (exports, dojo, domStyle, app, scenegraph, createScene, animation, raster, shader, framebuffer, data) {
 //       "use strict";

define(["exports"], //
    function (exports) {
        "use strict";
        
        var filesToImport= [];
        var textures = [];
        var texts = [];
     
        var dates = [];
        
        var ready = false;
        /**
         * Create scene with instances of all models.
         * This should only be done once, also on resize.
         */
        function init(callback) {
            //console.log("scene.init()");
          
          fetch('obj/list.txt')
          .then(response => response.text())
          .then(listText =>
            {
                var rows = listText.split("\n");
                var words = [];
                for (var i = 0; i < rows.length; i++)
                {
                words[i] = rows[i].split(" ");
                filesToImport[i] = words[i][0];
                if (words[i][1]){textures[i]=words[i][1];}
               // console.log(textures[i]);
                }
              //  
                var i = 0;
                function next()
                {
                    //console.log(i);
                     if (i>=filesToImport.length){return parseTexts(callback);}
                     fetch('obj/'+filesToImport[i]+'.obj').
                     then(response => response.text()).
                     then(t => {
                          
                       //   if (i>=filesToImport.length){return parseTexts(callback);}
                        //  else {
                          texts[i]=t;
                          i++;
                          next();
                       //   }
                          });
                    
                }
                
                next();
                
            });
                /*
                var processed=0;
                for (var i=0; i<filesToImport.length;i++)
             {         
                 fetch('obj/'+filesToImport[i]+'.obj')
                .then(response2 => response2.text())
                .then(t => { 
                      alert(i);
                      texts[processed]=t;
                      processed++;
                      //alert(processed + " " + filesToImport.length);
                      if (processed==filesToImport.length)
                       {          
                           ////parse
                           parseTexts(callback);
                           ////               
                       }
                      })
                .then
                (
                    t =>
                    {console.log("hello");
                    }
                )
                
                ;        
             }                                         
            }
          );
          */
          
        }
        
       
        function parseTexts(callback)
        {
       // console.log(texts);
            
         //   if (q>=texts.length){return callback();}
            for (var q=0;q<texts.length;q++)
            {
                  
                     
            var objName = "unnamed";
           
          
           // var objVerticesUV = [];
            var faceIndex = 0;
          
           var v = [];
           var vt = [];
           var p = [];
           var pt = [];
            
           var lines = texts[q].split("\n");
           for (var i=0;i<lines.length;i++)
            {
                var words = lines[i].split(" ");
                var command = words[0];
            
                if (command=="o"){ objName = words[1];}
                
             if (command=="v"){   v.push([parseFloat(words[1]),parseFloat(words[2]),parseFloat(words[3])]);}
             if (command=="vt") { vt.push([parseFloat(words[1]),parseFloat(words[2])]);/*objVerticesUV.push([parseFloat(words[1]),parseFloat(words[2])]);*/}
             if (command=="vn") {
                //ignore --> normals are being calculated
             }
             if (command=="f") {
                p[faceIndex]=[];
                pt[faceIndex]=[];
                
                for (
                     var n=1;n<words.length;n++)
                {
                  
                   var parameter = words[n].split("/");
                   p[faceIndex].push(parseInt(parameter[0])-1);              
            
                 
                   var tmp = parseInt(parameter[1]);
                   if (!isNaN(tmp)) {
                    //vt.push(objVerticesUV[tmp-1]);
                    pt[faceIndex].push(tmp-1);
                    }
                   //console.log(parameter);
                }
              
                faceIndex++;
             }
            }
            
            dates[q]={name:objName,v:v,vt:vt,p:p,pt:pt,tex:textures[q]};
           
            }

           //console.log(dates);  
          callback();
          
        }
        
        function getTexts()
        {
            return texts;
        }
        
         function getDates()
        {
            return dates;
        }
        
     // Public API.
        exports.init = init;
        exports.getTexts = getTexts;
        exports.getDates = getDates;
     
    });
