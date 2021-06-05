function hole(x, y) {
  this.pos = createVector(x * 85 + 60, y* 85 + 90)
  this.size = 60

  this.draw = function() {
    fill(0)
    noStroke()
    ellipse (this.pos.x, this.pos.y, this.size, this.size)
  }
}
