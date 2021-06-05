class person {
  constructor(x, y) {
    this.pos     = createVector(x, y);
    this.tilePos = createVector(floor(this.pos.x / cellSize), floor(this.pos.y / cellSize));

    this.fov  = 60;
    this.rays = [];

    this.direction = p5.Vector.fromAngle(PI, 10)

    for (var i = -30; i < 30; i += 1) {
      this.rays.push(new ray(this.pos.x, this.pos.y, i + degrees(this.direction.heading())));
    }
  }

  show() {

    for (let ray of this.rays) {
      ray.show();
    }
    stroke(255);
    line(this.pos.x, this.pos.y, this.direction.x + this.pos.x, this.direction.y + this.pos.y);

    strokeWeight(0.5);
    fill(0, 255, 0);
    ellipse(this.pos.x, this.pos.y, 3);
  }

  setPos(x, y) {
    this.pos.x += x;
    this.pos.y += y;
    this.rays = [];

    for (var i = -30; i < 30; i += 1) {
      this.rays.push(new ray(this.pos.x, this.pos.y, i + degrees(this.direction.heading())));
    }


  }

  setRotation(angle) {
    this.direction = p5.Vector.fromAngle(this.direction.heading() + angle, 10);
    this.rays = [];

    for (var i = -30; i < 30; i += 1) {
      this.rays.push(new ray(this.pos.x, this.pos.y, i + degrees(this.direction.heading())));
    }
  }

  render() {
    let scene = [];

    for (let ray of this.rays) {
      scene.push(ray.distance(this.direction));
    }

    for (var i = 0; i < scene.length; i++) {
      rectMode(CENTER)

      let w = sceneWidth / scene.length;
      let h = map(scene[i][0], 0, mapWidth, mapHeight, 0);
          //console.log(scene[i][0]);
          
      let dsq = scene[i][0] * scene[i][0];
      let wsq = sceneWidth * sceneWidth;
      let bright = 255;
      if (scene[i][2] == 1) {
        bright *= 0.5;
      }
      //let h = height / scene[i][0];
      let c = map(dsq, 0, wsq, 255, 0);

      noStroke();
      fill(255);
      if (scene[i][1] == 1) {
        fill(0, 0, c, bright)
      } else if (scene[i][1] == 2){
        fill(c, 0, 0, bright);
      }

      rect(mapWidth + w / 2 + (w * i), mapHeight / 2, w, h);

      rectMode(CORNER)
    }

  }

}
