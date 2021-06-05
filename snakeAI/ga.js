function nextPerson() {
  foods = []
  oldSnakes.push(snakes[index])
  if (index < snakes.length - 1) {
    index++
  } else {
    nextGeneration()
  }
  foods.push(new food(snakes[index].vel))
}

function nextGeneration() {
  index = 0

  generations++

  fitness()

  for (var i = 0; i < population; i++) {
    snakes[i] = pickOne()
  }

  oldSnakes = []

}

function fitness() {

  let totalScore = 0

  for (var i = 0; i < oldSnakes.length; i++) {
    totalScore += oldSnakes[i].score
  }

  for (var i = 0; i < oldSnakes.length; i++) {
    oldSnakes[i].fitness = oldSnakes[i].score / totalScore
  }
}

function pickOne() {
  let index = 0
  let r = random(1)

  while (r > 0) {
    if (index == oldSnakes.length){
      r = 1
    } else {
      r -= oldSnakes[index].fitness
      index++
    }
  }
  index--

  let bestSnake = oldSnakes[index]
  let snakeChild = new player(bestSnake.brain)
  snakeChild.mutate()
  return snakeChild
}
