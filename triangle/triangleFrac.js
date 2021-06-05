function triangleFrac(x1, y1, x2, y2, x3, y3, c) {

  this.pointArr = [
    createVector(x1, y1),
    createVector(x2, y2),
    createVector(x3, y3)
  ]

  this.fillColor = c

  this.draw = function () {
    noStroke()
    fill(color(this.fillColor,this.fillColor,this.fillColor))
    triangle(this.pointArr[0].x, this.pointArr[0].y,
             this.pointArr[1].x, this.pointArr[1].y,
             this.pointArr[2].x, this.pointArr[2].y
            )
  }

}
