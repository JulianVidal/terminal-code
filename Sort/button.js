function button(x, y, sizex, sizey, name) {

  //Deckares the position of the button depending on the x, y given value
  this.pos = createVector(x, y)

  //Declares the size depending on the given sizex value
  this.sizex = sizex

  //Declares the size depending on the given sizey value
  this.sizey = sizey

  //Declares the text that will be written inside the button
  this.name = name

  //Function that will return true or false if the mouse is inside the button
  this.click = function () {

    //Checks if the mouse position is inside the button
    if (mouseX > (this.pos.x - this.sizex / 2) && mouseX < (this.pos.x + this.sizex / 2) && mouseY > (this.pos.y - this.sizey / 2) && mouseY < (this.pos.y + this.sizey / 2)) {

      return true

    } else {

      return false

    }

  }

  //Draws the buttons
  this.draw = function () {

    //Changes the color of the buttons to black
    fill(0)

    //Sets the x and y positions to be interpreted as the center of the shape
    rectMode(CENTER)

    //Draws the rectangle depending on the x and y positions, and the sizex and sizey.
    rect(this.pos.x, this.pos.y, this.sizex, this.sizey)

    //Changes the color of the text to white
    fill(255)

    //Changes text size
    //Changing text size will disaligne the text
    textSize(18)

    //Sets the x and y positions to be interpreted as the center of the text
    textAlign(CENTER)

    //Draws the text based on the text giver and the x and y positions.
    text(this.name, (this.pos.x), (this.pos.y))

    //Returns the way rectangles are draw to be on the top-left corner 
    rectMode(CORNER)
  }
}
