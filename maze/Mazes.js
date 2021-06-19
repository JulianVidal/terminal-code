
class ABMaze extends Maze {
  constructor(height, width, scale) {
    super(height, width, scale)

    this.visited = new Set()

    this.totalSize = (height / scale + 1) * (width / scale + 1)

    const cord = this.randomCord()
    this.x = cord[0]
    this.y = cord[1]

    this.visited.add(this.x + ',' + this.y)
  }

  generateMaze() {
    let [x, y] = this.randomCord()

    let visited = new Set()

    visited.add(x + ',' + y)

    while (visited.size < this.totalSize) {
      let [dx, dy] = this.randomDirection()

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

    this.totalSize = ((height / scale - 1) / 2) * ((width / scale - 1) / 2)
    const cord = this.randomCord()
    this.x = cord[0]
    this.y = cord[1]

    this.visited.add(this.x + ',' + this.y)
  }

  generateMaze() {
    let visited = new Set()

    let [x, y] = this.randomCord()

    visited.add(x + ',' + y)

    while (visited.size < this.totalSize) {
      this.grid[y][x] = 1
      let [dx, dy] = this.randomDirection()
      
      while (
        y + dy < 0 ||
        x + dx < 0 ||
        y + dy >= this.height / this.scale ||
        x + dx >= this.width / this.scale
      ) {
        [dx, dy] = this.randomDirection()
      }

      x += dx
      y += dy

      if (visited.has(x + ',' + y)) continue

      visited.add(x + ',' + y)
      this.removeEdge(x, y, -dx / 2, -dy / 2)
    }

    this.grid[y][x] = 1
  }

  generateMazeAnim() {
    if (this.animating == false) this.animating = true
    if (this.visited.size >= this.totalSize) {this.grid[this.y][this.x] = 1; return true}
    this.grid[this.y][this.x] = 1

    let [dx, dy] = this.randomDirection()

    while (
      this.y + dy < 0 ||
      this.x + dx < 0 ||
      this.y + dy >= this.height / this.scale ||
      this.x + dx >= this.width / this.scale
    ) {
      [dx, dy] = this.randomDirection()
    }

    this.x += dx
    this.y += dy

    if (this.visited.has(this.x + ',' + this.y)) return

    this.visited.add(this.x + ',' + this.y)
    this.removeEdge(this.x, this.y, -dx / 2, -dy / 2)
  }
}

class RBMaze extends Maze {
  constructor(height, width, scale) {
    super(height, width, scale)

    const [bx, by] = this.randomCord()
    this.visited = new Set()
    this.path = [[bx, by]]
    this.visited.add(bx + ',' + by)
  }

  generateMaze() {
    const [bx, by] = this.randomCord()
    const visited = new Set()
    const path = [[bx, by]]
    visited.add(bx + ',' + by)

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
      this.generateMazeRec(x + dx, y + dy)
    }
  }
}

class RBMazeBlock extends MazeBlock {
  constructor(height, width, scale) {
    super(height, width, scale)

    const [bx, by] = this.randomCord()
    this.visited = new Set()
    this.path = [[bx, by]]
    this.visited.add(bx + ',' + by)
  }

  generateMaze() {
    const [bx, by] = this.randomCord()
    const visited = new Set()
    visited.add(bx + ',' + by)
    const path = [[bx, by]]
    let [x, y] = path[path.length - 1]

    while (path.length > 0) {
      [x, y] = path[path.length - 1]
      this.grid[y][x] = 1

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
      this.removeEdge(x, y, -dx / 2, -dy / 2)
      path.push([x, y])
    }
    this.grid[y][x] = 1
  }

  generateMazeAnim() {
    if (this.animating == false) this.animating = true
    if (this.path.length <= 0) return true
    let [x, y] = this.path[this.path.length - 1]
    this.grid[y][x] = 1


    if (
      (this.visited.has(x + 2 + ',' + y) || x === this.width / this.scale - 2) &&
      (this.visited.has(x + ',' + (y + 2)) || y === this.height / this.scale - 2) &&
      (this.visited.has(x - 2 + ',' + y) || x === 1) &&
      (this.visited.has(x + ',' + (y - 2)) || y === 1)
    ) {
      this.path.pop()
      return
    }

    let [dx, dy] = this.randomDirection()

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
    this.removeEdge(x, y, -dx / 2, -dy / 2)
    this.path.push([x, y])
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
      this.grid[y][x] = 1

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

      this.removeEdge(x, y, dx / 2, dy / 2)
      this.generateMazeRec(x + dx, y + dy)
    }
  }
}

class HAKMaze extends Maze {
  constructor(height, width, scale) {
    super(height, width, scale)

    const cords = this.randomCord()
    this.x = cords[0]
    this.y = cords[1]

    this.visited = new Set()
    this.visited.add(this.x + ',' + this.y)
  }

  generateMaze() {
    let [x, y] = this.randomCord()
    const visited = new Set()
    visited.add(x + ',' + y)

    while (true) {

      if (
        (visited.has(x + 1 + ',' + y) || x === this.width / this.scale - 1) &&
        (visited.has(x + ',' + (y + 1)) || y === this.height / this.scale - 1)
        && (visited.has(x - 1 + ',' + y) || x === 0)
        && (visited.has(x + ',' + (y - 1)) || y === 0)
      ) {
        [x, y] = this.scanForUnvisited(visited)
        if (x === null) {
          console.log(visited)
          return
        }
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
      this.removeEdge(x, y, -dx, -dy)

    }
  }

  generateMazeAnim() {
    if (this.animating == false) this.animating = true

    if (
      (this.visited.has(this.x + 1 + ',' + this.y) || this.x === this.width / this.scale - 1) &&
      (this.visited.has(this.x + ',' + (this.y + 1)) || this.y === this.height / this.scale - 1)
      && (this.visited.has(this.x - 1 + ',' + this.y) || this.x === 0)
      && (this.visited.has(this.x + ',' + (this.y - 1)) || this.y === 0)
    ) {
      let cords = this.scanForUnvisited(this.visited)
      this.x = cords[0]
      this.y = cords[1]

      if (this.x === null) {
        console.log(this.visited)
        return true
      }
    }

    let [dx, dy] = this.randomDirection()

    while (
      this.y + dy < 0 ||
      this.x + dx < 0 ||
      this.y + dy >= this.height / this.scale ||
      this.x + dx >= this.width / this.scale ||
      this.visited.has(this.x + dx + ',' + (this.y + dy))
    ) {
      [dx, dy] = this.randomDirection()
    }

    this.x += dx
    this.y += dy
    this.visited.add(this.x + ',' + this.y)
    this.removeEdge(this.x, this.y, -dx, -dy)
  }
}

class HAKMazeBlock extends MazeBlock {
  constructor(height, width, scale) {
    super(height, width, scale)

    const cords = this.randomCord()
    this.x = cords[0]
    this.y = cords[1]

    this.visited = new Set()
    this.visited.add(this.x + ',' + this.y)
  }

  generateMaze() {
    let [x, y] = this.randomCord()
    const visited = new Set()
    visited.add(x + ',' + y)

    while (true) {
      this.grid[y][x] = 1

      if (
        (visited.has(x + 2 + ',' + y) || x === this.width / this.scale - 2) &&
        (visited.has(x + ',' + (y + 2)) || y === this.height / this.scale - 2)
        && (visited.has(x - 2 + ',' + y) || x === 1)
        && (visited.has(x + ',' + (y - 2)) || y === 1)
      ) {
        [x, y] = this.scanForUnvisited(visited)
        if (x === null) {
          console.log(visited)
          return
        }
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
      this.removeEdge(x, y, -dx / 2, -dy / 2)

    }
  }

  generateMazeAnim() {
    this.grid[this.y][this.x] = 1
    if (this.animating == false) this.animating = true

    if (
      (this.visited.has(this.x + 2 + ',' + this.y) || this.x === this.width / this.scale - 2) &&
      (this.visited.has(this.x + ',' + (this.y + 2)) || this.y === this.height / this.scale - 2)
      && (this.visited.has(this.x - 2 + ',' + this.y) || this.x === 1)
      && (this.visited.has(this.x + ',' + (this.y - 2)) || this.y === 1)
    ) {
      let cords = this.scanForUnvisited(this.visited)
      this.x = cords[0]
      this.y = cords[1]

      if (this.x === null) {
        console.log(this.visited)
        return true
      }
    this.grid[this.y][this.x] = 1
    }

    let [dx, dy] = this.randomDirection()

    while (
      this.y + dy < 0 ||
      this.x + dx < 0 ||
      this.y + dy >= this.height / this.scale ||
      this.x + dx >= this.width / this.scale ||
      this.visited.has(this.x + dx + ',' + (this.y + dy))
    ) {
      [dx, dy] = this.randomDirection()
    }

    this.x += dx
    this.y += dy
    this.visited.add(this.x + ',' + this.y)
    this.removeEdge(this.x, this.y, -dx / 2, -dy / 2)
  }
}

class SWMaze extends Maze {
  constructor(height, width, scale) {
    super(height, width, scale)

    this.run = []
  }

  generateMaze() {
    const run = []
    for (let y = 0; y < this.grid.length - 1; y++) {
      for (let x = 0; x < this.grid[y].length - 1; x++) {
        run.push([x, y])
        if (Math.random() < 0.5) {
          this.removeEdge(x, y, 1, 0)
        } else {
          const [rx, ry] = run[Math.floor(Math.random() * run.length)]
          this.removeEdge(rx, ry, 0, -1)
          run.length = 0
        }
      }
      if (run.length > 0) {
        const [rx, ry] = run[Math.floor(Math.random() * run.length)]
        this.removeEdge(rx, ry, 0, -1)
      }
      if (run.length > 0) {
        const [rx, ry] = run[Math.floor(Math.random() * run.length)]
        this.removeEdge(rx, ry, 0, -1)
      }
      run.length = 0
    }
  }

  generateMazeAnim() {
    if (this.animating == false) this.animating = true

    this.run.push([this.x, this.y])
    if (Math.random() < 0.5) {
      this.removeEdge(this.x, this.y, 1, 0)
    } else {
      const [rx, ry] = this.run[Math.floor(Math.random() * this.run.length)]
      this.removeEdge(rx, ry, 0, -1)
      this.run.length = 0
    }

    if (this.y === this.grid.length - 1) return true
    this.x++
    if (this.x === this.grid[this.y].length - 1) {
      if (this.run.length > 0) {
        const [rx, ry] = this.run[Math.floor(Math.random() * this.run.length)]
        this.removeEdge(rx, ry, 0, -1)
      }
      this.run.length = 0
      this.x = 0
      this.y++
    }
  }
}

class SWMazeBlock extends MazeBlock {
  constructor(height, width, scale) {
    super(height, width, scale)

    this.run = []
  }

  generateMaze() {
    const run = []
    for (let y = 1; y < this.height / this.scale; y += 2) {
      for (let x = 1; x < this.width / this.scale; x += 2) {
        this.grid[y][x] = 1
        run.push([x, y])
        if (Math.random() < 0.5) {
          this.removeEdge(x, y, 1, 0)
        } else {
          const [rx, ry] = run[Math.floor(Math.random() * run.length)]
          this.removeEdge(rx, ry, 0, -1)
          run.length = 0
        }
      }
      if (run.length > 0) {
        const [rx, ry] = run[Math.floor(Math.random() * run.length)]
        this.removeEdge(rx, ry, 0, -1)
      }
      run.length = 0
    }
  }

  generateMazeAnim() {
    if (this.animating == false) this.animating = true
    this.grid[this.y][this.x] = 1
    this.run.push([this.x, this.y])
    if (Math.random() < 0.5) {
      this.removeEdge(this.x, this.y, 1, 0)
    } else {
      const [rx, ry] = this.run[Math.floor(Math.random() * this.run.length)]
      this.removeEdge(rx, ry, 0, -1)
      this.run.length = 0
    }

    this.x += 2
    if (this.x === this.width / this.scale) {
      if (this.run.length > 0) {
        const [rx, ry] = this.run[Math.floor(Math.random() * this.run.length)]
        this.removeEdge(rx, ry, 0, -1)
      }
      this.run.length = 0
      this.x = 1
      this.y += 2
      if (this.y === this.height / this.scale) return true
    }
  }
}

class RDMaze extends Maze {
  constructor(height, width, scale) {
    super(height, width, scale)
  }
  initGrid() {
    for (let y = 0; y <= this.height / this.scale; y++) {
      if (!this.grid[y]) this.grid[y] = []
      for (let x = 0; x <= this.width / this.scale; x++) {
        let hor = x === this.width / this.scale || x === 0 ? true : false
        let vert = y === this.height / this.scale || y === 0 ? true : false
        this.grid[y].push([vert, hor])
      }
    }
  }
  
  generateMazeRec(x1 = 0, x2 = this.grid[0].length - 1, y1 = 0, y2 = this.grid.length - 1) {
    const wh = x2 - x1 + y2 - y1 
    let prob = (y2 - y1) / wh
    if (prob === 0.5) prob = Math.random()
    if (0.5 < prob) {
      const y3 = this.splitHor(x1, x2, y1, y2)

      if (y3 === null || x2 - x1 <= 1) return

      this.generateMazeRec(x1, x2, y1, y3)
      this.generateMazeRec(x1, x2, y3, y2)
    } else {
      const x3 = this.splitVert(x1, x2, y1, y2)

      if (x3 === null || y2 - y1 <= 1) return

      this.generateMazeRec(x1, x3, y1, y2)
      this.generateMazeRec(x3, x2, y1, y2)
    }
  }

  async generateMazeRecAnim(x1 = 0, x2 = this.grid[0].length - 1, y1 = 0, y2 = this.grid.length - 1) {
    const wh = x2 - x1 + y2 - y1 
    let prob = (y2 - y1) / wh
    if (prob === 0.5) prob = Math.random()
    if (0.5 < prob) {
      const y3 = this.splitHor(x1, x2, y1, y2)

      if (y3 === null || x2 - x1 <= 1) return
      await new Promise(resolve => setTimeout(resolve, 100));

      await this.generateMazeRecAnim(x1, x2, y1, y3)
      await this.generateMazeRecAnim(x1, x2, y3, y2)
    } else {
      const x3 = this.splitVert(x1, x2, y1, y2)

      if (x3 === null || y2 - y1 <= 1) return
      await new Promise(resolve => setTimeout(resolve, 100));

      await this.generateMazeRecAnim(x1, x3, y1, y2)
      await this.generateMazeRecAnim(x3, x2, y1, y2)
    }
  }

  splitHor(x1, x2, y1, y2) {
    const y = Math.floor((y2 - y1) / 2) + y1

    if (Math.floor((y2 - y1) / 2) < 1) return null

    for (let x = x1; x < x2; x++) {
      this.grid[y][x][0] = true
    } 
    this.grid[y][Math.floor(Math.random() * (x2 - x1) + x1)][0] = false
    this.draw()
    return y
  }

  splitVert(x1, x2, y1, y2) {
    const x = Math.floor((x2 - x1) / 2) + x1
    
    if (Math.floor((x2 - x1) / 2) < 1) return null
    
    for (let y = y1; y < y2; y++) {
      this.grid[y][x][1] = true
    } 

    this.grid[Math.floor(Math.random() * (y2 - y1) + y1)][x][1] = false
    this.draw()
    return x
  }

}

class RDMazeBlock extends MazeBlock {
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
          let color = 1
          if (x % 2 === 1 && y % 2 === 1) color = 1
          this.grid[y].push(color)
        }
      }
    }
  } 

  generateMazeRec(x1 = 0, x2 = this.grid[0].length - 1, y1 = 0, y2 = this.grid.length - 1) {
    const wh = (x2 - x1 + y2 - y1)
    let prob = (y2 - y1) / wh

    if (prob === 0.5) prob = Math.random()
    if (0.5 < prob) {
      const y3 = this.splitHor(x1, x2, y1, y2)

      if (y3 === null || (x2 - x1) / 2 <= 1) return

      this.generateMazeRec(x1, x2, y1, y3)
      this.generateMazeRec(x1, x2, y3, y2)
    } else {
      const x3 = this.splitVert(x1, x2, y1, y2)

      if (x3 === null || (y2 - y1) / 2 <= 1) return

      this.generateMazeRec(x1, x3, y1, y2)
      this.generateMazeRec(x3, x2, y1, y2)
    }
  }


  splitHor(x1, x2, y1, y2) {
    let y = Math.floor((y2 - y1) / 2) + y1
    y += y % 2

    if (Math.floor((y2 - y1) / 2) <= 1) return null

    for (let x = x1; x < x2; x++) {
      this.grid[y][x] = 0
    } 
    let x = Math.floor(Math.random() * (x2 - x1) + x1) 
    x += 1 - (x % 2)
    this.grid[y][x] = 1
    this.draw()
    return y
  }

  splitVert(x1, x2, y1, y2) {
    let x = Math.floor((x2 - x1) / 2) + x1
    x += x % 2
    
    if (Math.floor((x2 - x1) / 2) <= 1) return null
    
    for (let y = y1; y < y2; y++) {
      this.grid[y][x] = 0
    } 
    let y = Math.floor(Math.random() * (y2 - y1) + y1) 
    y += 1 - (y % 2)
    this.grid[y][x] = 1
    this.draw()
    return x
  }

  async generateMazeRecAnim(x1 = 0, x2 = this.grid[0].length - 1, y1 = 0, y2 = this.grid.length - 1) {
    const wh = x2 - x1 + y2 - y1 
    let prob = (y2 - y1) / wh
    if (prob === 0.5) prob = Math.random()
    if (0.5 < prob) {
      const y3 = this.splitHor(x1, x2, y1, y2)

      if (y3 === null || (x2 - x1) / 2 <= 1) return
      await new Promise(resolve => setTimeout(resolve, 100));

      await this.generateMazeRecAnim(x1, x2, y1, y3)
      await this.generateMazeRecAnim(x1, x2, y3, y2)
    } else {
      const x3 = this.splitVert(x1, x2, y1, y2)

      if (x3 === null || (y2 - y1) / 2 <= 1) return
      await new Promise(resolve => setTimeout(resolve, 100));

      await this.generateMazeRecAnim(x1, x3, y1, y2)
      await this.generateMazeRecAnim(x3, x2, y1, y2)
    }
  }
}

//const grid = new RDMaze(500, 500, 20)
//grid.generateMazeRecAnim()



const gridBB = new BinaryMazeBlock("NE", 500, 500, 20)
const gridB = new BinaryMaze("NE", 500, 500, 20)

gridBB.generateMazeAnim()
gridB.generateMazeAnim()

//const gridABB = new ABMazeBlock(500, 500, 20)
//const gridAB = new ABMaze(500, 500, 20)

//gridABB.generateMazeAnim()
//gridAB.generateMazeAnim()

//const gridRBB = new RBMazeBlock(500, 500, 20)
//const gridRB = new RBMaze(500, 500, 20)

//gridRBB.generateMazeAnim()
//gridRB.generateMazeAnim()

//const gridHAKB = new HAKMazeBlock(500, 500, 20)
//const gridHAK = new HAKMaze(500, 500, 20)

//gridHAK.generateMazeAnim()
//gridHAKB .generateMazeAnim()

//const gridSWB = new SWMazeBlock(500, 500, 20)
//const gridSW = new SWMaze(500, 500, 20)

//gridSW.generateMazeAnim()
//gridSWB.generateMazeAnim()

//const gridRDB = new RDMazeBlock(500, 500, 20)
//const gridRD = new RDMaze(500, 500, 20)

//gridRD.generateMazeRecAnim()
//gridRDB.generateMazeRecAnim()
