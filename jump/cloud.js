function cloud() {
  this.pos = createVector(width + 72, height/4)
  this.vel = 2
  this.random = Math.random()
  this.rep = 0

  this.setup = function () {
    if (this.random < 0.33) {
      this.pos.y = height/4 - 10

    } else if (this.random < 0.66) {
      this.pos.y = height/4 - 25

    } else if ( this.random < 0.99){
      this.pos.y = height/4 - 60

    } else {

    }
  }

  this.draw = function () {
    image(spriteCloudImage, this.pos.x, this.pos.y, 72, 72)
  }

  this.update = function () {
    this.pos.x -= this.vel
  }

  this.remove = function (j) {
      if (clouds[j].pos.x < -72) {
        clouds.splice(j, 1)
      }
  }
}
