// This function is called once the page is finished loading. It sets up the svg
// element in the viewer and then draws the rectangles.
function init() {
    console.log("Initialize!");
    var svgViewer = document.createElementNS("http://www.w3.org/2000/svg", "svgViewer");
    var viewer = document.getElementById("viewer");
    viewer.appendChild(svgViewer);
}