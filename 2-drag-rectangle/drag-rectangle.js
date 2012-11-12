// This is a proof of concept for Planman. We want to drag a
// rectangle around the viewer.


(function() {
    var root = this;

    var Planman;
    if (typeof exports !== 'undefined') {
        Planman = exports;
    }
    else {
        Planman = root.Planman = {};
    }

    Planman.rectangles = [];
    Planman.dragReference = {};
    Planman.startPoint = {};

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

    // # Event handlers

    // Toggle drag mode for rectangles
    function handleClick(event) {
        console.dir(event);
        event.target.isDrag = !event.target.isDrag;
        if (event.target.isDrag) {
            Planman.dragReference = {x: event.x, y: event.y};
            Planman.startPoint = {x: event.target.x.baseVal.value, y: event.target.y.baseVal.value};
        }
    }

    // Move handler for rectangles
    function handleMove(event) {
        if (!event.target.isDrag) {
            return;
        }

        var delta = {x: event.x - Planman.dragReference.x, y: event.y - Planman.dragReference.y};
        event.target.x.baseVal.value = Planman.startPoint.x + delta.x;
        event.target.y.baseVal.value = Planman.startPoint.y + delta.y;
    }



    // # Main functions

    // This function should be called once the page is finished loading. It sets up the svg
    // element in the viewer and then draws the rectangles.
    Planman.init = function() {
        console.log("Init");
        var viewer = document.getElementById("viewer");
        var svgViewer = newSvgNode("svg");
        viewer.appendChild(svgViewer);

        var rect1 = newRectangle(0, 0, 50, 30);
        rect1.style.fill = "blue";

        var rect2 = newRectangle(40, 40, 75, 30)
        rect2.style.fill = "purple";

        Planman.rectangles = [rect1, rect2];

        Planman.rectangles.forEach(function(e) {
            e.onclick = handleClick;
            e.onmousemove = handleMove;
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

    Planman.exportTasks = function() {
        var resultArray = _.map(Planman.rectangles, function(e) {
           return Planman.rectAsJSON(e);
        })
        var result = JSON.stringify({tasks: resultArray});
        return result;
    }


    // Simulates a drag of a rectangle
    Planman.simulateDrag = function() {
        var rect = Planman.rectangles[0];
        setInterval(function() {
            rect.x.baseVal.value += 10;
        }, 500);

        return;
    }



}).call(this);