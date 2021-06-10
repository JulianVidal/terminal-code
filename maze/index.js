/** Class that controls the canvas */
class Canvas {
  /**
   * Creates a canvas element that can be used at a higher level
   * @param  {Number} width The width
   * @param  {Number} height The height
   */
  constructor(width = 500, height = 500) {
    this.canvasElement = document.createElement('canvas')
    this.ctx = this.canvasElement.getContext('2d')

    // Makes pixel art images sharp
    this.ctx.imageSmoothingEnabled = false

    document.body.appendChild(this.canvasElement)

    this.setSize(width, height)

    this.color = '#000'
    this.ctx.color = '#000'

    this.strokeColor = '#000'
    this.ctx.strokeStyle = '#000'

    this.strokeWeight = 2
    this.ctx.lineWidth = 2

    this.isLooping = false

    this.fps = 60
  }

  /**
   * Puts the canvas inside another element
   * @param  {HTMLElement} element The element
   */
  append(element) {
    element.appendChild(this.canvasElement)
  }

  /**
   * Changes the background color
   * @param {String} color The background color
   */
  drawBackground(color = '#000') {
    this.color = color || this.color
    this.drawRectangle(0, 0, this.width, this.height)
  }

  /**
   * Loops a function Default: 60fps
   * @param  {Function} callback The function
   */
  loop(callback) {
    this.isLooping = true
    this.drawLoop = setInterval(callback, 1000 / this.fps)
  }

  /**
   * Stops the looped function
   */
  noLoop() {
    this.isLooping = false
    clearInterval(this.drawLoop)
  }

  /**
   * Sets the height and width
   * @param  {Number} width The width
   * @param  {Number} height The height
   */
  setSize(width, height) {
    this.ctx.canvas.width = width
    this.ctx.canvas.height = height
    this.height = height
    this.width = width
  }

  /**
   * Draws a rectangle
   * @param  {Number} x The x-coordinate (from the top-left corner)
   * @param  {Number} y The y-coordinate (from the top-left corner)
   * @param  {Number} width The width
   * @param  {Number} height The height
   * @param  {Boolean} noFill If the rectangle will be outlined
   */
  drawRectangle(x, y, width, height, noFill) {
    this.ctx.beginPath()
    this.ctx.rect(x, y, width, height)
    if (!noFill) this.ctx.fill()
    else this.ctx.stroke()
  }

  /**
   * Draws a rectangle with a solid color
   * @param  {Number} x The x-coordinate (from the top-left corner)
   * @param  {Number} y The y-coordinate (from the top-left corner)
   * @param  {Number} width The width
   * @param  {Number} height The height
   */
  drawFilledRectangle(x, y, width, height) {
    this.drawRectangle(x, y, width, height, false)
  }

  /**
   * Draws the outline of a rectangle
   * @param  {Number} x The x-coordinate (from the top-left corner)
   * @param  {Number} y The y-coordinate (from the top-left corner)
   * @param  {Number} width The width
   * @param  {Number} height The height
   */
  drawOutlinedRectangle(x, y, width, height) {
    this.drawRectangle(x, y, width, height, true)
  }

  /**
   * Draws the one outline of a rectangle
   * @param  {Number} x The x-coordinate (from the top-left corner)
   * @param  {Number} y The y-coordinate (from the top-left corner)
   * @param  {Number} width The width
   * @param  {Number} height The height
   * @param  {String[]} sides The sides to be drawn
   */
  drawOutlinedSidesRectangle(x, y, width, height, sides = []) {
    this.setColor('#000')
    this.drawRectangle(x, y, width, height, false)

    let dx = sides[3] ? 1 : 0
    let dy = sides[0] ? 1 : 0
    let dwidth = sides[1] ? -dx - 1 : -dx
    let dheight = sides[2] ? -dy - 1 : -dy

    this.setColor('#fff')
    this.drawRectangle(x + dx, y + dy, width + dwidth, height + dheight, false)
  }

  /**
   * Draws a quadrilateral
   * @param {Number} x1 The x-codinate (from the top-left corner)
   * @param {Number} y1 The y-codinate (from the top-left corner)
   * @param {Number} x2 The x-codinate (from the top-right corner)
   * @param {Number} y2 The y-codinate (from the top-left corner)
   * @param {Number} x3 The x-codinate (from the bottom-right corner)
   * @param {Number} y3 The y-codinate (from the top-left corner)
   * @param {Number} x4 The x-codinate (from the bottom-left corner)
   * @param {Number} y4 The y-codinate (from the top-left corner)
   * @param {Boolean} noFill
   */
  drawQuadrilateral(x1, y1, x2, y2, x3, y3, x4, y4, noFill) {
    this.ctx.beginPath()
    this.ctx.moveTo(x1, y1)
    this.ctx.lineTo(x2, y2)
    this.ctx.lineTo(x3, y3)
    this.ctx.lineTo(x4, y4)
    this.ctx.closePath()

    if (!noFill) this.ctx.fill()
    else this.ctx.stroke()
  }

  /**
   * Draws a quadrilateral with a solid color
   * @param {Number} x1 The x-codinate (from the top-left corner)
   * @param {Number} y1 The y-codinate (from the top-left corner)
   * @param {Number} x2 The x-codinate (from the top-right corner)
   * @param {Number} y2 The y-codinate (from the top-left corner)
   * @param {Number} x3 The x-codinate (from the bottom-right corner)
   * @param {Number} y3 The y-codinate (from the top-left corner)
   * @param {Number} x4 The x-codinate (from the bottom-left corner)
   * @param {Number} y4 The y-codinate (from the top-left corner)
   */
  drawFilledQuadrilateral(x1, y1, x2, y2, x3, y3, x4, y4) {
    this.drawQuadrilateral(x1, y1, x2, y2, x3, y3, x4, y4, false)
  }

  /**
   * Draws the outline of a quadrilateral
   * @param {Number} x1 The x-codinate (from the top-left corner)
   * @param {Number} y1 The y-codinate (from the top-left corner)
   * @param {Number} x2 The x-codinate (from the top-right corner)
   * @param {Number} y2 The y-codinate (from the top-left corner)
   * @param {Number} x3 The x-codinate (from the bottom-right corner)
   * @param {Number} y3 The y-codinate (from the top-left corner)
   * @param {Number} x4 The x-codinate (from the bottom-left corner)
   * @param {Number} y4 The y-codinate (from the top-left corner)
   */
  drawOutlinedQuadrilateral(x1, y1, x2, y2, x3, y3, x4, y4) {
    this.drawQuadrilateral(x1, y1, x2, y2, x3, y3, x4, y4, true)
  }

  /**
   * Draws a circle
   * @param  {Number} x The x-coordinate (from the center)
   * @param  {Number} y The y-coordinate (from the center)
   * @param  {Number} radius The radius
   * @param  {Boolean} noFill1 If the cirlce will be outlined
   */
  drawCircle(x, y, radius, noFill) {
    this.ctx.beginPath()
    this.ctx.arc(x, y, radius, 0, 2 * Math.PI)
    if (!noFill) this.ctx.fill()
    else this.ctx.stroke()
  }

  /**
   * Draws a circle with a solid color
   * @param  {Number} x The x-coordinate (from the center)
   * @param  {Number} y The y-coordinate (from the center)
   * @param  {Number} radius The radius
   */
  drawFilledCircle(x, y, radius) {
    this.drawCircle(x, y, radius, false)
  }

  /**
   * Draws the outline of a circle
   * @param  {Number} x The x-coordinate (from the center)
   * @param  {Number} y The y-coordinate (from the center)
   * @param  {Number} radius The radius
   */
  drawOutlinedCircle(x, y, radius) {
    this.drawCircle(x, y, radius, true)
  }

  /**
   * Draws an image
   * @param  {Number} x The x-coordinate (from the top-left corner)
   * @param  {Number} y The y-coordinate (from the top-left corner)
   * @param  {HTMLImageElement} image The element
   */
  drawImage(image, x, y, height, width) {
    function draw() {
      this.ctx.drawImage(image, x, y, height, width)
    }

    image.addEventListener('load', draw.bind(this))
  }

  /**
   * Draws a line
   * @param  {Number} x1 The x-coordinate of the first point
   * @param  {Number} y1 The y-coordinate of the first point
   * @param  {Number} x2 The x-coordinate of the second point
   * @param  {Number} y2 The y-coordinate of the second point
   */
  drawLine(x1, y1, x2, y2) {
    this.ctx.beginPath()
    this.ctx.moveTo(x1, y1)
    this.ctx.lineTo(x2, y2)
    this.ctx.stroke()
  }

  /**
   * Draws a heart
   * @param  {Number} x The x-coordinate (from the center)
   * @param  {Number} y The y-coordinate (from the center)
   * @param  {Number} radius The radius
   * @param  {Boolean} noFill If the heart will be outlined
   */
  drawHeart(x, y, radius, noFill) {
    let angle = 0

    this.ctx.moveTo(x, y)
    this.ctx.beginPath()

    while (angle < Math.PI * 2) {
      const posX = radius * (16 * Math.pow(Math.sin(angle), 3)) + x
      const posY =
        -radius *
          (13 * Math.cos(angle) -
            5 * Math.cos(2 * angle) -
            2 * Math.cos(3 * angle) -
            Math.cos(4 * angle)) +
        y

      this.ctx.lineTo(posX, posY)
      angle += 0.01
    }

    if (!noFill) this.ctx.fill()
    else this.ctx.stroke()
  }

  /**
   * Draws a heart with a solid color
   * @param  {Number} x The x-coordinate (from the center)
   * @param  {Number} y The y-coordinate (from the center)
   * @param  {Number} radius The radius
   */
  drawFilledHeart(x, y, radius) {
    this.drawHeart(x, y, radius, false)
  }

  /**
   * Draws the outline of a heart
   * @param  {Number} x The x-coordinate (from the center)
   * @param  {Number} y The y-coordinate (from the center)
   * @param  {Number} radius The radius
   */
  drawOutlinedHeart(x, y, radius) {
    this.drawHeart(x, y, radius, true)
  }

  /**
   * Changes the color when drawing filled shapes
   * @param  {String} color The color in any CSS legal Color values
   */
  setColor(color) {
    this.color = color
    this.ctx.fillStyle = color
  }

  /**
   * Changes the color of the outline when drawing outlined shapes
   * @param  {String} strokeColor The color in any CSS legal Color values
   */
  setStrokeColor(strokeColor) {
    this.strokeColor = strokeColor
    this.ctx.strokeStyle = strokeColor
  }

  /**
   * Changes the weight/thickness of the outline or line
   * @param  {Number} strokeWeight The weight
   */
  setStrokeWeight(strokeWeight) {
    this.strokeWeight = strokeWeight
    this.ctx.lineWidth = strokeWeight
  }

  /**
   * Changes the framerate of the looped function
   * @param  {Number} frameRate The frameRate
   */
  setFrameRate(frameRate) {
    this.frameRate = frameRate
  }
}

class Maze {
  constructor(height = 500, width = 500, scale = 20) {
    this.height = height
    this.width = width
    this.scale = scale
    this.canvas = new Canvas(width, height)
    this.grid = []
    this.x = 0
    this.y = 0

    this.animating = false

    this.initGrid()
    this.canvas.loop(() => {
      this.draw(this)
    })
  }

  initGrid() {
    for (let y = 0; y <= this.height / this.scale; y++) {
      if (!this.grid[y]) this.grid[y] = []
      for (let x = 0; x <= this.width / this.scale; x++) {
        let hor = x === this.width / this.scale ? false : true
        let vert = y === this.height / this.scale ? false : true
        this.grid[y].push([hor, vert])
      }
    }
  }

  draw() {
    this.canvas.setColor('#FFF')
    this.canvas.drawBackground()
    this.drawGrid()
    if (this.animating) {
      if (this.generateMazeAnim(this.x, this.y)) {
        this.animating = false
      }
    }
  }

  drawGrid() {
    this.grid.forEach((col, y) => {
      col.forEach((color, x) => {
        const [hor, vert] = color
        let sx = x * this.scale
        let sy = y * this.scale
        let sx2 = (x + 1) * this.scale
        let sy2 = (y + 1) * this.scale
        if (hor) this.canvas.drawLine(sx, sy, sx2, sy)
        if (vert) this.canvas.drawLine(sx, sy, sx, sy2)
      })
    })
  }

  removeEdge(x, y, dx, dy) {
    const edgeSide = Math.abs(dx)
    dx = Math.max(0, dx)
    dy = Math.max(0, dy)

    this.grid[y + dy][x + dx][edgeSide] = false
  }

  randomDirection() {
    let dx = 0
    let dy = 0

    if (Math.random() < 0.5) {
      if (Math.random() < 0.5) dx = 1
      else dx = -1
    } else {
      if (Math.random() < 0.5) dy = 1
      else dy = -1
  }

  return [dx, dy]
}

  randomCord() {
    const x = Math.floor(Math.random() * (this.width / this.scale - 1))
    const y = Math.floor(Math.random() * (this.height / this.scale - 1))
    return [x, y]
  }

  generateMaze() {}

  generateMazeAnim() {}
}

class MazeBlock extends Maze {
  constructor(height, width, scale) {
    super(height, width, scale)
  }

  initGrid() {
    for (let y = 0; y < this.height / this.scale; y++) {
      if (!this.grid[y]) this.grid[y] = []
      for (let x = 0; x < this.width / this.scale; x++) {
        if (
          x === 0 ||
          y === 0 ||
          x === this.width / this.scale - 1 ||
          y === this.height / this.scale - 1
        ) {
          this.grid[y].push(0)
        } else {
          let color = 0
          if (x % 2 === 1 && y % 2 === 1) color = 0
          this.grid[y].push(color)
        }
      }
    }
  }

  draw() {
    this.canvas.setColor('#000')
    this.canvas.drawBackground()
    this.drawGrid()
    if (this.animating) {
      if (this.generateMazeAnim(this.x, this.y)) {
        this.animating = false
      }
    }
  }

  drawGrid() {
    this.grid.forEach((col, y) => {
      col.forEach((color, x) => {
        const c = color === 1 ? '#FFF' : '#000'
        this.canvas.setColor(c)
        this.canvas.drawFilledRectangle(
          x * this.scale,
          y * this.scale,
          this.scale,
          this.scale
        )
      })
    })
  }

  generateMaze() {}

  generateMazeAnim() {}

  removeEdge(x, y, dx, dy) {
    this.grid[y][x] = 1
    this.grid[y + dy][x + dx] = 1
  }
}

class BinaryMaze extends Maze {
  constructor(dir = 'NW', height = 500, width = 500, scale = 20) {
    super(height, width, scale)

    this.dx = dir.includes('E') ? 1 : -1
    this.dy = dir.includes('S') ? 1 : -1

    const oy = this.dy === -1 ? height / scale - 1 : 0
    const ox = this.dx === -1 ? width / scale - 1 : 0

    if (Math.random() < 0.5) this.removeEdge(ox, oy, 0, -this.dy)
    else this.removeEdge(ox, oy, -this.dx, 0)
  }

  generateMaze() {
    for (let y = 0; y < this.grid.length - 1; y++) {
      for (let x = 0; x < this.grid[y].length - 1; x++) {
        if (Math.random() < 0.5) this.removeEdge(x, y, 0, this.dy)
        else this.removeEdge(x, y, this.dx, 0)
      }
    }
  }

  generateMazeAnim() {
    if (this.animating == false) this.animating = true

    if (Math.random() < 0.5) this.removeEdge(this.x, this.y, 0, this.dy)
    else this.removeEdge(this.x, this.y, this.dx, 0)

    this.y++
    if (this.y === this.height / this.scale) {
      this.y = 0
      this.x++
      if (this.x === this.width / this.scale) return true
    }
  }
}

class BinaryMazeBlock extends MazeBlock {
  constructor(dir = 'NW', height = 500, width = 500, scale = 20) {
    super(height, width, scale)
    this.x = 1
    this.y = 1

    this.dx = dir.includes('E') ? 1 : -1
    this.dy = dir.includes('S') ? 1 : -1

    const oy = this.dy === -1 ? height / scale - 2 : 1
    const ox = this.dx === -1 ? width / scale - 2 : 1

    if (Math.random() < 0.5) this.removeEdge(ox, oy, 0, -this.dy)
    else this.removeEdge(ox, oy, -this.dx, 0)
  }

  generateMaze() {
    for (let y = 1; y < this.height / this.scale; y += 2) {
      for (let x = 1; x < this.width / this.scale; x += 2) {
        if (Math.random() < 0.5) this.removeEdge(x, y, 0, this.dy)
        else this.removeEdge(x, y, this.dx, 0)
      }
    }
  }

  generateMazeAnim() {
    if (this.animating == false) this.animating = true

    if (Math.random() < 0.5) this.removeEdge(this.x, this.y, 0, this.dy)
    else this.removeEdge(this.x, this.y, this.dx, 0)

    this.y += 2
    if (this.y >= this.height / this.scale) {
      this.y = 1
      this.x += 2
      if (this.x >= this.width / this.scale) {
        this.x = 1
        this.y = 1
        return true
      }
    }
  }
}

class ABMaze extends Maze {
  constructor(height, width, scale) {
    super(height, width, scale)

    this.visited = new Set()

    this.totalSize = (height / scale + 1) * (width / scale + 1)

    this.x = Math.floor(Math.random() * (this.width / this.scale - 1))
    this.y = Math.floor(Math.random() * (this.height / this.scale - 1))
    this.visited.add(this.x + ',' + this.y)
  }

  generateMaze() {
    let [x, y] = this.randomCord()

    let visited = new Set()

    visited.add(x + ',' + y)

    while (visited.size < this.totalSize) {
      let [dx, dy] = this.randomDirection()

      if (x === 0 && dx === -1) this.removeEdge(x, y, dx, dy)
      if (y === 0 && dy === -1) this.removeEdge(x, y, dx, dy)

      while (
        y + dy < 0 ||
        x + dx < 0 ||
        y + dy > this.height / this.scale ||
        x + dx > this.width / this.scale
      ) {
        [dx, dy] = this.randomDirection()
      }

      x += dx
      y += dy

      if (visited.has(x + ',' + y)) continue

      visited.add(x + ',' + y)
      this.removeEdge(x, y, -dx, -dy)
    }
  }

  generateMazeAnim() {
    if (this.animating == false) this.animating = true
    if (this.visited.size >= this.totalSize) return true
    let [dx, dy] = this.randomDirection()

    if (this.x === 0 && dx === -1) this.removeEdge(this.x, this.y, dx, dy)
    if (this.y === 0 && dy === -1) this.removeEdge(this.x, this.y, dx, dy)

    while (
      this.y + dy < 0 ||
      this.x + dx < 0 ||
      this.y + dy > this.height / this.scale ||
      this.x + dx > this.width / this.scale
    ) {
      [dx, dy] = this.randomDirection()
    }

    this.x += dx
    this.y += dy
    if (this.visited.has(this.x + ',' + this.y)) return

    this.visited.add(this.x + ',' + this.y)
    this.removeEdge(this.x, this.y, -dx, -dy)
  }
}

class ABMazeBlock extends MazeBlock {
  constructor(height, width, scale) {
    super(height, width, scale)

    this.visited = new Set()
    this.vSize = 0

    this.totalSize = ((height / scale - 1) / 2) * ((width / scale - 1) / 2)

    this.x = Math.floor(Math.random() * (this.width / this.scale - 1))
    this.y = Math.floor(Math.random() * (this.height / this.scale - 1))
    if (this.x % 2 === 0 && this.x >= 0 && this.x < this.width / this.scale - 1)
      this.x++
    if (this.x % 2 === 0 && this.x === this.width / this.scale - 1) this.x--
    if (
      this.y % 2 === 0 &&
      this.y >= 0 &&
      this.y < this.height / this.scale - 1
    )
      this.y++
    if (this.y % 2 === 0 && this.y === this.height / this.scale - 1) this.y--
    this.visited.add(this.x + ',' + this.y)
    this.vSize++
  }

  generateMaze() {
    let visited = new Set()
    let vSize = 0

    let x = Math.floor(Math.random() * (this.width / this.scale - 1))
    let y = Math.floor(Math.random() * (this.height / this.scale - 1))

    if (x % 2 === 0 && x >= 0 && x < this.width / this.scale - 1) x++
    if (x % 2 === 0 && x === this.width / this.scale - 1) x--
    if (y % 2 === 0 && y >= 0 && y < this.height / this.scale - 1) y++
    if (y % 2 === 0 && y === this.height / this.scale - 1) y--

    visited.add(x + ',' + y)
    vSize++

    while (vSize < this.totalSize) {
      let dx = 0
      let dy = 0

      if (Math.random() < 0.5) {
        if (Math.random() < 0.5) dx = 2
        else dx = -2
      } else {
        if (Math.random() < 0.5) dy = 2
        else dy = -2
      }

      if (Math.random() < 0.1) {
        if (x === 1 && dx < 0) this.grid[y][x + dx / 2] = 1
        if (y === 1 && dy < 0) this.grid[y + dy / 2][x] = 1
        if (x === this.width / this.scale - 2 && dx > 0)
          this.grid[y][x + dx / 2] = 1
        if (x === this.height / this.scale - 2 && dy > 0)
          this.grid[y + dy / 2][x] = 1
      }

      while (
        y + dy < 0 ||
        x + dx < 0 ||
        y + dy >= this.height / this.scale ||
        x + dx >= this.width / this.scale
      ) {
        dy = 0
        dx = 0
        if (Math.random() < 0.5) {
          if (Math.random() < 0.5) dx = 2
          else dx = -2
        } else {
          if (Math.random() < 0.5) dy = 2
          else dy = -2
        }
      }

      if (visited.has(x + dx + ',' + (y + dy))) {
        x += dx
        y += dy
        continue
      }

      visited.add(x + dx + ',' + (y + dy))
      this.grid[y][x] = 1
      this.grid[y + dy / 2][x + dx / 2] = 1
      this.grid[y + dy][x + dx] = 1
      x += dx
      y += dy
      vSize++
    }

    console.log(visited)
  }

  generateMazeAnim() {
    if (this.animating == false) this.animating = true
    if (this.vSize >= this.totalSize) return true
    let dx = 0
    let dy = 0

    if (Math.random() < 0.5) {
      if (Math.random() < 0.5) dx = 2
      else dx = -2
    } else {
      if (Math.random() < 0.5) dy = 2
      else dy = -2
    }

    if (Math.random() < 0.1) {
      if (this.x === 1 && dx < 0) this.grid[this.y][this.x + dx / 2] = 1
      if (this.y === 1 && dy < 0) this.grid[this.y + dy / 2][this.x] = 1
      if (this.x === this.width / this.scale - 2 && dx > 0)
        this.grid[this.y][this.x + dx / 2] = 1
      if (this.y === this.height / this.scale - 2 && dy > 0)
        this.grid[this.y + dy / 2][this.x] = 1
    }

    while (
      this.y + dy < 0 ||
      this.x + dx < 0 ||
      this.y + dy >= this.height / this.scale ||
      this.x + dx >= this.width / this.scale
    ) {
      dy = 0
      dx = 0
      if (Math.random() < 0.5) {
        if (Math.random() < 0.5) dx = 2
        else dx = -2
      } else {
        if (Math.random() < 0.5) dy = 2
        else dy = -2
      }
    }

    if (this.visited.has(this.x + dx + ',' + (this.y + dy))) {
      this.x += dx
      this.y += dy
      return
    }

    this.visited.add(this.x + dx + ',' + (this.y + dy))
    this.grid[this.y][this.x] = 1
    this.grid[this.y + dy / 2][this.x + dx / 2] = 1
    this.grid[this.y + dy][this.x + dx] = 1
    this.x += dx
    this.y += dy
    this.vSize++
  }
}

class RBMaze extends Maze {
  constructor(height, width, scale) {
    super(height, width, scale)

    const [bx, by] = this.randomCord()
    this.visited = new Set(bx + ',' + by)
    this.path = [[bx, by]]
  }

  generateMaze() {
    const [bx, by] = this.randomCord()
    const visited = new Set(bx + ',' + by)
    const path = [[bx, by]]

    while (path.length > 0) {
      let [x, y] = path[path.length - 1]

      if (
        (visited.has(x + 1 + ',' + y) || x === this.width / this.scale - 1) &&
        (visited.has(x + ',' + (y + 1)) || y === this.height / this.scale - 1)
        && (visited.has(x - 1 + ',' + y) || x === 0)
        && (visited.has(x + ',' + (y - 1)) || y === 0)
      ) {
        path.pop()
        continue
      }

      let [dx, dy] = this.randomDirection()

      if (y + dy < 0 ||
        x + dx < 0 ||
        y + dy >= this.height / this.scale ||
        x + dx >= this.width / this.scale) {
          this.removeEdge(x, y, dx, dy)
        }

      while (
        y + dy < 0 ||
        x + dx < 0 ||
        y + dy >= this.height / this.scale ||
        x + dx >= this.width / this.scale ||
        visited.has(x + dx + ',' + (y + dy))
      ) {
        [dx, dy] = this.randomDirection()
      }

      x += dx
      y += dy
      visited.add(x + ',' + y)
      this.removeEdge(x, y, -dx, -dy)
      path.push([x, y])
    }
  }

  generateMazeAnim() {
    if (this.animating == false) this.animating = true
    if (this.path.length <= 0) return true
    let [x, y] = this.path[this.path.length - 1]

    if (
      (this.visited.has(x + 1 + ',' + y) ||
        x === this.width / this.scale - 1) &&
      (this.visited.has(x + ',' + (y + 1)) ||
        y === this.height / this.scale - 1) &&
      (this.visited.has(x - 1 + ',' + y) || x === 0) &&
      (this.visited.has(x + ',' + (y - 1)) || y === 0)
    ) {
      this.path.pop()
      return
    }

    let [dx, dy] = this.randomDirection()

    if (
      y + dy < 0 ||
      x + dx < 0 ||
      y + dy >= this.height / this.scale ||
      x + dx >= this.width / this.scale) {
        this.removeEdge(x, y, dx, dy)
      }

    while (
      y + dy < 0 ||
      x + dx < 0 ||
      y + dy >= this.height / this.scale ||
      x + dx >= this.width / this.scale ||
      this.visited.has(x + dx + ',' + (y + dy))
    ) {
      [dx, dy] = this.randomDirection()
    }

    x += dx
    y += dy
    this.visited.add(x + ',' + y)
    this.removeEdge(x, y, -dx, -dy)
    this.path.push([x, y])
  }

  generateMazeRec(x = this.x, y = this.y) {
    const directions = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ]

    for (let t = directions.length - 1; t > 0; t--) {
      const j = Math.floor(Math.random() * (t + 1))
      let temp = directions[t]
      directions[t] = directions[j]
      directions[j] = temp
    }

    for (let i = 0; i < 4; i++) {
      let [dx, dy] = directions[i]

      if (
        y + dy < 0 ||
        x + dx < 0 ||
        y + dy >= this.height / this.scale ||
        x + dx >= this.width / this.scale ||
        !this.grid[y + dy][x + dx][0] ||
        !this.grid[y + dy][x + dx][1] ||
        !this.grid[y + dy + 1][x + dx][0] ||
        !this.grid[y + dy][x + dx + 1][1]
      )
        continue

      this.removeEdge(x, y, dx, dy)
      this.generateMaze(x + dx, y + dy)
    }
  }
}

class RBMazeBlock extends MazeBlock {
  constructor(heigt, width, scale) {
    super(heigt, width, scale)

    this.visited = new Set()
    this.path = []

    this.x = Math.floor(Math.random() * (this.width / this.scale - 1))
    this.y = Math.floor(Math.random() * (this.height / this.scale - 1))
    if (this.x % 2 === 0 && this.x >= 0 && this.x < this.width / this.scale - 1)
      this.x++
    if (this.x % 2 === 0 && this.x === this.width / this.scale - 1) this.x--
    if (
      this.y % 2 === 0 &&
      this.y >= 0 &&
      this.y < this.height / this.scale - 1
    )
      this.y++
    if (this.y % 2 === 0 && this.y === this.height / this.scale - 1) this.y--
    this.visited.add(this.x + ',' + this.y)
    this.path.push(this.x + ',' + this.y)
  }

  generateMaze() {
    const visited = new Set()
    const path = []

    let bx = Math.floor(Math.random() * (this.width / this.scale - 1))
    let by = Math.floor(Math.random() * (this.height / this.scale - 1))

    if (bx % 2 === 0 && bx >= 0 && bx < this.width / this.scale - 1) bx++
    if (bx % 2 === 0 && bx === this.width / this.scale - 1) bx--
    if (by % 2 === 0 && by >= 0 && by < this.height / this.scale - 1) by++
    if (by % 2 === 0 && by === this.height / this.scale - 1) by--

    visited.add(bx + ',' + by)
    path.push(bx + ',' + by)

    while (path.length > 0) {
      let dx = 0
      let dy = 0

      const currentCell = path[path.length - 1].split(',').map((el) => {
        return parseInt(el)
      })

      const x = currentCell[0]
      const y = currentCell[1]

      if (
        (visited.has(x + 2 + ',' + y) || x === this.width / this.scale - 2) &&
        (visited.has(x + ',' + (y + 2)) ||
          y === this.height / this.scale - 2) &&
        (visited.has(x - 2 + ',' + y) || x === 1) &&
        (visited.has(x + ',' + (y - 2)) || y === 1)
      ) {
        path.pop()
        continue
      }

      if (Math.random() < 0.5) {
        if (Math.random() < 0.5) dx = 2
        else dx = -2
      } else {
        if (Math.random() < 0.5) dy = 2
        else dy = -2
      }

      if (x === 1 && dx === -2) this.grid[y][x - 1] = 1
      if (y === 1 && dy === -2) this.grid[y - 1][x] = 1
      if (x === this.width / this.scale - 2 && dx === 2) this.grid[y][x + 1] = 1
      if (y === this.height / this.scale - 2 && dy === 2)
        this.grid[y + 1][x] = 1

      while (
        y + dy < 0 ||
        x + dx < 0 ||
        y + dy >= this.height / this.scale ||
        x + dx >= this.width / this.scale ||
        visited.has(x + dx + ',' + (y + dy))
      ) {
        dy = 0
        dx = 0
        if (Math.random() < 0.5) {
          if (Math.random() < 0.5) dx = 2
          else dx = -2
        } else {
          if (Math.random() < 0.5) dy = 2
          else dy = -2
        }
      }

      visited.add(x + dx + ',' + (y + dy))
      this.grid[y][x] = 1
      this.grid[y + dy / 2][x + dx / 2] = 1
      this.grid[y + dy][x + dx] = 1
      path.push(x + dx + ',' + (y + dy))
    }
  }

  generateMazeAnim() {
    if (this.animating == false) this.animating = true
    if (this.path.length <= 0) return true

    let dx = 0
    let dy = 0

    const currentCell = this.path[this.path.length - 1].split(',').map((el) => {
      return parseInt(el)
    })

    this.x = currentCell[0]
    this.y = currentCell[1]

    if (
      (this.visited.has(this.x + 2 + ',' + this.y) ||
        this.x === this.width / this.scale - 2) &&
      (this.visited.has(this.x + ',' + (this.y + 2)) ||
        this.y === this.height / this.scale - 2) &&
      (this.visited.has(this.x - 2 + ',' + this.y) || this.x === 1) &&
      (this.visited.has(this.x + ',' + (this.y - 2)) || this.y === 1)
    ) {
      this.path.pop()
      return
    }

    if (Math.random() < 0.5) {
      if (Math.random() < 0.5) dx = 2
      else dx = -2
    } else {
      if (Math.random() < 0.5) dy = 2
      else dy = -2
    }

    if (this.x === 1 && dx === -2) this.grid[this.y][this.x - 1] = 1
    if (this.y === 1 && dy === -2) this.grid[this.y - 1][this.x] = 1
    if (this.x === this.width / this.scale - 2 && dx === 2)
      this.grid[this.y][this.x + 1] = 1
    if (this.y === this.height / this.scale - 2 && dy === 2)
      this.grid[this.y + 1][this.x] = 1

    while (
      this.y + dy < 0 ||
      this.x + dx < 0 ||
      this.y + dy >= this.height / this.scale ||
      this.x + dx >= this.width / this.scale ||
      this.visited.has(this.x + dx + ',' + (this.y + dy))
    ) {
      dy = 0
      dx = 0
      if (Math.random() < 0.5) {
        if (Math.random() < 0.5) dx = 2
        else dx = -2
      } else {
        if (Math.random() < 0.5) dy = 2
        else dy = -2
      }
    }

    this.visited.add(this.x + dx + ',' + (this.y + dy))
    this.grid[this.y][this.x] = 1
    this.grid[this.y + dy / 2][this.x + dx / 2] = 1
    this.grid[this.y + dy][this.x + dx] = 1
    this.path.push(this.x + dx + ',' + (this.y + dy))
  }

  generateMazeRec(x = this.x, y = this.y) {
    const directions = [
      [0, 2],
      [2, 0],
      [0, -2],
      [-2, 0],
    ]

    for (let t = directions.length - 1; t > 0; t--) {
      const j = Math.floor(Math.random() * (t + 1))
      let temp = directions[t]
      directions[t] = directions[j]
      directions[j] = temp
    }

    for (let i = 0; i < 4; i++) {
      let [dx, dy] = directions[i]

      if (
        y + dy < 0 ||
        x + dx < 0 ||
        y + dy >= this.height / this.scale ||
        x + dx >= this.width / this.scale ||
        this.grid[y + dy][x + dx + 1] ||
        this.grid[y + dy + 1][x + dx] ||
        this.grid[y + dy - 1][x + dx] ||
        this.grid[y + dy][x + dx - 1]
      )
        continue

      this.grid[y][x] = 1
      this.grid[y + dy / 2][x + dx / 2] = 1
      this.grid[y + dy][x + dx] = 1
      this.generateMaze(x + dx, y + dy)
    }
  }
}

//const grid = new BinaryMazeBlock(500, 500, 20)
const grid = new BinaryMazeBlock("NE")
grid.generateMazeAnim()
