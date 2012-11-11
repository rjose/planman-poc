// This is a proof of concept for Planman. All we want to do is draw
// a couple of rectangles on screen. I'm going to follow the structure
// of backbone.js.


(function() {

    var root = this;

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
    
    // Creates an svg node. The `svgType` should be things like `svg`, `rect`, etc.
    // See [SVG Shapes](http://www.w3.org/TR/SVG11/shapes.html) for more info.
    function newSvgNode(svgType) {
        var result = document.createElementNS("http://www.w3.org/2000/svg", svgType);
        return result;
    }
    
    // This creates a new rectangle and returns it.
    function newRectangle(x, y, width, height) {
        var result = newSvgNode("rect");
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
        var viewer = document.getElementById("viewer");
        var svgViewer = newSvgNode("svg");
        viewer.appendChild(svgViewer);

        var rect1 = newRectangle(0, 0, 50, 30);
        rect1.style.fill = "blue";

        var rect2 = newRectangle(40, 40, 50, 30)
        rect2.style.fill = "green";

        [rect1, rect2].forEach(function(e) {
            svgViewer.appendChild(e);
        })
    }

}).call(this);

