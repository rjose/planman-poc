// This is a proof of concept for Planman. All we want to do is draw
// a couple of rectangles on screen. I'm going to follow the structure
// of backbone.js.


(function() {

    var root = this;
    var SVG_NS = "http://www.w3.org/2000/svg";
    
    // TODO: Save previoius value of Planman if we need to
    
    // This sets up a Planman variable in the root namespace
    var Planman;
    if (typeof exports !== 'undefined') {
        Planman = exports;
    }
    else {
        Planman = root.Planman = {};
    }
    
    // TODO: Add a version

    // This function should be called once the page is finished loading. It sets up the svg
    // element in the viewer and then draws the rectangles.
    Planman.init = function() {
        console.log("Initialize!");
        var svgViewer = document.createElementNS(SVG_NS, "svg");
        svgViewer.width = 200;
        svgViewer.height = 400;
        var viewer = document.getElementById("viewer");
        viewer.appendChild(svgViewer);
        
        // Create a rectangle
        var rect1 = document.createElementNS(SVG_NS, "rect");
        rect1.width.baseVal.value = 50;
        rect1.height.baseVal.value = 30;
        console.dir(rect1);
        rect1.style.fill = "blue";
        svgViewer.appendChild(rect1);
        
        // Create second rectangle
        var rect2 = document.createElementNS(SVG_NS, "rect");
        rect2.x.baseVal.value = 40;
        rect2.y.baseVal.value = 50;
        rect2.width.baseVal.value = 50;
        rect2.height.baseVal.value = 30;
        console.dir(rect2);
        rect2.style.fill = "red";
        svgViewer.appendChild(rect2);
    }
    
}).call(this);

