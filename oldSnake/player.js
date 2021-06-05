function player() {
  this.pos = createVector(width/2, height/2)
  this.vel = createVector(0, 0)
  this.size = 10
  this.speed = this.size
  this.tail = 0

  this.draw = function () {
    noStroke()
    rect(this.pos.x, this.pos.y, this.size, this.size)
    for (var i = 0; i < this.tail.length; i++) {
      rect(this.pos.y)
    }
  }

  this.update = function () {
    if (this.pos.x >= 0 && this.pos.x < width - this.size && this.pos.y >= 0 && this.pos.y <= height - this.size) {
      this.pos.add(this.vel)
    } else {
      noLoop()
    }
  }

  this.collision = function (object) {
    if (dist(this.pos.x, this.pos.y, object.pos.x, object.pos.y) <= 0) {
      this.tail++
    }
  }
}
