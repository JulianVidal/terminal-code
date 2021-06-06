/**
 * Class representing a matrix
 */
export class Matrix {
  /**
   * Creates a matrix
   * @param {Array.<Array.<Number>>} array 
   */
  constructor (array) {
    this.matrix = array
  }

  /**
   * Calls a function on each value of the matrix
   * @param {Function} callback The function
   */
  map(callback) {
    for (let y = 0; y < this.matrix.length; y++) {
      for (let x = 0; x < this.matrix[0].length; x++) {
        this.matrix[y][x] = callback(this.matrix[y][x])
      }
    }
  }

  /**
   * Calls a function on each value of the matrix
   * @param {Matrix} matrix The matrix
   * @param {Function} callback The function
   * @returns {Matrix} The mapped matrix
   */
  static map({matrix}, callback) {
    const mappedMatrix = []

    for (let y = 0; y < matrix.length; y++) {
      mappedMatrix[y] = []

      for (let x = 0; x < matrix[0].length; x++) {
        mappedMatrix[y][x] = callback(matrix[y][x])
      }

    }

    return new Matrix(mappedMatrix)
  }

  /**
   * Adds called matrix and a given matrix
   * @param {Matrix} matrix The given matrix
   */
  add ({matrix}) {
    if (this.matrix.length !== matrix.matrix.length) return
    if (this.matrix[0].length !== matrix.matrix[0].length) return

    let addedMatrix = []

    for (let i = 0; i < this.matrix.length; i++) {
      addedMatrix[i] = []
      for (let j = 0; j < this.matrix[0].length; j++) {
        addedMatrix[i][j] = this.matrix[i][j] + matrix.matrix[i][j]
      }
    }
    return new Matrix(addedMatrix)
  }

  /**
   * Adds matrices
   * @param {Matrix} matrixA The matrix
   * @param {Matrix} matrixB The second matrix
   * @returns {Matrix} The sum of the matrices
   */
  static add(matrixA, matrixB) {
    if (matrixA.matrix.length !== matrixB.matrix.length) {
      console.error('Matrix cannot be added')
      return
    }
    if (matrixA.matrix[0].length !== matrixB.matrix[0].length) {
      console.error('Matrix cannot be added')
      return
    }

    let addedMatrix = []

    for (let i = 0; i < matrixA.matrix.length; i++) {
      addedMatrix[i] = []
      for (let j = 0; j < matrixA.matrix[0].length; j++) {
        addedMatrix[i][j] = matrixA.matrix[i][j] + matrixB.matrix[i][j]
      }
    }
    return new Matrix(addedMatrix)
  }

  /**
   * Scales the matrix
   * @param {Number} constant The scalar value
   */
  scale(constant) {
    for (let i = 0; i < this.matrix.length; i++) {
      for (let j = 0; j < this.matrix[0].length; j++) {
        this.matrix[i][j] *= constant
      }
    }
  }

  /**
   * Scales a matrix
   * @param {Matrix} matrix The matrix
   * @param {Number} constant The scalar value
   * @returns {Matrix} The scaled matrix
   */
  static scale({ matrix }, constant) {
    let scaledMatrix = []

    for (let i = 0; i < matrix.length; i++) {
      scaledMatrix[i] = []
      for (let j = 0; j < matrix[0].length; j++) {
        scaledMatrix[i][j] = matrix[i][j] * constant
      }
    }

    return new Matrix(scaledMatrix)
  }

  /**
   * Transposes the matrix
   */
  transpose() {
    const transposedMatrix = []

    for (let j = 0; j < this.matrix[0].length; j++) {
      transposedMatrix[j] = []

      for (let i = 0; i < this.matrix.length; i++) {
        transposedMatrix[j][i] = this.matrix[i][j]
      }
    }

    this.matrix = transposedMatrix
  }

  /**
   * Transpose a matrix
   * @param {Matrix} matrix The matrix
   * @returns {Matrix} The transposed matrix
   */
  static transpose ({ matrix }) {
    const transposedMatrix = []

    for (let j = 0; j < matrix[0].length; j++) {
      transposedMatrix[j] = []

      for (let i = 0; i < matrix.length; i++) {
        transposedMatrix[j][i] = matrix[i][j]
      }
    }

    return new Matrix(transposedMatrix)
  }

  /**
   * Multiplies called matrix and a given matrix
   * @param {Matrix} matrix The given matrix
   */
  multiply ({ matrix }) {
    if (this.matrix[0].length !== matrix.length) {
      console.error('Matrix cannot be multiplied')
      return
    }

    let multipliedMatrix = []

    for (let i = 0; i < this.matrix.length; i++) {
      multipliedMatrix[i] = []

      for (let k = 0; k < matrix[0].length; k++) {
        let value = 0

        for (let j = 0; j < matrix.length; j++) {
          value += this.matrix[i][j] * matrix[j][k]
        }

        multipliedMatrix[i][k] = value
      }
    }
    
    this.matrix = multipliedMatrix
  }

  /**
   * Multiplies matrices
   * @param {Matrix} matrixA The matrix
   * @param {Matrix} matrixB The second matrix
   * @returns {Matrix} The product of the matrices
   */
  static multiply (matrixA, matrixB) {
    if (matrixA.matrix[0].length !== matrixB.matrix.length) {
      console.error('Matrix cannot be multiplied')
      return
    }

    let multipliedMatrix = []

    for (let i = 0; i < matrixA.matrix.length; i++) {
      multipliedMatrix[i] = []

      for (let k = 0; k < matrixB.matrix[0].length; k++) {
        let value = 0

        for (let j = 0; j < matrixB.matrix.length; j++) {
          value += matrixA.matrix[i][j] * matrixB.matrix[j][k]
        }

        multipliedMatrix[i][k] = value
      }
    }

    return new Matrix(multipliedMatrix)
  }
}
