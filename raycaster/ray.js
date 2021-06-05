class ray {

  constructor(x, y, direction){

    this.pos = createVector(x, y);
    this.heading = p5.Vector.fromAngle(direction);
    this.interPoint = this.heading;
    this.record = createVector(-1, -1);
  }

  draw() {
    stroke(255);
    let recordDistance;

    for (var i = 0; i < walls.length; i++) {
      let pt;

      pt = this.intersect(walls[i]);
      if (pt) {
        let d = pt.dist(this.pos);
        this.record = pt;
        recordDistance = d;
        break;
      }
    }

    for (var i = 0; i < walls.length; i++) {
      let pt;
      pt = this.intersect(walls[i]);

      if (pt) {
        let d = pt.dist(this.pos);
        if (d < recordDistance) {
          recordDistance = d;
          this.record = pt;
        }
      }
    }
    stroke(255, 100)
      if (this.record.x != -1 && this.record.y != -1) {
        line(this.pos.x, this.pos.y, this.record.x, this.record.y);
      }
  }

  intersect(wall) {
    let t, u;

    let x1 = wall.p1.x;
    let y1 = wall.p1.y;
    let x2 = wall.p2.x;
    let y2 = wall.p2.y;

    let x3 = this.pos.x;
    let y3 = this.pos.y;
    let x4 = this.heading.x  + this.pos.x;
    let y4 = this.heading.y  + this.pos.y;

    const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

    t =  (  (x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4) ) / den;
    u = -(( (x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3) ) / den);

    if (t < 1 && t > 0 && u > 0) {
      let p1x = (x1 + t * (x2 - x1));
      let p1y = (y1 + t * (y2 - y1));
      return createVector(p1x, p1y);
    }
  }

}
