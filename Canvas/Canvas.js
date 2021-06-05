let canvasElement, ctx, width, height;

function createCanvas(w, h) {
    canvasElement = document.createElement("canvas");
    ctx = canvasElement.getContext("2d");
    document.body.append(canvasElement);

    width  = w || 300;
    height = h || 300;

    setSize(width, height);
}

function setSize(w, h) {

    ctx.canvas.width  = w;
    ctx.canvas.height = h;

}

function background(c) {
    const color = c || "#000";
    rectangle(0, 0, width, height, color);

}

function rectangle(x, y, w, h, c) {
    const color = c || "#FFF";
    const shape = new Path2D();

    ctx.fillStyle = color;
    shape.rect(x, y, w, h);
    ctx.fill(shape);
}

function drawLoop(func) {

    setInterval(func, 1000/60);

}