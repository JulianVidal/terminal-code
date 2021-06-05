let posX, posY;
let radius = 5;
let angle = 0;

const dots = [];

function setup() {
  createCanvas(600, 600);
background(0);

  posX = width  / 2;
  posY = height / 2;

}

function draw() {
    let x, y;

    x =  radius  *  (16 * pow(sin(angle), 3));
    y = -radius * (13 * cos(angle) - 5 * cos(2 * angle) - 2 * cos(3 * angle) - cos(4 * angle));

    //x = radius * cos(angle);
    //y = radius * sin(angle);

    x += posX;
    y += posY;

    dots.push(createVector(x,y));

    beginShape();

    for (let dot of dots) {

      stroke(0);
      fill(255, 0, 0);
      vertex(dot.x, dot.y);
      
    }

    endShape();

    angle += 0.01;

  if (angle >= TWO_PI) {
    back = true;
  }

}
