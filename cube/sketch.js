const bars = [];
const thickness = 50;
const z_off = 50;


function setup() {
  createCanvas(600, 600, WEBGL);
  camera(-600, -900, (height / 2.0) / tan(PI * 30.0 / 180.0) - 600, 100, -100, -350, 0, 1, 0);

  for (let x = 0; x <= thickness * 20; x += thickness) {
    bars[x / thickness] = []
    for (let z = 0; z < thickness * 21; z += thickness) {
      const y = height / 2;
      const a = map(z * x, 0, 1000, 0, TWO_PI);
      bars[x / thickness][z / thickness] = new bar(x, y, z, thickness, a);
      
    }
  }


}

function draw() {
  background(0);

  /*for (let i = 0; i < bars.length; i++) {
    for (let j = 0; j < bars[i].length; j++) {

      if (j == 0) {
        bars[i][j].draw(); 
      } else {
        bars[i][j].draw(); 
      }

    }
  }*/

  for (let u = 0; u < bars.length; u++) {
      translate(50, 0, 0);
      bars[u][0].draw();
  }

  let col = 1;
  let row = -1;


  for (let o = 1; o < bars[0].length ; o++) {
    translate(-50 * row, 0, -50);

    for (let t = 0; t < bars.length; t++) {
      translate(-50 * col, 0, 0);
      bars[t][o].draw();
    }

    col *= -1;
    row *= -1;
  }

}
 