function enemy() {
  this.sizex = 15
  this.sizey = 30
  this.x = function () {
    let x
    let r = Math.random()
    let chance = 1/13
    let space = 20
    let start = 150

    if (r < 0.13) {
      x = start + 0 * (space)
    } else if (r < (chance * 2)) {
      x = start + 1 * (space)
    }else if (r < (chance * 3)) {
      x = start + 2 * (space)
    }else if (r < (chance * 4)) {
      x = start + 3 * (space)
    }else if (r < (chance * 5)) {
      x = start + 4 * (space)
    }else if (r < (chance* 6)) {
      x = start + 5 * (space)
    }else if (r < (chance * 7)) {
      x = start + 6 * (space)
    } else if (r < (chance * 8)) {
      x = start + 7 * (space)
    } else if (r < (chance * 9)) {
      x = start + 8 * (space)
    } else if (r < (chance * 10)) {
      x = start + 9 * (space)
    } else if (r < (chance * 11)) {
      x = start + 10 * (space)
    } else  if (r < (chance * 12) ) {
      x = start + 11 * (space)
    } else {
      x = start + 12 * (space)
    }

    return x
  }

  this.pos = createVector(this.x(), -this.sizey - 1)

  this.overlap = function (i) {
    if (i != enemies.length - 1) {
      if ((enemies[i].pos.y - this.pos.y) < this.sizey  && this.pos.x == enemies[i].pos.x) {
        enemies.splice(enemies.length - 1, 1)
      }
    }
  }
  this.vel = 5

  this.draw = function( ) {
      stroke('#FF0000')
      strokeWeight(2)
  }

  this.update = function (i) {
    this.pos.y += this.vel

    if (this.pos.y > height) {
      enemies.splice(i, 1)
    }
  }
}
