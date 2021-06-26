const scale = 40
const height = (Math.floor(window.innerHeight / scale) - 1) * scale
const width = (Math.floor(window.innerWidth / scale) -1 ) * scale

const grid = new Mazes(height, width, scale)
grid.drawMazeAnim('RecursiveDivision')
