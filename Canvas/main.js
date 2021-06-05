const screen = [];
const maxIterations = 1000;
let zoom = 0;

const colors = [
    [66, 30, 15],
    [25, 7, 26],
    [9, 1, 47],
    [4, 4, 73],
    [0, 7, 100],
    [12, 44, 138],
    [24, 82, 177],
    [57, 125, 209],
    [134, 181, 229],
    [211, 236, 248],
    [241, 233, 191],
    [248, 201, 95],
    [255, 170, 0],
    [204, 128, 0],
    [153, 87, 0],
    [106, 52, 3],
];

// let zoom = 100;

// let imageXMin=  -2;
// let imageXMax =  1;
let dist = Math.pow(2, -zoom) * 3;
let imageXMin= ((-2 + 1) / 2) - (dist / 2);
let imageXMax = ((-2 + 1) / 2) + (dist / 2);

const posX = 1.25;
const posY = 0;

let imageYMin = -Math.abs(imageXMin -imageXMax) / 3;
let imageYMax =  Math.abs(imageXMin - imageXMax) / 3;

window.addEventListener('keypress', handler);

window.onload = () => {
    createCanvas(600, 400);
    background();

    const slider = document.createElement("input");
    slider.setAttribute("type", "range");
    slider.setAttribute("value", "0");
    slider.setAttribute("width", "200");
    slider.setAttribute("min", `${zoom}`);
    slider.setAttribute("max", "10");
    slider.setAttribute("step", "0.2");

    slider.addEventListener("change", () => {zoom = parseInt(slider.value); zooming()});

    document.body.append(slider);

    for (let y = 0; y < height; y++) {
        screen[y] = [];
        for (let x = 0; x < width; x++) {
            screen[y][x] = loop(mapX(x), mapY(y));
            // screen[y][x] = loop(( x / zoom) - 1.5, (y / zoom) - 0.5);
        }
    }

    draw()
};

function draw() {
    background();

    const image = new Image();
    ctx.drawImage(image, 0, 0);
    let imageData  = ctx.getImageData(0, 0, width, height);
    let data = imageData.data;

    for (let y = 0; y < screen.length; y++) {
        for (let x = 0; x < screen[y].length; x++) {
            const color = getColor(screen[y][x]);
            // rectangle(x, y, 1, 1, color);
            data[(y * width  + x) * 4] = color[0];
            data[(y * width  + x) * 4 + 1] = color[1];
            data[(y * width  + x) * 4 + 2] = color[2];
        }
    }
    ctx.putImageData(imageData, 0, 0);
    rectangle(width / 2, height / 2, 5, 5, "#FFF")

}

function loop(real, img) {
    const c = new Complex(real, img);
    let z_n = new Complex(0, 0);

    // const c = new Complex(-1.09, -0.252);
    // let z_n = new Complex(real, img);

    let count = 0;

    while (z_n.mod < 2 && count < maxIterations) {
        z_n = Complex.add(Complex.mult(z_n, z_n), c);
        count++;
    }

    return count;

}

function handler(event) {
    console.log(event.key);
    switch (event.key) {
        case "w":
            zooming();
            break;
        case "s":
            imageXMin -= 0.001;
            imageXMax += 0.001;
            break;
        case "d":
            imageXMax -= 0.01;
            break;
        case "a":
            imageXMax += 0.01;
            break;
        case "q":
            break;
        case "e":
            break;
        case "z":
            screen.splice(0, screen.length - 1);
            imageYMin = -Math.abs(imageXMin -imageXMax) / 3;
            imageYMax =  Math.abs(imageXMin - imageXMax) / 3;
            for (let y = 0; y < height; y++) {
                screen[y] = [];
                for (let x = 0; x < width; x++) {
                    screen[y][x] = loop(mapX(x), mapY(y));
                    // screen[y][x] = loop((x - screenX) / zoom, (y - screenY) / zoom);
                }
            }
            draw();
            break;
    }
}

function mapX(x) {
    return ( x / width ) * (imageXMax - imageXMin) + imageXMin - posX
    // return parseFloat(Big(x).div(width).mul(Big(imageXMax).minus(Big(imageXMin))).add(Big(imageXMin).minus( Big(posX))).valueOf());
}

function mapY(y) {
    return (y / height) * (imageYMax - (imageYMin)) + (imageYMin) - posY
    // return parseFloat( Big(y).div(Big(height)).mult(Big(imageYMax).minus(imageYMin)).add(Big(imageYMin).minus(Big(posY))) .valueOf());
}

function getColor(itr) {
    let r, g, b;
    if (itr != maxIterations) {
        const i = itr % 16;
        r =  colors[i][0];
        g =  colors[i][1];
        b =  colors[i][2];
    } else {
        r =  0;
        g =  0;
        b =  0;
    }
    return [r, g, b];
    // return `rgb(${r}, ${g}, ${b})`
}

function zooming() {
    zoom++;

    dist = Math.pow(2, -zoom) * 3;
    imageXMin= ((-2 + 1) / 2) - (dist / 2);
    imageXMax = ((-2 + 1) / 2) + (dist / 2);

    imageYMin = -Math.abs(imageXMin -imageXMax) / 3;
    imageYMax =  Math.abs(imageXMin - imageXMax) / 3;

    screen.splice(0, screen.length - 1);
    imageYMin = -Math.abs(imageXMin -imageXMax) / 3;
    imageYMax =  Math.abs(imageXMin - imageXMax) / 3;
    for (let y = 0; y < height; y++) {
        screen[y] = [];
        for (let x = 0; x < width; x++) {
            screen[y][x] = loop(mapX(x), mapY(y));
            // screen[y][x] = loop((x - screenX) / zoom, (y - screenY) / zoom);
        }
    }
    draw();
}