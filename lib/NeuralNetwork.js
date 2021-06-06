import { Matrix } from './Matrix.js'

/**
 * Class representing a neural network
 */
export class NeuralNetwork {
  /**
   * Creates a neural network 1 layer deep
   * @param {Number} inputNodes The amount of inputs
   * @param {Number} hiddenNodes The amount of hiddens
   * @param {Number} outputNodes The amount of outputs
   */
  constructor (inputNodes, hiddenNodes, outputNodes) {
    this.sigmoid = x => 1 / (1 + Math.pow(Math.E, -x))
    this.relu = x => (x > 0 ? x : 0)
    this.step = x => (x >= 0 ? 1 : -1)
    this.func = x => (x)
    this.learning_rate = 10

    if (!Number.isInteger(inputNodes)) {
      const original = inputNodes

      this.hiddenNodes = original.hiddenNodes
      this.outputNodes = original.outputNodes
      this.inputNodes = original.inputNodes

      this.inputToHidden = original.inputToHidden
      this.hiddenToOutput = original.hiddenToOutput
    } else {
      this.hiddenNodes = hiddenNodes
      this.outputNodes = outputNodes
      this.inputNodes = inputNodes

      this.inputToHidden = []

      // Initializes weights randomyl between -1,1

      for (let y = 0; y < hiddenNodes; y++) {
        this.inputToHidden[y] = []

        for (let x = 0; x < inputNodes + 1; x++) {
          this.inputToHidden[y][x] = Math.random() * 2 - 1
        }
      }

      this.inputToHidden = new Matrix(this.inputToHidden)

      this.hiddenToOutput = []

      for (let y = 0; y < outputNodes; y++) {
        this.hiddenToOutput[y] = []

        for (let x = 0; x < hiddenNodes + 1; x++) {
          this.hiddenToOutput[y][x] = Math.random() * 2 - 1
        }
      }

      this.hiddenToOutput = new Matrix(this.hiddenToOutput)
    }
  }

  /**
   * Runs the neural network using the given inputs
   * @param {Number[]} inputs The inputs
   * @returns {Number[]} The output
   */
  think (inputs) {
    let inputsM = [1, ...inputs]

    inputsM.forEach((element, index) => {
      inputsM[index] = [element]
    })

    inputsM = new Matrix(inputsM)

    const hidden = Matrix.multiply(this.inputToHidden, inputsM)

    hidden.map(element => this.sigmoid(element))

    hidden.matrix = [[1], ...hidden.matrix]

    const output = Matrix.multiply(this.hiddenToOutput, hidden)

    output.map(element => this.sigmoid(element))

    return output.matrix
  }

  /**
   * Copies the neural network
   * @returns {NeuralNetwork} The neural network
   */
  copy () {
    return new NeuralNetwork(JSON.parse(JSON.stringify(this)))
  }

  /**
   * Adjust weights randomly
   * @returns {NeuralNetwork} The adjusted neural network
   */
  mutate () {
    for (let y = 0; y < this.inputToHidden.matrix.length; y++) {
      for (let x = 0; x < this.inputToHidden.matrix[0].length; x++) {
        if (Math.random() < 1 / this.learning_rate) {
          this.inputToHidden.matrix[y][x] += Math.random() - 1
        }
      }
    }

    for (let y = 0; y < this.hiddenToOutput.matrix.length; y++) {
      for (let x = 0; x < this.hiddenToOutput.matrix[0].length; x++) {
        if (Math.random() < 1 / this.learning_rate) {
          this.hiddenToOutput.matrix[y][x] += Math.random() - 1
        }
      }
    }

    return this
  }
}
