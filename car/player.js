function player() {
  this.sizey = 30
  this.sizex = 15
  this.vel = 0
  this.pos = createVector(150, height - this.sizey - 5)
  this.box = new hitbox(this.pos.x, this.pos, this.sizex, this.sizey)


  this.draw = function () {
    stroke('#FF0000')
    strokeWeight(2)
    this.box.update(this.pos.x, this.pos.y, this.sizex, this.sizey)
    for (var i = 0; i < this.box.lines.length; i++) {
        line(this.box.lines[i][0].x, this.box.lines[i][0].y,this.box.lines[i][1].x, this.box.lines[i][1].y)
    }
  }

  this.update = function () {
    this.pos.x += this.vel
    this.vel = 0
  }

  this.collision = function (hitbox) {
    if (collision(this.box, hitbox)) {
      noLoop()
    }
  }

  this.left = function () {
    if ( this.pos.x > 150) {
      this.vel = -(this.sizex + 5)
    }
  }

  this.right = function () {
    if (this.pos.x < 390) {
      this.vel = (this.sizex + 5)
    }
  }

}
