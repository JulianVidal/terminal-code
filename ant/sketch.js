const grid = []
const cellSize = 10
let lants = []
const population = 1

const w = 600
const h = 600

function setup() {
  createCanvas(w, h)
  frameRate(60)
  makeGrid(grid, cellSize, w, h)
  noStroke()
  for (var i = 0; i < population; i++) {
    lants.push(new ant(0))
  }
}

function draw() {


  drawGrid(grid)

  for (var i = 0; i < lants.length; i++) {
    lants[i].step()
    lants[i].draw()
  }

}

function makeGrid(array, sizeCell, sizexGrid, sizeyGrid) {

  for (var x = 0; x < sizexGrid/sizeCell; x++) {
    array[x] = []
    for (var y = 0; y < sizeyGrid/sizeCell; y++) {
      const pos = createVector(x * sizeCell, y * sizeCell)
      array[x][y] = new cell(pos.x, pos.y, sizeCell)
    }
  }

}

function changeGridColor(array, color) {

  for (var x = 0; x < grid.length; x++) {
    for (var y = 0; y < grid[y].length; y++) {
      grid[x][y].color = color
    }
  }

}

function drawGrid(array) {

  for (var x = 0; x < array.length; x++) {
    for (var y = 0; y < array[x].length; y++) {
      array[x][y].draw()
    }
  }

}
