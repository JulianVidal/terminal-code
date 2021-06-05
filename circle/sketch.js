const radius = 100;
const centerX = 300;
const centerY = 300;

function setup() {
    createCanvas(600, 600);

}

function draw() {
    background(0);

    stroke(255);
    strokeWeight(3);
    point(centerX, centerY);

    noFill();
    stroke(255);
    strokeWeight(1);
    ellipse(centerX, centerY, radius);

    for (let a = -30; a < 360; a += 390) {
        let x, y;

        x = (radius / 2 + 10)  * cos(radians(a));
        y = (radius / 2 + 10) * sin(radians(a));
        
        x += centerX;
        y += centerY;

        strokeWeight(0.5);
        stroke(255);
        line(centerX, centerY, x, y);


        let perp, dx, dy;

        dx = (centerX - x);
        dy = (centerY - y);

        perp = -1 * ( dx / dy );
        
        line(x, y, 400, 320);

        let a = dist(centerX, centerY, x, y);
        let b = dist(x, y, 400, 320);
        let c = dist(centerX, centerY, 400, 320);

        let lawCos = a * a + b * b - 2 * a * b * cos(theta);

    }   
    noLoop();
}