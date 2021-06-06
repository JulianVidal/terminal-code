// // Testing Vectors
// import { Vector } from './Vector.js'

// const v1 = new Vector(1, 2)
// const v2 = new Vector(5, 6)

// console.log('Vectors', v1, v2)
// console.log('Vector addition', Vector.add(v1, v2))
// console.log('Vector substract', Vector.substract(v1, v2))
// console.log('Vector normalise', Vector.normalise(v1))
// console.log('Vector scale', Vector.scale(v2, 2))
// console.log('Vector dot', Vector.dot(v1, v2))
// console.log('Vector magnitude', Vector.findMagnitude(v1.x, v1.y))
// console.log('Vector angle', Vector.findAngle(v1.x, v1.y))

// // Testing Matrices

// import { Matrix } from './lib.js'

// const m1 = new Matrix([[1,2], [3,4]])
// const m2 = new Matrix([[5,6], [7,8]])

// console.log('Matrices', m1, m2)
// console.log('Map', Matrix.map(m1, x => 2 * x))
// console.log('M1 + M2', Matrix.add(m1, m2))
// console.log('5 x M2', Matrix.scale(m2, 5))
// console.log(Matrix.transpose(m1))
// console.log(Matrix.multiply(m1, m2))

// // Collider Test

// import { Canvas, ColliderBox2D, ColliderCircle2D } from './lib.js'

// const canvas = new Canvas(500, 500)

// const colliderA = new ColliderCircle2D(60, 100, 50)
// const colliderB = new ColliderBox2D(150, 250, 100, 100)

// canvas.drawBackground('#212121')

// // ColliderBox2D.checkCollision(colliderA, colliderB)

// function draw() {
//   canvas.drawBackground('#212121')
//   let color = ColliderBox2D.checkCollision(colliderA, colliderB, canvas) ? '#0f0' : '#f00'
//   colliderA.draw(canvas, color)
//   colliderB.draw(canvas, color)

// }

// canvas.loop(draw)

// window.onkeypress = event => {

//     if (event.key === ' ') {
//       console.log(event.key)
//       if (canvas.isLooping) {
//         canvas.noLoop()
//       } else {
//         canvas.loop(draw)
//       }
//     }

//   switch (event.key) {
//     case 'd':
//       colliderA.changePosition(5, 0)
//       break;
//     case 'a':
//       colliderA.changePosition(-5, 0)
//       break; 
//     case 'w':
//       colliderA.changePosition(0, -5)
//       break;
//     case 's':
//       colliderA.changePosition(0, 5)
//       break; 
//     case 'q':
//       colliderA.rotate(-Math.PI / 16)
//       break;
//     case 'e':
//       colliderA.rotate(Math.PI / 16)
//       break; 
//   }
// }



// // Canvas Testing

// import { Canvas } from './lib.js'
// import { greystone } from './Image.js'

// const canvas = new Canvas(500, 500)

// canvas.drawBackground('#212121')

// canvas.setColor('#DDD')
// canvas.setStrokeColor('#DDD')

// canvas.drawFilledRectangle(10, 10, 50, 50)
// canvas.drawOutlinedRectangle(70, 10, 50, 50)

// canvas.drawFilledCircle(130 + 25, 10 + 25, 25)
// canvas.drawOutlinedCircle(180 + 35, 10 + 25, 25)

// canvas.drawImage(greystone, 250, 10, 50, 50)

// canvas.drawLine(310, 10, 360, 50)

// canvas.drawOutlinedHeart(380 + 25, 10 + 25, 2)
// canvas.drawFilledHeart(20 + 25, 70 + 25, 2)

// canvas.drawFilledQuadrilateral(90, 70, 190, 90, 170, 130, 100, 110)
// canvas.drawOutlinedQuadrilateral(210, 70, 310, 90, 290, 130, 220, 110)
