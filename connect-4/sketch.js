let holes = []
let cols = 7
let rows = 6

function setup() {

  createCanvas(650, 500)

  for (let i = 0; i < rows; i++){
    for(let j = 0; j < cols; j++){
      holes.push(new hole(j, i))
    }
  }

}

function draw() {

  background(0)

  rectMode(CENTER)
  fill(255)
  rect( width / 2, height / 2, 600, 400)

  for (let i = 0; i < holes.length; i++)
  holes[i].draw()
}
