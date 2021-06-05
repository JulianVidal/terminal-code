const w = 600
const h = 300

const size = 2

const state1 = [0,    0,    0,
                      255
]
const state2 = [0,    0,    255,
                      255
]
const state3 = [0,   255,  0,
                      255
]
const state4 = [0,   255,  255,
                      0
]
const state5 = [255,  0,    0,
                      0
]
const state6 = [255,  0,    255,
                      0
]
const state7 = [255, 255,  0,
                      0
]
const state8 = [255, 255,  255,
                      255
]

const stateArr = [
  state1,
  state2,
  state3,
  state4,
  state5,
  state6,
  state7,
  state8
]

let grid = []

function setup() {
  createCanvas(w, h)

  for (var x = 0; x < w/size; x++) {
    grid[x] = []
    for (var y = 0; y < h/size; y++) {
      grid[x][y] = new cell(x, y, size)
    }
  }

grid[(w / size) / 2][0].fillColor = 0

/*for (var x = 0; x < grid.length; x++) {
  for (var y = 0; y < grid[x].length; y++) {
    if (Math.random() < 0.5) {
      grid[x][y].fillColor = 0
    }
  }
}*/

}

function draw() {

  let momentCells = []

  for (var x = 0; x < grid.length; x++) {
    momentCells[x] = []
    for (var y = 0; y < grid[x].length; y++) {
      momentCells[x][y] = grid[x][y]
    }
  }

  for (var x = 0; x < momentCells.length; x++) {
    for (var y = 1; y < momentCells[x].length; y++) {
        let xIndex = x
        let yIndex = y

        let xLeftIndex = x - 1
        let xRightIndex = x + 1

        let yUpIndex = y - 1


        if (xRightIndex == momentCells.length) {
          xRightIndex = 0
        }
        if (xLeftIndex == -1) {
          xLeftIndex = momentCells.length - 1
        }
        if (yUpIndex == -1) {
          yUpIndex = momentCells[x].length - 1
        }

    for (var i = 0; i < stateArr.length; i++) {
        if ( momentCells[xLeftIndex] [yUpIndex].fillColor == stateArr[i][0]
          && momentCells[xIndex]     [yUpIndex].fillColor == stateArr[i][1]
          && momentCells[xRightIndex][yUpIndex].fillColor == stateArr[i][2]
        ){
          momentCells[xIndex][yIndex].fillColor = stateArr[i][3]
          break
        }
      }
    }

  }

  for (var x = 0; x < momentCells.length; x++) {
    for (var y = 0; y < momentCells[x].length; y++) {
      grid[x][y] = momentCells[x][y]
    }
  }

  for (var x = 0; x < grid.length; x++) {
    for (var y = 0; y < grid[x].length; y++) {
      grid[x][y].draw()
    }
  }

}
