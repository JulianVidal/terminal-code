import { Vector } from './Vector.js'
import { Canvas } from './Canvas.js'

/**
 * This is the parent class to all colliders and
 * it contains the function that checls if two
 * colliders are colliding
 */
class Collider {

  /**
   * Chekcs if the colliders are colliding
   * @param {Collider} colliderA 
   * @param {Collider} colliderB 
   * @return {Boolean} True if the colliders are colliding
   */
  static checkCollision (colliderA, colliderB) {

    // It checks if both colliders are close enough
    // to possibly be colliding
    const radiusA = colliderA.getRadius()
    const radiusB = colliderB.getRadius()

    const minDistance = (radiusA + radiusB) ** 2
    const distance = (colliderA.center.x - colliderB.center.x) ** 2 + (colliderA.center.y - colliderB.center.y) ** 2 

    if (distance > minDistance) {
      return false
    }

    // If both colliders are close enough to collide
    // then a deeper check is done to confirm
    let axes = []
    axes = axes.concat(colliderA.getAxes(colliderB))
    axes = axes.concat(colliderB.getAxes(colliderA))

    for (const axis of axes) {
      const projA = colliderA.getMinMaxProjection(axis)
      const projB = colliderB.getMinMaxProjection(axis)
      
      if (projA.max < projB.min || projB.max < projA.min) return false
    }

    return true
  }
}

/**
 * Class representing a collider in the shape of a circle
 * @extends Collider
 */
export class ColliderCircle2D extends Collider {
  /**
   * Creates collider in the shape of a circle
   * @param {Number} x The x-cordinate (from the center)
   * @param {Number} y The y-cordinate (from the center)
   * @param {Number} radius The radius
   */
  constructor (x, y, radius) {
    super()
    this.pos = new Vector(x, y)
    this.center = this.pos
    this.radius = radius
  }

  /**
   * Draws the collider
   * @param {Canvas} canvas The canvas that will be drawn on
   * @param {String} color The color of the collider in any CSS legal Color values
   */
  draw (canvas, color = '#f00') { 
    canvas.setStrokeColor(color)
    canvas.setStrokeWeight(2)
    canvas.drawOutlinedCircle(this.pos.x, this.pos.y, this.radius)
  }

  /**
   * Moves the collider by x and y
   * @param {Number} x The x value
   * @param {Number} y The y value
   */
  changePosition(x, y) {
    const vector = new Vector(x, y)
    this.pos.add(vector)
    this.center = this.pos
  }

  /**
   * Sets the collider's position
   * @param {Vector} vector The vector
   */
  setPosition(vector) {
    this.pos = vector
    this.center = this.pos
  }

  /**
   * Gets the axes that need to be checked during collision detection
   * @param {Collider} collider The other collider that is being checked
   * @returns {Vector} The axis that needs to be checkd
   */
  getAxes(collider) {
    const axis = Vector.substract(this.center, collider.center)
    axis.normalise()
    return axis
  }

  /**
   * Gets the minimum and maxoimum projections on the axis
   * @param {Vector} axis The axis
   * @return {Object} The maximum and minimum projeciton
   */
  getMinMaxProjection (axis) {
    let max = Vector.dot(axis, this.pos) + this.radius
    let min = Vector.dot(axis, this.pos) - this.radius

    return {max, min}
  }

  /**
   * Gets the radius
   * @return {Number} The radius
   */
  getRadius () {
    return this.radius
  }
}

/**
 * Class representing a collider in the shape of a rectangle
 * @extends Collider
 */
export class ColliderBox2D extends Collider {
  /**
   * Creates collider in the shape of a rectangle
   * @param  {Number} x The x-coordinate (from the top-left corner)
   * @param  {Number} y The y-coordinate (from the top-left corner)
   * @param  {Number} width The width
   * @param  {Number} height The height
   */
  constructor (x, y, width, height) {
    super()
    this.pos = new Vector(x, y)
    this.width = width
    this.height = height

    this.rotation = 0

    this.center = new Vector(x + width / 2, y + height / 2)

    // All the vertices of the rectangle as vectors
    this.vectors = []

    this.vectors[0] = new Vector(x, y)
    this.vectors[1] = new Vector(x + width, y)
    this.vectors[2] = new Vector(x + width, y + height)
    this.vectors[3] = new Vector(x, y + height)

    // Rotates the vectors by this.rotation
    for (let i = 0; i < this.vectors.length; i++) {
      this.vectors[i].substract(this.center)
      const x = this.vectors[i].x
      const y = this.vectors[i].y

      this.vectors[i].x = x * Math.cos(this.rotation) - y * Math.sin(this.rotation)
      this.vectors[i].y = x * Math.sin(this.rotation) + y * Math.cos(this.rotation)

      this.vectors[i].add(this.center)
    }
  }

  /**
   * Draws the collider
   * @param {Canvas} canvas The canvas that will be drawn on
   * @param {String} color The color of the collider in any CSS legal Color values
   */
  draw (canvas, color = '#f00') {
    canvas.setStrokeColor(color)
    canvas.setStrokeWeight(2)

    canvas.drawOutlinedQuadrilateral( this.vectors[0].x, this.vectors[0].y, 
                              this.vectors[1].x, this.vectors[1].y, 
                              this.vectors[2].x, this.vectors[2].y, 
                              this.vectors[3].x, this.vectors[3].y)

    canvas.drawLine(this.vectors[0].x, this.vectors[0].y, this.vectors[2].x, this.vectors[2].y)
    canvas.drawLine(this.vectors[1].x, this.vectors[1].y, this.vectors[3].x, this.vectors[3].y)
  }

  /**
   * Moves the collider by x and y
   * @param {Number} x The x value
   * @param {Number} y The y value
   */
  changePosition(x, y) {
    const vector = new Vector(x, y)

    this.pos.add(vector)
    this.center.add(vector)
    this.vectors[0].add(vector)
    this.vectors[1].add(vector)
    this.vectors[2].add(vector)
    this.vectors[3].add(vector)
  }

  /**
   * Sets the collider's position
   * @param {Vector} vector The vector
   */
  setPosition(vector) {

    this.pos = vector

    this.center = new Vector(this.pos.x + this.width / 2, this.pos.y + this.height / 2)

    // All the vertices of the rectangle as vectors
    this.vectors = []

    this.vectors[0] = new Vector(this.pos.x, this.pos.y)
    this.vectors[1] = new Vector(this.pos.x + this.width, this.pos.y)
    this.vectors[2] = new Vector(this.pos.x + this.width, this.pos.y + this.height)
    this.vectors[3] = new Vector(this.pos.x, this.pos.y + this.height)
  }

  /**
   * Rotates the collider
   * @param {Number} angle The angle
   */
  rotate(angle) {
    this.rotation += angle

    for (let i = 0; i < this.vectors.length; i++) {
      this.vectors[i].substract(this.center)
      const x = this.vectors[i].x
      const y = this.vectors[i].y

      this.vectors[i].x = x * Math.cos(angle) - y * Math.sin(angle)
      this.vectors[i].y = x * Math.sin(angle) + y * Math.cos(angle)

      this.vectors[i].add(this.center)
    }
  }

  /**
   * Gets the axes that need to be checked during collision detection
   * @returns {Vector} The axes that needs to be checkd
   */
  getAxes() {
    const axes = []
    
    for (let i = 0; i < this.vectors.length / 2; i++) {

      const vectorA = this.vectors[i]
      const vectorB = this.vectors[i + 1]

      const axis = Vector.substract(vectorA, vectorB)
      axis.normalise()

      axes.push(axis)
    }

    return axes
  }

  /**
   * Gets the minimum and maxoimum projections on the axis
   * @param {Vector} axis The axis
   * @return {Object} The maximum and minimum projeciton
   */
  getMinMaxProjection (axis) {
    let max = Vector.dot(axis, this.vectors[0])
    let min = Vector.dot(axis, this.vectors[0])

    for (let j = 1; j < this.vectors.length; j++) {
      if (Vector.dot(axis, this.vectors[j]) > max) {
        max = Vector.dot(axis, this.vectors[j])
      }
      if (Vector.dot(axis, this.vectors[j]) < min) {
        min = Vector.dot(axis, this.vectors[j])
      }
    }

    return {max, min}
  }

  /**
   * Gets the radius
   * @return {Number} The radius
   */
  getRadius () {
    return Vector.substract(this.vectors[0], this.center).getMagnitude()
  }
}