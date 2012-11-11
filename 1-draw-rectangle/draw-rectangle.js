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
    
    // This is where we'll store the rectangles
    Planman.rectangles = [];
    
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
    
    // This adds days to a date and returns the new date
    function addDaysToDate(date, numDays) {
        var msFactor = 24*60*60*1000;
        var new_ms = date.getTime() + numDays*msFactor;
        var result = new Date();
        result.setTime(new_ms);
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

        var rect2 = newRectangle(40, 40, 75, 30)
        rect2.style.fill = "purple";
        
        Planman.rectangles = [rect1, rect2];

        Planman.rectangles.forEach(function(e) {
            svgViewer.appendChild(e);
        })
    }
    

    
    // This is a proof-of-concept function for exporting the state of the work
    // semantic JSON. The right way to do this would be to use a Backbone.Model
    // and go the other direction :-).
    Planman.rectAsJSON = function(rect) {
        var result = {};
        
        // NOTE: Everything here is basically a hack
        
        // Assignee: corresponds to y value
        if (rect.y.baseVal.value === 0) {
            result.assignee = "Rino Jose";
        }
        else {
            result.assignee = "Borvo Borvison";
        }
        
        // Duration: corresponds to width
        var numDays = rect.width.baseVal.value / 25;
        result.duration = numDays;
        
        // Category: corresponds to fill style
        var category = "Generic Work";
        var blue = "#0000ff";
        var purple = "#800080";
        switch (rect.style.fill) {
            case blue:            
            category = "New Product Development";
            break;
            
            case purple:
            category = "Sustaining";
            break;
            
            default:
            break;
        }
        result.category = category;
        
        // Start date: corresponds to x
        var referenceDate = new Date(2012, 10, 11);
        var startDate = addDaysToDate(referenceDate, rect.x.baseVal.value/25)
        var endDate = addDaysToDate(startDate, numDays);
        result.startDate = startDate;
        result.endDate = endDate;
        
        return result;
    }

}).call(this);

