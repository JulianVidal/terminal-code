export class Perceptron {
  constructor (inputs) {
    this.step = x => {
      return x > 0 ? 1 : 0
    }
    this.weights = []
    this.bias = Math.random()
    this.learningRate = 0.1

    for (let index = 0; index < inputs; index++) {
      this.weights[index] = Math.random()
    }

    this.func = x => x
  }

  think (inputs) {
    return this.step(this.weights[0] * inputs[0] + this.weights[1] * inputs[1] + this.bias)
  }

  update () {
    const inputs = [(Math.random() * 4) - 2, (Math.random() * 4) - 2]
    const output = this.think(inputs)

    this.error(inputs, output)
  }

  error (inputs, output) {
    const correctOutput = inputs[1] > this.func(inputs[0]) ? 1 : 0
    const error = output === correctOutput ? 0 : (correctOutput === 1 ? 1 : -1 )

    for (let index = 0; index < this.weights.length; index++) {
      this.weights[index] = this.weights[index] + (this.learningRate * error * inputs[index])
    }

    this.bias = this.bias + (this.learningRate * error)
  }
}
