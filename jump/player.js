function player() {
  this.pos = createVector(width/4, height/2 - 35)
  this.grv = 2
  this.force = 0
  this.forceAc = 0
  this.sizex = 43
  this.sizey = 40
  this.jumpHeight = 20
  this.y = 35
  this.index = 0
  this.animationSpeed = 0.1
  this.cornerx = this.pos.x + this.sizex/2
  this.cornery = this.pos.y - this.sizey/2

  this.jump = function () {
    if (this.forceAc == 0 && this.force == 0) {
    this.force = 3
    this.forceAc = 1
    }
}

this.up = function () {
  this.force += this.forceAc
  this.pos.y -= this.force
}


  this.fall = function () {

    if (this.pos.y < height/2 - this.jumpHeight - 35) {
      this.forceAc = -.45
    }

    if (this.pos.y > (height/2 - this.y) && this.forceAc >= -1) {
      this.force = 0
      this.forceAc = 0
      this.pos.y = height/2 - this.y
    }

  }

  this.draw = function () {
    this.cornerx = this.pos.x + this.sizex/2
    this.cornery = this.pos.y - this.sizey/2
    this.index += this.animationSpeed
    let index = floor(this.index) % animationDino.length
    image(animationDino[index], this.pos.x + 1, this.pos.y + 3, 48, 48)
  }
}
