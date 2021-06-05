class Hitbox {
  constructor(x, y, sizex, sizey) {
    this.ptop = y
    this.pbottom = y + sizey
    this.pleft = x
    this.pright = x + sizex
    this.type = 0;

    this.lines = [
      [
        createVector(this.pleft, this.ptop),
        createVector(this.pright, this.ptop),
      ],
      [
        createVector(this.pright, this.ptop),
        createVector(this.pright, this.pbottom),
      ],
      [
        createVector(this.pright, this.pbottom),
        createVector(this.pleft, this.pbottom),
      ],
      [
        createVector(this.pleft, this.pbottom),
        createVector(this.pleft, this.ptop)
      ]
    ]
  }

  update(x, y, sizex, sizey) {
    this.ptop = y;
    this.pbottom = y + sizey;
    this.pleft = x;
    this.pright = x + sizex;

    this.lines = [
      [
        createVector(this.pleft, this.ptop),
        createVector(this.pright, this.ptop),
      ],
      [
        createVector(this.pright, this.ptop),
        createVector(this.pright, this.pbottom),
      ],
      [
        createVector(this.pright, this.pbottom),
        createVector(this.pleft, this.pbottom),
      ],
      [
        createVector(this.pleft, this.pbottom),
        createVector(this.pleft, this.ptop)
      ]
    ]
  }

  draw(type, color) {
    if (type) {

      if (type == 'FILL') {
        noStroke()
        fill(color);

        beginShape();
        for (let i = 0; i < this.lines.length; i++) {
          const dots = this.lines[i];
          for (let j = 0; j < dots.length; j++) {
            const dot = dots[j];
            vertex(dot.x, dot.y);
          }
        }
        endShape();

      } else if (type == 'WIRE') {

        stroke(color);
        noFill();
        beginShape();

        for (let i = 0; i < this.lines.length; i++) {
          const dots = this.lines[i];
          for (let j = 0; j < dots.length; j++) {
            const dot = dots[j];
            vertex(dot.x, dot.y);
          }
        }

        endShape();

      }

    } else {

      fill(255);
      beginShape();
      for (let i = 0; i < this.lines.length; i++) {
        const dots = this.lines[i];
        for (let j = 0; j < dots.length; j++) {
          const dot = dots[j];
          vertex(dot.x, dot.y);
        }
      }
      endShape();

    }
  }

}

function intersect(p1, p2, p3, p4) {
  if ((((p1.x - p2.x) * (p3.y - p4.y)) - ((p1.y - p2.y) * (p3.x - p4.x))) != 0) {
    let t

    t = (((p1.x - p3.x) * (p3.y - p4.y)) - ((p1.y - p3.y) * (p3.x - p4.x))) / (((p1.x - p2.x) * (p3.y - p4.y)) - ((p1.y - p2.y) * (p3.x - p4.x)))

    let u

    u = -(((p1.x - p2.x) * (p1.y - p3.y)) - ((p1.y - p2.y) * (p1.x - p3.x))) / (((p1.x - p2.x) * (p3.y - p4.y)) - ((p1.y - p2.y) * (p3.x - p4.x)))

    return {
      t: t,
      u: u
    }
  } else {
    return {
      t: 300,
      u: 300
    }
  }
}

function collision(hitbox1, hitbox2) {

  let top = false,
    bottom = false,
    right = false,
    left = false;
  for (let i = 0; i < hitbox1.lines.length; i++) {
    for (let j = 0; j < hitbox2.lines.length; j++) {
      let intersects = intersect(hitbox1.lines[i][0], hitbox1.lines[i][1], hitbox2.lines[j][0], hitbox2.lines[j][1])
      if (intersects.t >= 0 && intersects.t <= 1 && intersects.u >= 0 && intersects.u <= 1) {


        if (!top && i == 0 && hitbox1.pright == hitbox2.pright && hitbox1.pleft == hitbox2.pleft) {
          top = true;
        };
        if (!bottom && i == 2 && hitbox1.pright == hitbox2.pright && hitbox1.pleft == hitbox2.pleft) {
          bottom = true
          //&& intersects.t == 0 && intersects.u == 0.01687500000000064
        };

        if (!right && i == 1 && hitbox1.pright == hitbox2.pleft && hitbox1.pbottom /* - scale / 3*/ > hitbox2.ptop && hitbox1.ptop + 2 < hitbox2.pbottom) {
          right = true;
          // && hitbox1.pbottom > hitbox2.ptop && hitbox1.ptop < hitbox2.pbottom
        };

        if (!left && i == 3 && hitbox1.pleft == hitbox2.pright && hitbox1.pbottom /* - scale / 3 */ > hitbox2.ptop && hitbox1.ptop + 2 < hitbox2.pbottom) {
          left = true;
          //console.log(hitbox2)
        };

      }
    }
  }

  return {
    top,
    bottom,
    right,
    left,
  }
}

function collisionNoBox(p1, p2, p3, p4) {

  let intersects = intersect(p1, p2, p3, p4)
  if (intersects.t >= 0 && intersects.t <= 1 && intersects.u <= 0 && intersects.u >= -1) {
    return true
  }
}