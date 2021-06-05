function ant(type) {
  this.pos = createVector(Math.floor((Math.random() * w) / 10) * 10, Math.floor((Math.random() * h) / 10) * 10)
  this.vel = createVector(0, -cellSize)
  this.sizex = 5
  this.sizey = 5
  this.color = color(255, 0, 0)
  this.type = type

  this.draw = function() {
  fill(this.color)
  rect(this.pos.x, this.pos.y, this.sizex, this.sizey)
}

  this.step = function() {
    if (this.type == 0) {


    if (grid[this.pos.x/cellSize][this.pos.y/cellSize].color == 255) {
      this.stepRight()
      grid[this.pos.x/cellSize][this.pos.y/cellSize].color = 0
    } else if (grid[this.pos.x/cellSize][this.pos.y/cellSize].color == 0) {
      this.stepLeft()
      grid[this.pos.x/cellSize][this.pos.y/cellSize].color = 255

    }else {

    }

    }

    if (this.type == 1) {
      if (grid[this.pos.x/cellSize][this.pos.y/cellSize].color == 0) {
        this.stepRight()
        grid[this.pos.x/cellSize][this.pos.y/cellSize].color = 255
      } else if (grid[this.pos.x/cellSize][this.pos.y/cellSize].color == 255) {
        this.stepLeft()
        grid[this.pos.x/cellSize][this.pos.y/cellSize].color = 0

      }else {

      }
    }

    this.pos.add(this.vel)


    if (this.pos.y < 0) {
      this.pos.y = grid[w/cellSize - 1][w/cellSize - 1].pos.y
    }
    if (this.pos.y >= h) {
      this.pos.y = grid[0][0].pos.y
    }
    if (this.pos.x < 0) {
      this.pos.x = grid[w/cellSize - 1][w/cellSize - 1].pos.x
    }
    if (this.pos.x >= w) {
      this.pos.x = grid[0][0].pos.x
    }


  }

  this.stepLeft = function() {

    if(this.vel.x == 0 && this.vel.y > 0) {
      let newVec = createVector(cellSize, 0)
      this.vel = newVec
    } else if (this.vel.x < 0 && this.vel.y == 0) {
      let newVec = createVector(0, cellSize)
      this.vel = newVec
    } else if (this.vel.x == 0 && this.vel.y < 0) {
      let newVec = createVector(-cellSize, 0)
      this.vel = newVec
    } else if (this.vel.x > 0 && this.vel.y == 0){
      let newVec = createVector(0, -cellSize)
      this.vel = newVec
    } else {

    }

    }

  this.stepRight = function() {

    if(this.vel.x == 0 && this.vel.y > 0) {
      let newVec = createVector(-cellSize, 0)
      this.vel = newVec
    } else if (this.vel.x > 0 && this.vel.y == 0) {
      let newVec = createVector(0, cellSize)
      this.vel = newVec
    } else if (this.vel.x == 0 && this.vel.y < 0) {
      let newVec = createVector(cellSize, 0)
      this.vel = newVec
    } else if (this.vel.x < 0 && this.vel.y == 0){
      let newVec = createVector(0, -cellSize)
      this.vel = newVec
    } else {

    }

  }

}
