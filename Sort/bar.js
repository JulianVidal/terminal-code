function bar(x, sizey) {

  //Declares the position of the object based on given parameters
  this.pos   = createVector(x, h)

  //Declares the size of the object based on given parameters
  this.sizey = (floor(10 * (sizey * ( (h - 10) / (w / wide) ))))/10

  //Declares the color of the bar
  this.color = color(0)

  //Draws the bars
  this.draw  = function () {

    //Changes the color of the bar
    fill(this.color)

    //Removes outline from the bar
    noStroke()

    //Draws the rectangle based on the given size and position
    rect(this.pos.x, this.pos.y, wide, -this.sizey)

  }

}
