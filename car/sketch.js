let car
let enemies = []

let counter = 0
let enemyRate = 5

function setup() {
  createCanvas(560, 600)

  enemies.push(new enemy())

  car = new player()
}

function draw() {
  counter ++
  background(0)
  fill(100)
  rect(width/4, 0, width/2 - car.sizex + 10, height)
  fill('#33FF77')
  rect(0, 0, width/4, height)
  rect(width - width/4 - 5, 0, width/4 + 5, height)

  if (counter == enemyRate) {
    enemies.push(new enemy())
    enemyRate += 5
  }

  for (var i = enemies.length; i > 0; i--) {
    enemies[enemies.length - 1].overlap((i - 1))
    enemies[i - 1].draw()
    enemies[i - 1].update((i - 1))
    if (car.pos.x == enemies[i - 1].pos.x) {
      car.collision(enemies[i - 1].box)
    }
  }

  car.draw()
  car.update()

}

function keyPressed() {
  if (keyCode == LEFT_ARROW) {
    car.left()
  }
  if (keyCode == RIGHT_ARROW) {
    car.right()
  }
}
