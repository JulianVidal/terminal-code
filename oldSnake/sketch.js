let snake

let foods = []

let foodrate = 15

let counter = 0

function setup() {
  createCanvas(500, 500)

  snake = new player()

  frameRate(7)
}

function draw() {
  background(0)

  if (counter == foodrate) {
    foods.push(new food())
    foodrate += foodrate
  }

  for (var i = 0; i < foods.length; i++) {
    foods[i].draw()
  }

  snake.draw()
  snake.update()
  for (var i = 0; i < foods.length; i++) {
    snake.collision(foods[i])
  }

  counter++
}

function keyPressed() {
  if (keyCode == UP_ARROW) {
    if (snake.vel.y != snake.speed){
      snake.vel = createVector(0, -snake.speed)
    }
  }
  if (keyCode == DOWN_ARROW) {
    if (snake.vel.y != -snake.speed){
      snake.vel = createVector(0, snake.speed)
    }
  }
  if (keyCode == LEFT_ARROW) {
    if (snake.vel.x != snake.speed) {
      snake.vel = createVector(-snake.speed, 0)
    }
  }
  if (keyCode == RIGHT_ARROW) {
    if (snake.vel.x != -snake.speed) {
      snake.vel = createVector(snake.speed, 0)
    }
  }
}
