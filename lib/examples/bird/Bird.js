import { NeuralNetwork } from '../../NeuralNetwork.js'
import { ColliderCircle2D } from '../../Collisions.js'

export class Bird {
  constructor (x, y, canvas, brain) {
    this.pos = {
      x: x,
      y: y
    }
    this.vel = 0
    this.g = 1

    this.canvas = canvas

    this.radius = 20

    this.brain =
      brain || new NeuralNetwork(5, 6, 1)
    this.score = 0

    this.collider = new ColliderCircle2D(this.pos.x, this.pos.y, this.radius)
  }

  draw () {
    this.canvas.setColor('#FF09')
    this.canvas.drawFilledCircle(this.pos.x, this.pos.y, this.radius)
  }

  update () {
    if (this.vel > -10) this.vel -= this.g
    this.pos.y -= this.vel
    this.collider.setPosition(this.pos)
    this.score++
  }

  think (bars) {
    const birdY = this.pos.y / this.canvas.height
    const birdV = Math.abs(this.vel) / 15

    let birdToBar = null
    let barTopH = null
    let barBotH = null

    if (bars.length > 0) {
      let nearestBar = bars[0]

      for (const bar of bars) {
        if (bar.barTopPos.x > this.pos.x && bar.barTopPos.x < nearestBar.barTopPos.x) {
          nearestBar = bar
        }
      }

      birdToBar = (nearestBar.barTopPos.x - this.pos.x) / this.canvas.width
      barTopH = nearestBar.barTopHeight / this.canvas.height
      barBotH = nearestBar.barBottomPos.y / this.canvas.height
    }

    const inputs = [birdY, birdV, birdToBar, barTopH, barBotH]

    const output = this.brain.think(inputs)

    if (output[0][0] > 0.5) this.vel = 10
  }
}
