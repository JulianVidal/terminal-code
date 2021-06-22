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
    this.instrs = []
    this.step = 0
    this.animating = false
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

  reset() {
    this.grid = []
    this.initGrid()
    this.instrs.length = 0
    this.initInstrs()
    this.grid = []
    this.initGrid()
    this.animating = false
    this.canvas.noLoop()
  }

  resetAnim() {
    this.reset()
    this.step = 0
    this.animating = true
    this.canvas.loop(() => this.draw(this))
  }

  resetStep() {
    this.reset() 
    this.step = 0
    this.canvas.loop(() => this.draw(this))
  }

  draw() {
    this.canvas.setColor('#FFF')
    this.canvas.drawBackground()
    this.drawGrid()
    if (this.animating) {
      if (this.generateMazeAnim(this.x, this.y)) {
        this.animating = false
        this.canvas.noLoop()
      }
    }
    this.canvas.setColor('#FFF')
    this.canvas.drawBackground()
    this.drawGrid()
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

  removeEdge(x, y, dx, dy, add) {
    if (x === null) return
    const edgeSide = Math.abs(dx)
    dx = Math.max(0, dx)
    dy = Math.max(0, dy)

    this.grid[y + dy][x + dx][edgeSide] = add === undefined ? false : true
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

  randomDirections() {
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

    return directions
  }

  randomCord() {
    const x = Math.floor(Math.random() * (this.width / this.scale - 1))
    const y = Math.floor(Math.random() * (this.height / this.scale - 1))
    return [x, y]
  }

  scanForUnvisited(visited) {
    const directions = this.randomDirections()

    for (let y = 0; y < this.height / this.scale; y++) {
      for (let x = 0; x < this.width / this.scale; x++) {
        if (!visited.has(x + ',' + y)) {
          for (let i = 0; i < directions.length; i++) {
            const [dx, dy] = directions[i]
            if (visited.has((x + dx) + ',' + (y + dy))) {
              visited.add(x + ',' + y)
              this.instrs.push({x, y, dx, dy})
              if (
                (visited.has(x + 1 + ',' + y) || x === this.width / this.scale - 1) &&
                (visited.has(x + ',' + (y + 1)) || y === this.height / this.scale - 1)
                && (visited.has(x - 1 + ',' + y) || x === 0)
                && (visited.has(x + ',' + (y - 1)) || y === 0)
              ) {
                return this.scanForUnvisited(visited)
              }
              return [x, y]
            }
          }
        }
      }
    }
    return [null, null]
  }

  generateMaze() {
    this.reset()
    this.instrs.forEach( ({x, y, dx, dy, add}) => this.removeEdge(x, y, dx, dy, add))
    this.draw()
  }

  generateMazeAnim() {
    if (this.animating == false) this.resetAnim()
    if (this.instrs.length === this.step) return true

    const {x, y, dx, dy, add}= this.instrs[this.step]
    this.removeEdge(x, y, dx, dy, add)
    this.step++
  }

  generateMazeStep() {
    if (this.step === 0) this.resetStep()
    if (this.instrs.length === this.step) return true 
    const {x, y, dx, dy, add}= this.instrs[this.step]
    this.removeEdge(x, y, dx, dy, add)
    this.step++
  }
}

class MazeBlock extends Maze {
  constructor(height, width, scale) {
    super(height, width, scale)
    this.x = 1
    this.y = 1
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
        this.canvas.noLoop()
      }
    }
    this.canvas.setColor('#000')
    this.canvas.drawBackground()
    this.drawGrid()
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

  removeEdge(x, y, dx, dy, add) {
    if (x === null) return
    this.grid[y + dy][x + dx] = add === undefined ? 1 : 0
  }

  randomCord() {
    let x = Math.floor(Math.random() * (this.width / this.scale - 3) + 1)
    let y = Math.floor(Math.random() * (this.height / this.scale - 3) + 1)
    x += 1 - (x % 2)
    y += 1 - (y % 2)

    return [x, y]
  }

  randomDirection() {
    let dx = 0
    let dy = 0

    if (Math.random() < 0.5) {
      if (Math.random() < 0.5) dx = 2
      else dx = -2
    } else {
      if (Math.random() < 0.5) dy = 2
      else dy = -2
    }

    return [dx, dy]
  }

  randomDirections() {
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

    return directions
  }

  scanForUnvisited(visited) {
  const directions = this.randomDirections()

    for (let y = 1; y < this.height / this.scale; y += 2) {
      for (let x = 1; x < this.width / this.scale; x += 2) {
        if (!visited.has(x + ',' + y)) {
          for (let i = 0; i < directions.length; i++) {
            const [dx, dy] = directions[i]
            if (visited.has((x + dx) + ',' + (y + dy))) {
              visited.add(x + ',' + y)
              this.instrs.push({x, y, dx: 0, dy: 0})
              this.instrs.push({x, y, dx: dx / 2, dy: dy / 2})
              if (
                  (visited.has(x + 2 + ',' + y) || x === this.width / this.scale - 2) &&
                  (visited.has(x + ',' + (y + 2)) || y === this.height / this.scale - 2)
                  && (visited.has(x - 2 + ',' + y) || x === 1)
                && (visited.has(x + ',' + (y - 2)) || y === 1)
              ) {
                return this.scanForUnvisited(visited)
              }
              return [x, y]
            }
          }
        }
      }
    }
    return [null, null]
  } 
}

class KMaze extends Maze {
  constructor(height, width, scale) {
    super(height, width, scale)

  }

  initInstrs() {
    const ids = {}
    const edges = []

    for (let y = 0; y < this.grid.length - 1; y++) {
      for (let x = 0; x < this.grid[y].length - 1; x++) {
        if (x !== this.grid[y].length - 2) edges.push({x, y, dx: 1, dy: 0})
        if (y !== this.grid.length - 2) edges.push({x, y, dx: 0, dy: 1})
        ids[x + ',' + y] = y * (this.grid.length - 1) + x 
      }
    }

    for (let t = edges.length - 1; t > 0; t--) {
      const j = Math.floor(Math.random() * (t + 1))
      let temp = edges[t]
      edges[t] = edges[j]
      edges[j] = temp
    }

    while (edges.length > 0) {
      const {x, y, dx, dy} = edges.shift()
      const id = ids[x + ',' + y]
      const id2 = ids[(x + dx) + ',' + (y + dy)]

      if (id === id2) continue
      this.instrs.push({x, y, dx, dy})
      Object.keys(ids).forEach(key => {if (ids[key] === id2) ids[key] = id})
    }

  }
}

class KMazeBlock extends MazeBlock {
  constructor(height, width, scale) {
    super(height, width, scale)

  }

  initInstrs() {
    const ids = {}
    const edges = []

    for (let y = 1; y < this.grid.length; y += 2) {
      for (let x = 1; x < this.grid[y].length; x += 2) {
        if (x !== this.grid[y].length - 2) edges.push({x, y, dx: 2, dy: 0})
        if (y !== this.grid.length - 2) edges.push({x, y, dx: 0, dy: 2})
        ids[x + ',' + y] = y * (this.grid.length - 1) + x 
      }
    }

    for (let t = edges.length - 1; t > 0; t--) {
      const j = Math.floor(Math.random() * (t + 1))
      let temp = edges[t]
      edges[t] = edges[j]
      edges[j] = temp
    }

    while (edges.length > 0) {
      const {x, y, dx, dy} = edges.shift()
      const id = ids[x + ',' + y]
      const id2 = ids[(x + dx) + ',' + (y + dy)]

      this.instrs.push({x, y, dx: 0, dy: 0})
      if (id === id2) continue
      this.instrs.push({x, y, dx: dx / 2, dy: dy / 2})
      this.instrs.push({x, y, dx, dy})
      Object.keys(ids).forEach(key => {if (ids[key] === id2) ids[key] = id})
    }

  }
}

class GTMaze extends Maze {
  constructor(height, width, scale) {
    super(height, width, scale)
  }

  initInstrs() {
  let [x, y] = this.randomCord()
  const visited = new Set()
  const path = [[x, y]]
  visited.add(x + ',' + y)

  while (path.length > 0) {

    if (
      (visited.has(x + 1 + ',' + y) || x === this.width / this.scale - 1) &&
      (visited.has(x + ',' + (y + 1)) || y === this.height / this.scale - 1)
      && (visited.has(x - 1 + ',' + y) || x === 0)
      && (visited.has(x + ',' + (y - 1)) || y === 0)
    ) {
      const index = path.findIndex(cord => cord[0] === x && cord[1] === y)
      path.splice(index, 1)
      if (path.length === 0) continue
      [x, y] = path[Math.floor(path.length / 2)]
      continue
    }

    let [dx, dy] = this.randomDirection()

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
    this.instrs.push({x, y, dx: -dx, dy: -dy})
    path.push([x, y])
  }
  }
}


const grid = new GTMaze(500, 500, 20)
grid.generateMazeAnim()