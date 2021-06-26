const scale = 20
// const height = (Math.floor(window.innerHeight / scale) - 1) * scale
// const width = (Math.floor(window.innerWidth / scale) - 1 ) * scale
const height = 200
const width = 200

const grid = new Mazes(height, width, scale)
grid.drawMazeAnim('BinaryTree')
const grid1 = new Mazes(height, width, scale)
grid1.drawMazeAnim('AldousBroder')
const grid2 = new Mazes(height, width, scale)
grid2.drawMazeAnim('RecursiveBacktracker')
const grid3 = new Mazes(height, width, scale)
grid3.drawMazeAnim('HuntAndKill')
const grid4 = new Mazes(height, width, scale)
grid4.drawMazeAnim('RecursiveDivision')
const grid5 = new Mazes(height, width, scale)
grid5.drawMazeAnim('Sidewinder')
const grid6 = new Mazes(height, width, scale)
grid6.drawMazeAnim('Kruskal')
const grid7 = new Mazes(height, width, scale)
grid7.drawMazeAnim('GrowingTree')
const grid8 = new Mazes(height, width, scale)
grid8.drawMazeAnim('Prim')
const grid9 = new Mazes(height, width, scale)
grid9.drawMazeAnim('Wilson')
const grid10 = new Mazes(height, width, scale)
grid10.drawMazeAnim('Eller')