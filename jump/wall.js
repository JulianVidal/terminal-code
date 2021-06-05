function wall() {
  this.pos = createVector(width, height/2 - 30)
  this.sizex = 10
  this.sizey = 30
  this.vel = 5

  this.draw = function () {
    this.cornerx = this.pos.x - this.sizex/2
    this.cornery = this.pos.y - this.sizey/2
    image(spriteCactusImage, this.pos.x + 1, this.pos.y - 7, 48, 48)
  }

  this.update = function () {
    this.pos.x -= this.vel
    this.vel = 5 + frameCount/1000
    rateWall = Math.round(45 + frameCount/2000)
  }

  this.remove = function (j) {
      if (walls[j].pos.x < 0) {
        walls.splice(j, 1)
      }
  }

  this.collision = function() {
    if (this.cornerx < (dino.cornerx) && this.cornerx > (dino.cornerx - dino.sizex) && this.cornery < dino.cornery + dino.sizey) {
        noLoop()
        fill(255)
        textSize(64)
        text("Game", width/2 - 110, height/2, 100, 100)
        text("Over", width/2 + 80, height/2, 100, 100)
        textSize(24)
        text("space to restart", width/2 - 90, height/2 + 50)
        gameOver = true
      }
}
}
