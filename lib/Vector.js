export class Vector {
  /**
   * Creates a vector at x, y, it can be used in operations
   * @param  {Number} x The x-coordinate of the vector
   * @param  {Number} y The y-coordinate of the vector
   */
  constructor(x, y) {
    this.x = x
    this.y = y

    this.limiter = Infinity
  }

  /**
   * Adds called vector and a given vector
   * @param  {Vector} vector The given vector
   */
  add(vector) {
    if (Vector.findMagnitude({x: this.x + vector.x, y: this.y + vector.y}) > this.limiter) return

    this.x += vector.x
    this.y += vector.y
  }

  /**
   * Adds vectors
   * @param  {Vector} vectorA The vector
   * @param  {Vector} vectorB The second vector
   * @returns {Vector} The sum of the vectors
   */
  static add(vectorA, vectorB) {
    const x = vectorA.x + vectorB.x
    const y = vectorA.y + vectorB.y

    return new Vector(x, y)
  }

  /**
   * Substracts called vector and a given vector
   * @param {Vector} vector The given vector
   */
  substract(vector) {
    this.x -= vector.x
    this.y -= vector.y
  }

  /**
   * Substracts vectors
   * @param {Vector} vectorA The vector
   * @param {Vector} vectorB The second vector
   * @returns {Vector} The substraction of the vectors
   */
  static substract(vectorA, vectorB) {
    const x = vectorA.x - vectorB.x
    const y = vectorA.y - vectorB.y

    return new Vector(x, y)
  }

  /**
   * Normalises the vector
   */
  normalise() {
    const magnitude = this.getMagnitude()
    this.x /= magnitude
    this.y /= magnitude
  }

  /**
   * Normalises the vector
   * @param {Vector} vector The vector
   * @returns {Vector} The normalised vector
   */
  static normalise(vector) {
    const magnitude = vector.getMagnitude()

    const x = vector.x / magnitude
    const y = vector.y / magnitude

    return new Vector(x, y)
  }

  /**
   * Scales vector
   * @param {Number} scalar 
   */
  scale(scalar) {
    this.x *= scalar
    this.y *= scalar
  }

  /**
   * Scales vector
   * @param {Vector} vector The vector
   * @param {Number} scalar The scalar
   * @returns {Vector} The scaled vector
   */
  static scale(vector, scalar) {
    return new Vector(vector.x * scalar, vector.y * scalar)
  }

  /**
   * The dot product of the called vector and given vector
   * @param {Vector} vector The given vector
   * @returns {Number} The dot product
   */
  dot(vector) {
    return this.x * vector.x + this.y * vector.y
  }

  /**
   * The dot product of the vectors
   * @param {Vector} vectorA The vector
   * @param {Vector} vectorB The second vector
   * @returns {Number} The dot product
   */
  static dot(vectorA, vectorB) {
    return vectorA.x * vectorB.x + vectorA.y * vectorB.y
  }

  /**
   * Limits the magnitude of the vector
   * @param {Number} limit The limit
   */
  setLimit(limit) {
    this.limiter = limit
  }

  /**
   * Gets the magnitude
   * @returns {Number} The magnitude
   */
  getMagnitude() {
    return Math.sqrt(this.x ** 2 + this.y ** 2)
  }

  /**
   * Gets the angle
   * @returns {Number} The angle
   */
  getAngle() {
    return Math.atan(this.y / this.x)
  }

  /**
   * Finds the magnitude of a vector x, y
   * @param {Number} x The x compoenent
   * @param {Number} y The y component
   * @returns {Number} The magnitude
   */
  static findMagnitude(x, y) {
    return Math.sqrt(x ** 2 + y ** 2)
  }

  /**
   * Finds the angle of a vector x, y
   * @param {Number} x The x compoenent
   * @param {Number} y The y component
   * @returns {Number} The angle
   */
  static findAngle(x, y) {
    return Math.atan(y / x)
  }
}
