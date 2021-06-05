let scene;

function setup(){
  createCanvas(600, 600);
}

function draw() {
  background(0);
  scene = createImage(100, 100);
  translate(width/2, height/2)
  let pink = color(255, 102, 204);

  scene.loadPixels();

  setColor(255, 0, 0, 0, scene);
  setColor(255, 0, 0, 4, scene);
  setColor(255, 0, 0, 8, scene);
  setColor(255, 0, 0, 12, scene);

  scene.updatePixels();

  image(scene, width/2, height/2);
}

function setColor(r, g, b, index, scene) {
  scene.pixels[index]     = r;
  scene.pixels[index + 1] = g;
  scene.pixels[index + 2] = b;
  scene.pixels[index + 3] = 255;
}
