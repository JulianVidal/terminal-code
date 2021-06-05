function bird() {
  this.pos = createVector(width, height/3)
  this.sizex = 10
  this.sizey = 5
  this.vel = 5

  this.draw = function () {
    fill(255)
    this.cornerx = this.pos.x + this.sizex/2
    this.cornery = this.pos.y - this.sizey/2
    ellipse(this.cornerx, this.cornery, 10, 10)
    ellipse(dino.cornerx, dino.cornery, 10, 10)
    rect(this.pos.x, this.pos.y, this.sizex, this.sizey)
  }

  this.update = function (){
    this.pos.x -= this.vel
    this.vel = 5 + frameCount/1000
  }

  this.remove = function (j) {
      if (birds[j].pos.x < -this.sizex) {
        birds.splice(j, 1)
      }
    }

  this.collision = function () {
    if (this.cornerx < (dino.cornerx) && this.cornerx - this.sizex> (dino.cornerx - dino.sizex) && this.cornery + this.sizey > dino.cornery && this.cornery - this.sizey < dino.cornery) {
      noLoop()
  }

}
}
