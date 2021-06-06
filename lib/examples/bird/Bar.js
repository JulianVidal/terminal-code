import { ColliderBox2D } from '../../Collisions.js'

export class Bar {
  constructor (canvas) {
    this.gap = 150
    this.vel = 3
    this.width = 75
    this.canvas = canvas

    this.barTopPos = {
      x: canvas.width,
      y: 0
    }

    this.barTopHeight = Math.random() * (canvas.height - this.gap - 200) + 100

    this.barBottomPos = {
      x: canvas.width,
      y: this.barTopHeight + this.gap
    }

    this.barBottomHeight = canvas.height - this.barBottomPos.y

    this.colliders = [
      new ColliderBox2D(this.barTopPos.x, this.barTopPos.y, this.width, this.barTopHeight),
      new ColliderBox2D(this.barBottomPos.x, this.barBottomPos.y, this.width, this.barBottomHeight)
    ]
  }

  draw () {
    this.canvas.setColor('#0F0')
    this.canvas.drawFilledRectangle(
      this.barTopPos.x,
      this.barTopPos.y,
      this.width,
      this.barTopHeight
    )
    this.canvas.drawFilledRectangle(
      this.barBottomPos.x,
      this.barBottomPos.y,
      this.width,
      this.barBottomHeight
    )
  }

  update () {
    this.barTopPos.x -= this.vel
    this.barBottomPos.x -= this.vel

    this.colliders[0].changePosition(-this.vel, 0)
    this.colliders[1].changePosition(-this.vel, 0)
  }
}
