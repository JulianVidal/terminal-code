function cell(x, y, size) {

  this.fillColor = 255
  this.size =   size
  this.x    =   x  *  this.size
  this.y    =   y  *  this.size

  this.draw = function () {
    let c = color(this.fillColor, this.fillColor, this.fillColor)
    noStroke()
    fill(c)
    square(this.x, this.y, this.size)
  }

}
