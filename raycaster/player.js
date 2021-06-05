class person {

  constructor(x, y) {

    this.pos  = createVector(x, y);
    this.rays = []
    this.fov  = fov;
    this.heading = 0;

    for (var i = (-(this.fov / 2) + this.heading); i < ((this.fov / 2) + this.heading); i += .5) {
      this.rays.push(new ray(this.pos.x, this.pos.y, radians(i) + this.heading));
    }
  }

  draw() {
    fill(255);
    ellipse(this.pos.x, this.pos.y, 2);
    for (var i = 0; i < this.rays.length; i++) {
      this.rays[i].draw();
    }
  }

  setPos(x, y) {
    this.pos.x = x;
    this.pos.y = y;

    this.rays = [];

    for (var i = (-(this.fov / 2) + this.heading); i < ((this.fov / 2) + this.heading); i += .5) {
      this.rays.push(new ray(this.pos.x, this.pos.y, radians(i) + this.heading));
    }
  }

  setHeading(angle) {
    this.rays = [];
    this.heading += angle;

    for (var i = (-(this.fov / 2) + this.heading); i < ((this.fov / 2) + this.heading); i += .5) {
      this.rays.push(new ray(this.pos.x, this.pos.y, radians(i) + this.heading));
    }
  }
}
