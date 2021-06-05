import { Canvas } from './Canvas.js'
import { Perceptron } from './Perceptron.js'

const canvas = new Canvas(500, 500)
const perceptron = new Perceptron(2)

const points = []
const population = 500

function setup() {
  canvas.globalColor = '#333'
  canvas.drawBackground()

  for (let index = 0; index < population; index++) {
    points.push({ x: Math.random() * 4 - 2, y: Math.random() * 4 - 2 })
  }

  canvas.loop(draw)
  draw()
}

function draw() {
  perceptron.update()

  for (const point of points) {
    const color = perceptron.think([point.x, point.y])
    canvas.setColor(color === 1 ? '#00ff00' : '#ff0000')
    canvas.drawFilledCircle((point.x + 2) * 125, (point.y * -1 + 2) * 125, 5)
  }
}

setup()
