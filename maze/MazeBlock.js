class MazeBlock extends Maze {
  constructor(height, width, scale, canvas) {
    super(height, width, scale, canvas)
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
}

class BinaryTreeMazeBlock extends MazeBlock {
  constructor(dir = 'NW', height, width, scale, canvas) {
    super(height, width, scale, canvas)
    this.dx = dir.includes('E') ? 1 : -1
    this.dy = dir.includes('S') ? 1 : -1
  }

  initInstrs() {
    const { dx, dy } = this
    for (let y = 1; y < this.grid.length; y += 2) {
      for (let x = 1; x < this.grid[y].length; x += 2) {
        this.instrs.push({ x, y, dx: 0, dy: 0 })
        if (Math.random() < 0.5) this.instrs.push({ x, y, dx, dy: 0 })
        else this.instrs.push({ x, y, dx: 0, dy })
      }
    }
  }
}

class AldousBroderBMazeBlock extends MazeBlock {
  constructor(height, width, scale, canvas) {
    super(height, width, scale, canvas)

    this.totalSize = ((height / scale - 1) / 2) * ((width / scale - 1) / 2)
  }

  initInstrs() {
    let visited = new Set()
    let [x, y] = this.randomCord()
    visited.add(x + ',' + y)

    while (visited.size < this.totalSize) {
      this.instrs.push({ x, y, dx: 0, dy: 0 })
      let [dx, dy] = this.randomDirection()

      while (
        y + dy < 0 ||
        x + dx < 0 ||
        y + dy >= this.height / this.scale ||
        x + dx >= this.width / this.scale
      ) {
        ;[dx, dy] = this.randomDirection()
      }

      x += dx
      y += dy

      if (visited.has(x + ',' + y)) {
        this.instrs.push({ x: null })
        continue
      }
      visited.add(x + ',' + y)
      this.instrs.push({ x, y, dx: -dx / 2, dy: -dy / 2 })
    }

    this.instrs.push({ x, y, dx: 0, dy: 0 })
  }
}

class RecursiveBacktrackerMazeBlock extends MazeBlock {
  constructor(height, width, scale, canvas) {
    super(height, width, scale, canvas)
  }

  initInstrs(x = 1, y = 1) {
    const directions = this.randomDirections()

    for (let i = 0; i < 4; i++) {
      let [dx, dy] = directions[i]
      if (this.grid[y][x] === 0) this.instrs.push({ x, y, dx: 0, dy: 0 })
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

      this.instrs.push({ x, y, dx: dx / 2, dy: dy / 2 })
      this.removeEdge(x, y, dx / 2, dy / 2)
      this.initInstrs(x + dx, y + dy)
    }
  }
}

class HuntAndKillMazeBlock extends MazeBlock {
  constructor(height, width, scale, canvas) {
    super(height, width, scale, canvas)

    const cords = this.randomCord()
    this.x = cords[0]
    this.y = cords[1]

    this.visited = new Set()
    this.visited.add(this.x + ',' + this.y)
  }

  initInstrs() {
    let [x, y] = this.randomCord()
    const visited = new Set()
    visited.add(x + ',' + y)

    while (true) {
      this.instrs.push({ x, y, dx: 0, dy: 0 })

      if (
        (visited.has(x + 2 + ',' + y) || x === this.width / this.scale - 2) &&
        (visited.has(x + ',' + (y + 2)) ||
          y === this.height / this.scale - 2) &&
        (visited.has(x - 2 + ',' + y) || x === 1) &&
        (visited.has(x + ',' + (y - 2)) || y === 1)
      ) {
        ;[x, y] = this.scanForUnvisited(visited)
        if (x === null) {
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
        ;[dx, dy] = this.randomDirection()
      }

      x += dx
      y += dy
      visited.add(x + ',' + y)
      this.instrs.push({ x, y, dx: -dx / 2, dy: -dy / 2 })
    }
  }

  scanForUnvisited(visited) {
    const directions = this.randomDirections()

    for (let y = 1; y < this.height / this.scale; y += 2) {
      for (let x = 1; x < this.width / this.scale; x += 2) {
        if (!visited.has(x + ',' + y)) {
          for (let i = 0; i < directions.length; i++) {
            const [dx, dy] = directions[i]
            if (visited.has(x + dx + ',' + (y + dy))) {
              visited.add(x + ',' + y)
              this.instrs.push({ x, y, dx: 0, dy: 0 })
              this.instrs.push({ x, y, dx: dx / 2, dy: dy / 2 })
              if (
                (visited.has(x + 2 + ',' + y) ||
                  x === this.width / this.scale - 2) &&
                (visited.has(x + ',' + (y + 2)) ||
                  y === this.height / this.scale - 2) &&
                (visited.has(x - 2 + ',' + y) || x === 1) &&
                (visited.has(x + ',' + (y - 2)) || y === 1)
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

class SidewinderMazeBlock extends MazeBlock {
  constructor(height, width, scale, canvas) {
    super(height, width, scale, canvas)
  }

  initInstrs() {
    const run = []
    for (let y = 1; y < this.height / this.scale; y += 2) {
      for (let x = 1; x < this.width / this.scale; x += 2) {
        this.instrs.push({ x, y, dx: 0, dy: 0 })
        run.push([x, y])
        if (Math.random() < 0.5) {
          this.instrs.push({ x, y, dx: 1, dy: 0 })
        } else {
          const [rx, ry] = run[Math.floor(Math.random() * run.length)]
          this.instrs.push({ x: rx, y: ry, dx: 0, dy: -1 })
          run.length = 0
        }
      }
      if (run.length > 0) {
        const [rx, ry] = run[Math.floor(Math.random() * run.length)]
        this.instrs.push({ x: rx, y: ry, dx: 0, dy: -1 })
      }
      run.length = 0
    }
  }
}

class RecursiveDivisionMazeBlock extends MazeBlock {
  constructor(height, width, scale, canvas) {
    super(height, width, scale, canvas)
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

  initInstrs(
    x1 = 0,
    x2 = this.grid[0].length - 1,
    y1 = 0,
    y2 = this.grid.length - 1
  ) {
    const wh = x2 - x1 + y2 - y1
    let prob = (y2 - y1) / wh
    if (prob === 0.5) prob = Math.random()

    if (0.5 < prob) {
      if ((y2 - y1) / 2 <= 1 || (x2 - x1) / 2 <= 1) return
      const y3 = this.splitHor(x1, x2, y1, y2)

      this.initInstrs(x1, x2, y1, y3)
      this.initInstrs(x1, x2, y3, y2)
    } else {
      if ((y2 - y1) / 2 <= 1 || (x2 - x1) / 2 <= 1) return
      const x3 = this.splitVert(x1, x2, y1, y2)

      this.initInstrs(x1, x3, y1, y2)
      this.initInstrs(x3, x2, y1, y2)
    }
  }

  splitHor(x1, x2, y1, y2) {
    let y = Math.floor((y2 - y1) / 2) + y1
    y += y % 2

    for (let x = x1; x < x2; x++) {
      this.instrs.push({ x, y, dx: 0, dy: 0, add: true })
    }

    let x = Math.floor(Math.random() * (x2 - x1) + x1)
    x += 1 - (x % 2)
    this.instrs.push({ x, y, dx: 0, dy: 0 })

    return y
  }

  splitVert(x1, x2, y1, y2) {
    let x = Math.floor((x2 - x1) / 2) + x1
    x += x % 2

    for (let y = y1; y < y2; y++) {
      this.instrs.push({ x, y, dx: 0, dy: 0, add: true })
    }

    let y = Math.floor(Math.random() * (y2 - y1) + y1)
    y += 1 - (y % 2)
    this.instrs.push({ x, y, dx: 0, dy: 0 })

    return x
  }
}

class KruskalMazeBlock extends MazeBlock {
  constructor(height, width, scale, canvas) {
    super(height, width, scale, canvas)
  }

  initInstrs() {
    const ids = {}
    const edges = []

    for (let y = 1; y < this.grid.length; y += 2) {
      for (let x = 1; x < this.grid[y].length; x += 2) {
        if (x !== this.grid[y].length - 2) edges.push({ x, y, dx: 2, dy: 0 })
        if (y !== this.grid.length - 2) edges.push({ x, y, dx: 0, dy: 2 })
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
      const { x, y, dx, dy } = edges.shift()
      const id = ids[x + ',' + y]
      const id2 = ids[x + dx + ',' + (y + dy)]

      this.instrs.push({ x, y, dx: 0, dy: 0 })
      if (id === id2) continue
      this.instrs.push({ x, y, dx: dx / 2, dy: dy / 2 })
      this.instrs.push({ x, y, dx, dy })
      Object.keys(ids).forEach((key) => {
        if (ids[key] === id2) ids[key] = id
      })
    }
  }
}

class GrowingTreeMazeBlock extends MazeBlock {
  constructor(height, width, scale, canvas) {
    super(height, width, scale, canvas)
  }

  initInstrs() {
    let [x, y] = this.randomCord()
    const visited = new Set()
    const path = [[x, y]]
    visited.add(x + ',' + y)

    while (path.length > 0) {
      ;[x, y] = path[Math.floor(path.length * Math.random())]
      this.instrs.push({ x, y, dx: 0, dy: 0 })
      if (
        (visited.has(x + 2 + ',' + y) || x === this.width / this.scale - 2) &&
        (visited.has(x + ',' + (y + 2)) ||
          y === this.height / this.scale - 2) &&
        (visited.has(x - 2 + ',' + y) || x === 1) &&
        (visited.has(x + ',' + (y - 2)) || y === 1)
      ) {
        const index = path.findIndex((cord) => cord[0] === x && cord[1] === y)
        path.splice(index, 1)
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
        ;[dx, dy] = this.randomDirection()
      }

      x += dx
      y += dy
      visited.add(x + ',' + y)
      this.instrs.push({ x, y, dx: -dx / 2, dy: -dy / 2 })
      path.push([x, y])
    }
  }
}

class PrimMazeBlock extends MazeBlock {
  constructor(height, width, scale, canvas) {
    super(height, width, scale, canvas)
  }

  initInstrs() {
    let [x, y] = this.randomCord()
    const visited = new Set()
    visited.add(x + ',' + y)
    let marked = new Set()
    marked = this.addMarked(visited, x, y, marked)
    this.instrs.push({ x, y, dx: 0, dy: 0 })

    while (marked.size > 0) {
      ;[x, y] = Array.from(marked)
        [Math.floor(marked.size * Math.random())].split(',')
        .map((num) => parseInt(num))
      const directions = this.randomDirections()

      for (const [dx, dy] of directions) {
        if (visited.has(x + dx + ',' + (y + dy))) {
          marked.delete(x + ',' + y)
          marked = this.addMarked(visited, x, y, marked)
          visited.add(x + ',' + y)
          this.instrs.push({ x, y, dx: dx / 2, dy: dy / 2 })
          this.instrs.push({ x, y, dx: 0, dy: 0 })
          break
        }
      }
    }
  }

  addMarked(visited, x, y, marked) {
    if (!visited.has(x + 2 + ',' + y) && x !== this.width / this.scale - 2)
      marked.add(x + 2 + ',' + y)

    if (!visited.has(x + ',' + (y + 2)) && y !== this.height / this.scale - 2)
      marked.add(x + ',' + (y + 2))

    if (!visited.has(x - 2 + ',' + y) && x !== 1) marked.add(x - 2 + ',' + y)

    if (!visited.has(x + ',' + (y - 2)) && y !== 1)
      marked.add(x + ',' + (y - 2))

    return marked
  }
}

class WilsonMazeBlock extends MazeBlock {
  constructor(height, width, scale, canvas) {
    super(height, width, scale, canvas)
    this.totalSize = ((height / scale - 1) / 2) * ((width / scale - 1) / 2)
  }

  initInstrs() {
    let [x, y] = this.randomCord()
    const visited = new Set()
    visited.add(x + ',' + y)

    const path = []
    for (let y = 0; y <= this.height / this.scale; y++) {
      if (!path[y]) path[y] = []
      for (let x = 0; x <= this.width / this.scale; x++) {
        path[y].push([0, 0])
      }
    }

    while (visited.has(x + ',' + y)) [x, y] = this.randomCord()
    let start = [x, y]

    while (visited.size < this.totalSize) {
      if (visited.has(x + ',' + y)) {
        while (visited.has(x + ',' + y)) [x, y] = this.randomCord()
        start = [x, y]
      }
      let [dx, dy] = this.randomDirection()

      while (
        y + dy < 0 ||
        x + dx < 0 ||
        y + dy >= this.height / this.scale ||
        x + dx >= this.width / this.scale
      ) {
        ;[dx, dy] = this.randomDirection()
      }

      path[y][x] = [dx, dy]
      this.instrs.push({ x: null })
      x += dx
      y += dy

      if (visited.has(x + ',' + y)) {
        let [tx, ty] = start
        while (!visited.has(tx + ',' + ty)) {
          visited.add(tx + ',' + ty)
          this.instrs.push({ x: tx, y: ty, dx: 0, dy: 0 })
          const [tdx, tdy] = path[ty][tx]
          this.instrs.push({ x: tx, y: ty, dx: tdx / 2, dy: tdy / 2 })
          tx += tdx
          ty += tdy
        }
        this.instrs.push({ x: tx, y: ty, dx: 0, dy: 0 })
      }
    }
  }
}

class EllerMazeBlock extends MazeBlock {
  constructor(height, width, scale, canvas) {
    super(height, width, scale, canvas)
  }

  initInstrs() {
    let nextRow = []
    const rl = (this.width / this.scale - 1) / 2

    for (let y = 1; y < this.grid.length; y += 2) {
      const row = [...nextRow]
      nextRow.length = 0
      for (let i = 1; i < this.grid[0].length; i += 2) {
        let dup = false
        for (let j = 0; j < row.length; j++) {
          const set = row[j]
          if (set.has(i + rl * y)) dup = true
        }
        if (!dup) row.push(new Set([i + rl * y]))
      }

      for (let t = row.length - 1; t > 0; t--) {
        const j = Math.floor(Math.random() * (t + 1))
        let temp = row[t]
        row[t] = row[j]
        row[j] = temp
      }
      for (const set of row) {
        for (const x of set) {
          this.instrs.push({ x: x - rl * y, y, dx: 0, dy: 0 })
        }
      }

      if (y === this.grid.length - 2) {
        for (let s = 0; s < row.length; s++) {
          for (let s2 = 0; s2 < row.length; s2++) {
            const [set, set2] = [row[s], row[s2]]
            const [x, x2] = this.checkAdj(set, set2)
            if (x !== null) {
              this.instrs.push({ x: x - rl * y, y, dx: 0, dy: 0 })
              this.instrs.push({ x: x2 - rl * y, y, dx: 0, dy: 0 })
              this.instrs.push({ x: x - rl * y, y, dx: (x2 - x) / 2, dy: 0 })
              row[s] = new Set([...row[s], ...row[s2]])
              row.splice(s2, 1)
              s = 0
              s2 = 0
            }
          }
        }
        continue
      }

      for (let s = 0; s < row.length; s++) {
        for (let s2 = 0; s2 < row.length; s2++) {
          const [set, set2] = [row[s], row[s2]]
          const [x, x2] = this.checkAdj(set, set2)
          if (x !== null && Math.random() < 0.5) {
            this.instrs.push({ x: x - rl * y, y, dx: 0, dy: 0 })
            this.instrs.push({ x: x2 - rl * y, y, dx: 0, dy: 0 })
            this.instrs.push({ x: x - rl * y, y, dx: (x2 - x) / 2, dy: 0 })
            row[s] = new Set([...row[s], ...row[s2]])
            row.splice(s2, 1)
            if (s2 < s) s--
          }
        }
      }

      for (let s = 0; s < row.length; s++) {
        const set = row[s]
        let i = 0
        const ri = Math.floor(Math.random() * set.size)

        const nextSet = new Set()
        for (const x of set) {
          if (Math.random() < 0.5 || i === ri) {
            this.instrs.push({ x: x - rl * y, y, dx: 0, dy: 1 })
            this.instrs.push({ x: x - rl * y, y, dx: 0, dy: 2 })
            nextSet.add(x + rl * 2)
          }
          i++
        }
        nextRow.push(nextSet)
      }
    }
  }

  checkAdj(set, set2) {
    if (set === set2) return [null, null]
    for (const x of set) {
      for (const x2 of set2) {
        if (Math.abs(x - x2) === 2) return [x, x2]
      }
    }
    return [null, null]
  }
}