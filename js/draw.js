var paint = false

var strokes = new Array(); // collection of strokes
// var stroke = new Array(); // current stroke

var brushSize = 10;

function addClick(x, y, dragging) {
    var click = {};
    click.x = x;
    click.y = y;
    click.color = picker.hex;
    click.dragging = dragging;
click.brushSize = brushSize;
    // push current click to current stroke
    var currentStroke = strokes[strokes.length - 1];
    currentStroke.push(click);

    console.log(click)
}

function draw(v, c, w, h) {

    var scene = $('body').attr('data-active-scene');
    if (scene == 'live') {

        if (v.paused || v.ended) {
            console.log('video status', v.paused, v.ended)
            return false;
        }

        c.drawImage(v, 0, 0, w, h);
        redraw();

    }

    setTimeout(draw, 10, v, c, w, h);
}

function redraw() {
    scetchContext.lineJoin = "round";
    scetchContext.lineCap = "round";

    // make double for-loop
    // outer: strokes (collection of strokes)
    // inner: single stroke

    for (var i = 0; i < strokes.length; i++) {

        var stroke = strokes[i];
        if (stroke.length > 0) {
            var firstClick = stroke[0];
            scetchContext.beginPath();
    scetchContext.lineWidth = firstClick.brushSize;

            scetchContext.strokeStyle = firstClick.color;
            scetchContext.moveTo(firstClick.x, firstClick.y);

            // a stroke = a line
            for (var j = 0; j < stroke.length - 2; j++) {
                // every single point
                var click = stroke[j];
                var c = (stroke[j].x + stroke[j + 1].x) / 2;
                var d = (stroke[j].y + stroke[j + 1].y) / 2;
                scetchContext.quadraticCurveTo(stroke[j].x, stroke[j].y, c, d);
            }
            scetchContext.stroke();
        }

    }
}
$("#scetch").bind("mousedown touchstart", function(e) {

    // push empty array to strokes
    strokes.push([]);

    var mouseX = e.pageX - this.offsetLeft;
    var mouseY = e.pageY - this.offsetTop;
    paint = true
    addClick(window.innerWidth - mouseX, mouseY, false);
    // redraw();
})
$("#scetch").bind("mousemove touchmove", function(e) {
    if (paint == true) {
        var mouseX = e.pageX - this.offsetLeft;
        var mouseY = e.pageY - this.offsetTop;
        addClick(window.innerWidth - mouseX, mouseY, true);
        // redraw();
    }
})
$("#scetch").bind("mouseup touchend", function(e) {

    paint = false;
})