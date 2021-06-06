import { Canvas } from '../../lib.js'
import { Bird } from './Bird.js'
import { Bar } from './Bar.js'

const canvas = new Canvas(500, 500)

const birds = []
const deadBirds = []
let bars = []

let repetitions = 1
let generations = 0

const population = 250

let frameCount = 0

function setup () {
  canvas.loop(draw)

  for (let i = 0; i < population; i++) {
    birds[i] = new Bird(125, canvas.height / 2, canvas)
  }
}

function draw () {
  canvas.setColor('#000')
  canvas.drawBackground()

  for (const bird of birds) {
    bird.draw()
  }

  for (let i = bars.length - 1; i >= 0; i--) {
    const bar = bars[i]
    bar.draw()
  }

  repetitions = document.getElementById('repeat').value

  for (let repeated = 0; repeated < repetitions; repeated++) {
    for (const bird of birds) {
      bird.update()
      bird.think(bars)
    }

    for (let i = bars.length - 1; i >= 0; i--) {
      const bar = bars[i]
      bar.update()
      bar.draw()

      if (bar.barTopPos.x + bar.width < 0) bars.shift()
    }

    for (let i = 0; i < bars.length; i++) {
      const bar = bars[i]

      for (let j = 0; j < birds.length; j++) {
        const bird = birds[j]
        if (
          bird.pos.x + bird.radius > bar.barTopPos.x &&
          bird.pos.x - bird.radius < bar.barTopPos.x + bar.width &&
          bird.pos.y - bird.radius < bar.barTopHeight
        ) deadBirds.push(birds.splice(j, 1)[0])
        if (
          bird.pos.x + bird.radius > bar.barBottomPos.x &&
          bird.pos.x - bird.radius < bar.barBottomPos.x + bar.width &&
          bird.pos.y + bird.radius > bar.barBottomPos.y
        ) deadBirds.push(birds.splice(j, 1)[0])
        if (bird.pos.y + bird.radius > bird.canvas.height) deadBirds.push(birds.splice(j, 1)[0])
        if (bird.pos.y - bird.radius < 0) deadBirds.push(birds.splice(j, 1)[0])
      }
    }

    if ((frameCount - 1) % 125 === 0) bars.push(new Bar(canvas))
    if (birds.length === 0) newPopulation()
    frameCount++
  }
}

function keyPressed (e) {
  if (e.key === ' ') {
    if (canvas.isLooping) {
      canvas.noLoop()
    } else {
      canvas.loop(draw)
    }
  }
}

setup()

function newPopulation () {
  canvas.noLoop()
  bars = []

  const bestBird = fittest()

  for (let i = 0; i < population; i++) {
    birds[i] = new Bird(
      125,
      canvas.height / 2,
      canvas,
      bestBird.brain.copy().mutate()
    )
  }

  frameCount = 0
  generations++
  document.getElementById('generations').textContent = 'Generations ' + generations
  canvas.loop(draw)
}

function fittest () {
  let bestScore = 0
  let bestBird = deadBirds[0]

  for (const bird of deadBirds) {
    if (bird.score > bestScore) {
      bestScore = bird.score
      bestBird = bird
    }
  }

  return bestBird
}

window.onkeypress = event => {
  if (event.key === ' ') {
    console.log(event.key)
    if (canvas.isLooping) {
      canvas.noLoop()
    } else {
      canvas.loop(draw)
    }
  }
}
