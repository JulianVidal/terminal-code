export class Canvas {
  constructor (width, height) {
    this.width = width || 300
    this.height = height || 300

    this.canvasElement = document.createElement('canvas')
    this.ctx = this.canvasElement.getContext('2d')
    this.ctx.imageSmoothingEnabled = false
    document.body.appendChild(this.canvasElement)

    this.setSize(width, height)

    this.globalColor = '#000'
    this.globalLineWidth = 1

    this.fps = 60
  }

  background (color) {
    this.globalColor = color || this.globalColor
    this.rectangle(0, 0, this.width, this.height)
  }

  loop (callback) {
    this.draw_loop = setInterval(callback, 1000 / this.fps)
  }

  noLoop () {
    clearInterval(this.draw_loop)
  }

  setSize (width, height) {
    this.ctx.canvas.width = width
    this.ctx.canvas.height = height
  }

  rectangle (x, y, w, h) {
    const rectangle = new Path2D()
    rectangle.rect(x, y, w, h)
    this.ctx.fillStyle = this.globalColor
    this.ctx.fill(rectangle)
  }

  circle (x, y, r, noFill, stroke) {
    const circle = new Path2D()
    circle.arc(x, y, r, 0, 2 * Math.PI)
    this.ctx.fillStyle = this.globalColor
    if (!noFill) this.ctx.fill(circle)
    if (stroke) {
      this.ctx.lineWidth = this.globalLineWidth
      this.ctx.strokeStyle = stroke
      this.ctx.stroke(circle)
    }
  }

  image (image, x, y) {
    this.ctx.drawImage(image, x, y)
  }

  line (x1, y1, x2, y2, weight) {
    const line = new Path2D()
    this.ctx.lineWidth = this.globalLineWidth
    line.moveTo(x1, y1)
    line.lineTo(x2, y2)
    this.ctx.stroke(line)
  }

  heart (x, y, radius) {
    let angle = 0

    const heart = new Path2D()

    heart.moveTo(x, y)

    while (angle < Math.PI * 2) {
      let posX = radius * (16 * Math.pow(Math.sin(angle), 3)) + x
      let posY = -radius * (13 * Math.cos(angle) - 5 * Math.cos(2 * angle) - 2 * Math.cos(3 * angle) - Math.cos(4 * angle)) + y

      heart.lineTo(posX, posY)
      heart.moveTo(posX, posY)
      this.circle(posX, posY, 1)
      angle += 0.01
    }
    this.ctx.fillStyle = this.globalColor
    this.ctx.fill(heart)
  }
}
