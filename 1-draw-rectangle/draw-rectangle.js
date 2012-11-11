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
    
    // # Support functions
    
    // This creates a new rectangle and returns it. It doesn't add this to 
    // a parent.
    function newRectangle(x, y, width, height) {
        var result = document.createElementNS(SVG_NS, "rect");
        result.x.baseVal.value = x;
        result.y.baseVal.value = y;
        result.width.baseVal.value = width;
        result.height.baseVal.value = height;
        return result;
    }
    
    // # Main functions

    // This function should be called once the page is finished loading. It sets up the svg
    // element in the viewer and then draws the rectangles.
    Planman.init = function() {
        var svgViewer = document.createElementNS(SVG_NS, "svg");

        var viewer = document.getElementById("viewer");
        viewer.appendChild(svgViewer);

        // Create a rectangle
        var rect1 = newRectangle(0, 0, 50, 30);
        rect1.style.fill = "blue";

        // Create second rectangle
        var rect2 = newRectangle(40, 40, 50, 30)
        rect2.style.fill = "green";

        // Append rectangles
        [rect1, rect2].forEach(function(e) {
            svgViewer.appendChild(e);
        })
    }

}).call(this);

