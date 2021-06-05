const h = 600
const w = 600

let firstTriangle

let trianglesFrac = []

let iterations = 0

let interation_max = 3

let i = 0

function setup() {

  createCanvas(w, h)

  firstTriangle = new triangleFrac(
                                  0,   h,
                                  w/2, 0,
                                  w,   h,
                                  0
                                  )
  trianglesFrac.push(firstTriangle)

}

function draw() {

  if (iterations != interation_max) {
    let triangleIndex = trianglesFrac.length - 1

    for (i; i < 2; i++) {
      console.log(triangleIndex);
      let midpointArr = [
        createVector(
                      (trianglesFrac[0].pointArr[0].x + trianglesFrac[triangleIndex].pointArr[1].x) / 2,
                      (trianglesFrac[0].pointArr[0].y + trianglesFrac[triangleIndex].pointArr[1].y) / 2
                    ),
        createVector(
                      (trianglesFrac[0].pointArr[1].x + trianglesFrac[triangleIndex].pointArr[2].x) / 2,
                      (trianglesFrac[0].pointArr[1].y + trianglesFrac[triangleIndex].pointArr[2].y) / 2
                    ),
        createVector(
                      (trianglesFrac[0].pointArr[2].x + trianglesFrac[triangleIndex].pointArr[0].x) / 2,
                      (trianglesFrac[0].pointArr[2].y + trianglesFrac[triangleIndex].pointArr[0].y) / 2
                    )

      ]

      trianglesFrac.push( new triangleFrac(
                                              midpointArr[0].x,
                                              midpointArr[0].y,

                                              midpointArr[1].x,
                                              midpointArr[1].y,

                                              midpointArr[2].x,
                                              midpointArr[2].y,
                                              255
                                              )
                        )
      triangleIndex++
    }

    iterations++

  } else {
    noLoop()
  }


  for (var b = 0; b < trianglesFrac.length; b++) {
    trianglesFrac[b].draw()
  }


}
