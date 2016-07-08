var paint = false
var colorSaver = new Array();
// var colorSaver = [];

function addClick(x, y, dragging) {
    var click = {};
    click.x = x;
    click.y = y;
    click.color = picker.hex;
    click.dragging = dragging;
    colorSaver.push(click);
}

function draw(v, c, w, h) {
    if (v.paused || v.ended) return false;
    c.drawImage(v, 0, 0, w, h);

    redraw();

    setTimeout(draw, 20, v, c, w, h);
}

function redraw() {

    scetchContext.linejoin = "round";
    scetchContext.lineWidth = 5;
    for (var i = 0; i < colorSaver.length; i++) {
        var click = colorSaver[i];

        scetchContext.beginPath();
        if (click.dragging && i) {
            var prevClick = colorSaver[i-1];
            scetchContext.moveTo(prevClick.x, prevClick.y);
        } else {
            scetchContext.moveTo(click.x - 1, click.y);
        }
        scetchContext.lineTo(click.x, click.y);
        scetchContext.closePath();
        scetchContext.strokeStyle = click.color;
        scetchContext.stroke();

    }

}
$("#scetch").mousedown(function(e) {
    var mouseX = e.pageX - this.offsetLeft;
    var mouseY = e.pageY - this.offsetTop;
    console.log(mouseX, mouseY);
    paint = true
    addClick(mouseX, mouseY, false);
    // redraw();
})
$("#scetch").mousemove(function(e) {
    if (paint == true) {
        var mouseX = e.pageX - this.offsetLeft;
        var mouseY = e.pageY - this.offsetTop;
        addClick(mouseX, mouseY, true);
        // redraw();
    }
})
$("#scetch").mouseup(function(e) {

    paint = false
})