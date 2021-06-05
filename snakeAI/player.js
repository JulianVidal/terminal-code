function player(brain) {
  this.size = 10
  this.speed = this.size
  this.pos = createVector(width/2, height/2)
  this.vel = createVector(0, -this.speed)
  this.tail = []
  this.score = 0
  this.fitness = 0
  inputs = [null, null, null, null, null]

  if (brain) {
    this.brain = brain
  } else {
    this.brain = new NeuralNetwork(5, 10, 4)
  }


  this.draw = function () {
    noStroke()
    fill(255)
    rect(this.pos.x, this.pos.y, this.size, this.size)
    for (var i = 0; i < this.tail.length; i++) {
      rect(this.tail[i].x, this.tail[i].y, this.size, this.size)
    }
    this.tail.splice(0, 1)
    this.tail.push(
      {
        x : this.pos.x,

        y : this.pos.y
      }
    )
  }

  this.update = function () {
    this.score += 1

    if (this.pos.x >= 0 && this.pos.x < width - this.size && this.pos.y >= 0 && this.pos.y <= height - this.size) {
      this.pos.add(this.vel)
    } else {
      nextPerson()
    }
  }

  this.collision = function (object, i) {

    if (dist(this.pos.x, this.pos.y, object.pos.x, object.pos.y) <= 0) {
      this.score += 100
      this.tail.push(
        {
          x : this.pos.x,

          y :  this.pos.y
        }
      )
      object.remove(i)
      foods.push(new food(this.vel))
    }

  }

  this.itself = function () {
    /*for (var i = 0; i < this.tail.length - 1; i++) {
      if (dist(this.pos.x, this.pos.y, this.tail[i].x, this.tail[i].y) <= 0)  {
        nextPerson()
      }
    }*/
  }

  this.think = function () {

    inputs[0] = this.pos.x / width
    inputs[1] = this.pos.y / height
    if (foods.size > 0) {
      inputs[2] = foods[0].pos.x / width
      inputs[3] = foods[0].pos.y / height
      //The angle between food and player
    //  let playerVecDist = sqrt(Math.pow(this.pos.x, 2) + Math.pow(this.pos.y, 2))
    //  let foodVecDist = sqrt(Math.pow(foods[0].pos.x, 2) + Math.pow(foods[0].pos.y, 2))
    //  let product = ((this.pos.x * foods[0].x) + (this.pos.y * foods[0].y))
    //  let angle = product/(playerVecDist * foodVecDist)

      //inputs[5] = angle
    } else {
      inputs[2] = null
      inputs[3] = null
      //inputs[5] = null
    }
    inputs[4] = this.tail.length / 10
    //inputs[6] = 0
    //inputs[7] = 0

    let outputs = this.brain.predict(inputs)
    let index = outputs.indexOf(Math.max.apply(Math, outputs))
    //console.log(outputs);
    //console.log(acos(angle))
    switch (index) {
      case 0:
        this.up()
        break;
      case 1:
        this.down()
        break;
      case 2:
        this.left()
        break;
      case 3:
        this.right()
        break;
      default:
      console.log("what")
    }
  }

  this.mutate = function () {
    this.brain.mutate(0.1)
  }

  this.up = function () {
    if (this.vel.y != this.speed) {
      this.vel = createVector(0, -this.speed)
    } else {
      //nextPerson()
    }
  }

  this.down = function () {
    if (this.vel.y != -this.speed) {
        this.vel = createVector(0, this.speed)
    } else {
      //nextPerson()
    }

  }

  this.left = function () {
    if (this.vel.x != this.speed) {
            this.vel = createVector(-this.speed, 0)
    } else {
      //nextPerson()
    }

  }

  this.right = function () {
    if (this.vel.x != -this.speed) {
            this.vel = createVector(this.speed, 0)
    } else {
      //nextPerson()
    }
  }

}
