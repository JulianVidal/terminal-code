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

  generateMaze() {
  }

  generateMazeAnim() {
  }
}

class MazeBlock extends Maze {
  constructor(height, width, scale) {
    super(height, width, scale)
  }

  initGrid() {
    for (let y = 0; y < this.height / this.scale; y++) {
      if (!this.grid[y]) this.grid[y] = []
      for (let x = 0; x < this.width / this.scale; x++) {
        if (x === 0 || y === 0 || x === this.width / this.scale - 1|| y === this.height / this.scale - 1) {
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
        const c = color === 1 ? "#FFF" : "#000"
        this.canvas.setColor(c)
        this.canvas.drawFilledRectangle(x * this.scale, y * this.scale, this.scale, this.scale)
      })
    })
  }

  generateMaze() {
  }

  generateMazeAnim() {
  }
}

class BinaryMaze extends Maze {
  constructor(dir = 'NW', height = 500, width = 500, scale = 20) {
    super(height, width, scale)
    this.dir = dir
  }

  generateMaze() {
    const dy = this.dir.includes('N') ? 0 : 1
    const dx = this.dir.includes('W') ? 0 : 1
    const oy = dy === 0 ? this.height / this.scale - 1: 0
    const ox = dx === 0 ? this.width / this.scale  - 1 : 0

    this.grid[oy + (dy === 0 ? 1 : 0)][ox][0] = false
    this.grid[oy][ox + (dx === 0 ? 1 : 0)][1] = false

    this.grid.forEach((col, y) => {
      col.forEach((color, x) => {
        if (Math.random() < 0.5) {
          try {
            this.grid[y + dy][x][0] = false
          } catch {}
        } else {
          try {
            this.grid[y][x + dx][1] = false
          } catch {}
        }
      })
    })
  }

  generateMazeAnim(xc = this.x, yc = this.y) {
    if (this.animating == false) this.animating = true
    const dy = this.dir.includes('N') ? 0 : 1
    const dx = this.dir.includes('W') ? 0 : 1

    if (xc === 0 && yc === 0) {
      const oy = dy === 0 ? this.height / this.scale - 1: 0
      const ox = dx === 0 ? this.width / this.scale  - 1 : 0
  
      this.grid[oy + (dy === 0 ? 1 : 0)][ox][0] = false
      this.grid[oy][ox + (dx === 0 ? 1 : 0)][1] = falsee
    }

    if (Math.random() < 0.5) {
      try {
        this.grid[yc + dy][xc][0] = false
      } catch {}
    } else {
      try {
        this.grid[yc][xc + dx][1] = false
      } catch {}
    }

    this.y++

    if (this.y === this.height / this.scale) {
      this.y = 0
      this.x++
      if (this.x === this.width / this.scale) {
        return true
      }
    }
  }
}

class BinaryMazeBlock extends MazeBlock {
  constructor(dir = 'NW', height = 500, width = 500, scale = 20) {
    super(height, width, scale)
    this.dir = dir
  }

  generateMaze() {
    const dy = this.dir.includes('N') ? -1 : 1
    const dx = this.dir.includes('W') ? -1 : 1
    const oy = dy === -1 ? this.height / this.scale - 2 : 1
    const ox = dx === -1 ? this.width / this.scale  - 2 : 1

    if (Math.random() < 0.5) this.grid[oy - dy][ox] = 1
    else this.grid[oy][ox - dx] = 1

    for (let y = 0; y < this.height / this.scale; y++) {
      for (let x = 0; x < this.width / this.scale; x++) {
        if (x === 0 || y === 0 || x === this.width / this.scale - 1|| y === this.height / this.scale - 1) continue
        if (x % 2 === 0 || y % 2 === 0) continue

        this.grid[y][x] = 1
        if (Math.random() < 0.5) {
          try {
            this.grid[y + dy][x] = 1
          } catch {}
        } else {
          try {
            this.grid[y][x + dx] = 1
          } catch {}
      }

    }
  }
  }

  generateMazeAnim(xc = this.x, yc = this.y) {
    if (this.animating == false) this.animating = true
    const dy = this.dir.includes('N') ? -1 : 1
    const dx = this.dir.includes('W') ? -1 : 1
    
    const oy = dy === -1 ? this.height / this.scale - 2 : 1
    const ox = dx === -1 ? this.width / this.scale  - 2 : 1
    if (xc === ox && yc === oy) {
  
      if (Math.random() < 0.5) this.grid[oy - dy][ox] = 1
      else this.grid[oy][ox - dx] = 1
    }

    if (this.x === 0 || this.y === 0 || this.x === this.width / this.scale - 1|| this.y === this.height / this.scale - 1) {
      this.y++
      if (this.y === this.height / this.scale) {
        this.y = 0
        this.x++
        if (this.x === this.width / this.scale) {
          return true
        }
      }
      return
    }

    if (this.x % 2 === 0 || this.y % 2 === 0) {
      this.y++
      if (this.y === this.height / this.scale) {
        this.y = 0
        this.x++
        if (this.x === this.width / this.scale) {
          return true
        }
      }
      return
    }

    this.grid[this.y][this.x] = 1
    if (Math.random() < 0.5) {
      try {
        this.grid[this.y + dy][this.x] = 1
      } catch {}
    } else {
      try {
        this.grid[this.y][this.x + dx] = 1
      } catch {}
  }

  this.y++
  if (this.y === this.height / this.scale - 1) {
    this.y = 0
    this.x++
    if (this.x === this.width / this.scale - 1) {
      this.x = 0
      this.y = 0
      return true
    }
  }

  }
}

class ABMaze extends Maze {
  constructor(height, width, scale) {
    super(height, width, scale);
    
    this.visited = new Set()
    this.vSize = 0

    this.totalSize = (height / scale + 1) * (width /scale + 1)
  }
  
  generateMaze() {

    let x = Math.floor(Math.random() * (this.width / this.scale - 1))
    let y = Math.floor(Math.random() * (this.height / this.scale - 1))

    this.visited.add(x + ',' + y)
    this.vSize++

    while (this.vSize < this.totalSize) {
      let dx = 0
      let dy = 0
      

      if (Math.random() < 0.5) {
        if (Math.random() < 0.5) dx = 1
        else dx = -1
      } else {
        if (Math.random() < 0.5) dy = 1 
        else dy = -1
      }

      if (x === 0 && dx === -1) this.grid[y][x][1] = false

      while (y + dy < 0 || x + dx < 0 || y + dy > this.height / this.scale || x + dx > this.width / this.scale) {
        dy = 0
        dx = 0
        if (Math.random() < 0.5) {
          if (Math.random() < 0.5) dx = 1
          else dx = -1
        } else {
          if (Math.random() < 0.5) dy = 1 
          else dy = -1
        }
      }

      if (this.visited.has((x + dx) + ',' + (y + dy))) {
        x += dx
        y += dy
        continue
      }

    this.visited.add((x + dx) + ',' + (y + dy)) 
    this.grid[y + (dy === 1 ? 1 : 0)][x + (dx === 1 ? 1 : 0)][Math.abs(dx)] = false
    x += dx
    y += dy
    this.vSize++
    }
  }
  
}

const grid = new ABMaze(500, 500, 20)
//const grid = new BinaryMazeBlock("NE")
grid.generateMaze()