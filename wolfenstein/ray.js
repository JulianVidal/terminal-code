class ray {

  constructor(x, y, angle) {
    this.pos = createVector(x, y);
    this.dir = p5.Vector.fromAngle(radians(angle), 10);
    this.angle = radians(angle);
    this.type = 0;
  }

  show() {
    stroke(color(255, 0, 0));
    strokeWeight(1);
    line(this.pos.x, this.pos.y, this.dir.x + this.pos.x, this.dir.y + this.pos.y);
  }

  intersection() {
   /* let px = this.pos.x;
    let py = this.pos.y;
    let theta = this.dir.heading();

    let bx;
    let by;

    if (this.dir.x < 0) {
      bx = floor(py / cellSize) * cellSize - 1;
    } else {
      bx = floor(py / cellSize) * cellSize + cellSize;
    }

    let xb;
    let yb;

    if (this.dir.x < 0) {
      xb = -cellSize
    } else {
      xb = cellSize
    }

    yb = cellSize * tan(theta);

    let ay;
    let ax;


    let xa = cellSize / tan(theta);

    let horInterx;
    let horIntery;

    if (this.dir.y < 0) {
      ay = floor(py / cellSize) * cellSize - 1;
    } else {
      ay = floor(py / cellSize) * cellSize + cellSize;
    }

    ax = px + (py - ay)/tan(theta);

    let ya;
    if (this.dir.y < 0) {
      ya = -cellSize
    } else {
      ya = cellSize
    }

    let cx = ax;
    let cy = ay;

    let ex = bx;
    let ey = by;

    let hit = 0;

    while (hit == 0 && floor(cx / 10) < 10 && floor(cy / 10) > -1 && floor(cx / 10) > -1 && floor(cy / 10) < 10 /*&& floor(ex / 10) < 10 && floor(ey / 10) > -1 && floor(ex / 10) > -1 && floor(ey / 10) < 10) {
      //console.log(floor(cy / 10), floor(cx / 10));
    if (grid[floor(cy / 10)][floor(cx / 10)].type > 0 || grid[floor(ey / 10)][floor(ex / 10)].type > 0 ) {
      /*  hit = 1;
        point(ex, ey)
        point(cx, cy)
        break;
      }

      cx += xa;
      cy += ya;

      ex += xb;
      ey += yb;

      point(ex, ey)
      point(cx, cy)
    }

    return [0, 0];*/
    /*let mapX = floor(this.pos.x / cellSize)
    let mapY = floor(this.pos.y / cellSize)

    let sideDistY;
    let sideDistX;

    let deltaDistX = abs(1 / this.dir.x);
    let deltaDistY = abs(1 / this.dir.y);
    let d;

    let stepX;
    let stepY;

    let hit  = 0;
    let side;

    if (this.dir.x < 0) {
      stepX = -1;
      sideDistX = (this.pos.x - mapX) * deltaDistX;

    } else {
      stepX = 1;
      sideDistX = (mapX + 1 - this.pos.x) * deltaDistX;

    }

    if (this.dir.y < 0) {
      stepY = -1;
      sideDistY = (this.pos.y - mapY) * deltaDistY;
    } else {
      stepY = 1;
      sideDistY = (mapY + 1 - this.pos.y) * deltaDistY;
    }

    while (hit == 0) {

      if (sideDistX < sideDistY) {

        sideDistX += deltaDistX;
        mapX += stepX;
        side = 0;

      } else {

        sideDistY += deltaDistY;
        mapY += stepY;
        side = 1;

      }

      if (grid[mapY][mapX].type > 0) {
        hit = 1;
        this.type = grid[mapY][mapX].type;
      }
    }
    console.log(sideDistX, sideDistY);

    if (side == 0) {
      d = (mapX - this.pos.x + (1 - stepX) / 2) / this.dir.x;
    } else {
      d = (mapY - this.pos.y + (1 - stepY) / 2) / this.dir.y;
    }

    line(this.pos.x, this.pos.y, sideDistX + this.pos.x, sideDistY + this.pos.y)
    return [d, side];*/

    
    let theta = this.angle;
    let dx = this.dir.x;
    let dy = this.dir.y;
    let slope = dy/dx;
    let x = this.pos.x;
    let y = this.pos.y;
    let side = 0;

    while (grid[floor(y / 10)][floor(x / 10)] != undefined && grid[floor(y / 10)][floor(x / 10)].type == 0  ) {

        if (abs(slope) <= 1) {
            y = y + dy/abs(dx);
            x = x + dx/abs(dx);
        }

        if (abs(slope) > 1) {
            x = x + dx/abs(dy);
            y = y + dy/abs(dy);
        }
        point(x, y); 
    }
    this.type = grid[floor(y / 10)][floor(x / 10)].type;

   /* let p1 = this.pos
    let p2 = createVector(x, y);
    let p3 = grid[floor(y / 10)][floor(x / 10)].lines[1][0]
    let p4 = grid[floor(y / 10)][floor(x / 10)].lines[1][1]

    if (collisionNoBox(p1, p2, p3, p4)) {
      side = 1;
    }

    p1 = this.pos
    p2 = createVector(x + 2, y + 2);
    p3 = grid[floor(y / 10)][floor(x / 10)].lines[3][0]
    p4 = grid[floor(y / 10)][floor(x / 10)].lines[3][1]


    if (collisionNoBox(p1, p2, p3, p4)) {
      side = 1;
    }*/


    let pt = createVector(x, y);

    return [pt, side];
  }

  distance(playerDirection) {
    let intersectionPT = this.intersection()[0];
    let d = this.pos.dist(intersectionPT);
    let theta = this.dir.angleBetween(playerDirection);

    //let p = d * cos(theta);    
    return [d, this.type/*, this.intersection()[1]*/];

  }
}
