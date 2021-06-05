let snakes = []

let foods = []

let foodrate = 15

let index = 0

let population =  200

let slider

let generations = 0

let oldSnakes = []

function setup() {

  createCanvas(500, 500)

  slider = createSlider(1,1000, 1, 1)

  for (var i = 0; i < population; i++) {
    snakes.push(new player())
  }

  foods.push(new food(snakes[0].vel))

  frameRate(7)
}

function draw() {

for (x = 0; x < slider.value(); x++ ){

  snakes[index].think()
  snakes[index].itself()
  snakes[index].update()

  for (var i = 0; i < foods.length; i++) {
    snakes[index].collision(foods[i], i)
  }
  }

  background(0)
  for (var i = 0; i < foods.length; i++) {
    foods[i].draw()
  }
  snakes[index].draw()

  textSize(20)
  text(generations, 10, 23)

}
