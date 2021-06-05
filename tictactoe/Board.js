export class Board {
  constructor (canvas, width, height, state) {
    this.state = [
      [2, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ] || state

    this.canvas = canvas

    this.scalex = width / 3
    this.scaley = height / 3

    this.canvas.globalLineWidth = 2

    this.value = 0
  }

  drawBoard () {
    for (let x = 1; x < 3; x++) {
      this.canvas.line(this.scalex * x, 0, this.scalex * x, this.canvas.height)
      this.canvas.line(0, this.scaley * x, this.canvas.width, this.scaley * x)
    }

    for (let y = 0; y < this.state.length; y++) {
      for (let x = 0; x < this.state[y].length; x++) {
        if (this.state[y][x] === 1) {
          this.state[y][x] = 0
          this.cross(x, y)
        }
        if (this.state[y][x] === 2) {
          this.state[y][x] = 0
          this.circle(x, y)
        }
      }
    }
  }

  cross (x, y) {
    if (this.state[y][x] === 0) {
      this.state[y][x] = 1
    } else {
      return false
    }

    const centerx = this.scalex * (x + 0.5)
    const centery = this.scaley * (y + 0.5)

    const lineLength = 0.75

    let x1 = centerx - (this.scalex / 2 * lineLength)
    let y1 = centery - (this.scaley / 2 * lineLength)

    let x2 = centerx + (this.scalex / 2 * lineLength)
    let y2 = centery + (this.scaley / 2 * lineLength)

    this.canvas.line(x1, y1, x2, y2)

    x1 = centerx + (this.scalex / 2 * lineLength)
    y1 = centery - (this.scaley / 2 * lineLength)

    x2 = centerx - (this.scalex / 2 * lineLength)
    y2 = centery + (this.scaley / 2 * lineLength)

    this.canvas.line(x1, y1, x2, y2)

    return true
  }

  circle (x, y) {
    if (this.state[y][x] === 0) {
      this.state[y][x] = 2
    } else {
      return false
    }

    const centerx = this.scalex * (x + 0.5)
    const centery = this.scaley * (y + 0.5)

    const circleRadius = (this.scalex / 2) * 0.8

    this.canvas.globalColor = '#000'
    this.canvas.circle(centerx, centery, circleRadius, true, '#000')

    return true
  }

  reset() {
    this.state = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 2]
    ]
  }
}
