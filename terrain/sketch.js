let cols
let rows
let scl = 20
let terrain = []
let w = 0
let h = 0
let flying = 0

function setup() {
  createCanvas(720, 520, WEBGL)
  background(0)
  noFill()
  stroke(255)
  strokeWeight(1)

  w = 1000
  h = 1000

  cols = w / scl
  rows = h / scl






}

function draw() {
  flying -= 0.05

  let xoff = 0

  for (var i = 0; i < cols; i++) {
      terrain[i] = []
      let yoff = flying
    for (var j = 0; j < rows; j++) {
      terrain[i][j] = map(noise(xoff, yoff), 0, 1, -100, 100)
      yoff += 0.2
    }
    xoff += 0.2
  }

  background(0)
  rotateX(PI/3)

  translate(-w / 2, -h / 2)

  for (var i = 0; i < rows; i++) {
    beginShape(TRIANGLE_STRIP)
    for (var j = 0; j < cols; j++) {
      vertex((scl * j), (scl * i), terrain[j][i])
      vertex(scl * j, scl * (i + 1), (terrain[j][i + 1]))
    }
    endShape()
  }



}
