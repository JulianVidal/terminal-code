function cell(x, y, size) {
  this.pos = createVector(x, y)
  this.color = 255


  this.draw = function() {
  fill(color(this.color))
  square(this.pos.x, this.pos.y, size)
 }

}
