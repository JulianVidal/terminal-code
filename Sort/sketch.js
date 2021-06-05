//Width of each bar
const wide =   1

//Height and Width of the canvas
const w    =  2000
const h    =  400

//Declaration of the array that will contain all the bars
let bars   =  []

let buttons = []

//Declaration of index that will keep track of the current index of the bar we are comparing
var index  =  0

//Declares and defines the background color
let backgroundColor = 255

//Declares the slider that will change the speed
let slider

let wideInput

//Makes the animation of the green color slowly filling the bars
let colorIndex = 0

//Different booleans that will control what is drawn on the canvas
//
//Controls if the main menu will be draw
let mainMenu = true

//Controls if the bubble sorting will be drawn
let bubble = false

//Controls if the insertion algorithm will be drawn
let insertion = false

//Controls if the quick sort algorithm will be drawn
let quick = false

//Controls if the parameter selection will be drawn
let parameter = false

let partition = false

let partitions = 0

let partitions_max = 20

let counter = 0

let seconds = 0

let sec;


function setup() {

  //Creates the canvas based on our Height and Width
  createCanvas(w, 600)

  //Sets the framerate of the draw function
  frameRate(60)

  setupBars()

  //Creates slider that will speed the sorting
  //slider = createSlider(1, 50, 1, 1)

  //wideInput = createInput()

  //wideInput.position(35, h / 2)

  //Creates the buttons at the main menu
  let center = 210
  buttons.push(new button(center, h / 4, 200, 100, "Bubble Sort"))
  buttons.push(new button(center, (2 * h) / 4 + 10, 200, 100, "Insertion Sort"))
  buttons.push(new button(center, (3 * h) / 4 + 20, 200, 100, "Quick sort"))
}

function draw() {

  if (mainMenu == true) {

    //Changes the background color to backgroundColor
    background(backgroundColor)

    //Draws the buttons that were declared in setup
    for (var i = 0; i < buttons.length; i++) {

      buttons[i].draw()

    }

  }

  if (bubble == true){

    //Will repeat multiple times a frame depending on the slider value
    for (var t = 0; t < 1; t++) {

      //Makes the canvas's background the color of backgroundColor
      background(backgroundColor)

      //Draws each barr
      for (var i = 0; i < bars.length; i++) {
        bars[i].draw()
      }

      //Bubble sorting
      if (index < bars.length - 1) {

        //Stores the index of the current bar that is being compared
        let comparingI    =  bars.findIndex(bar => bar.pos.x == index * wide)
        //Stores the index of the bar to the right of the current bar that is being compared
        let comparedI     =  bars.findIndex(bar => bar.pos.x == index * wide + wide)

        //Stores the size of the current bar
        let comparingSize =  bars[comparingI].sizey

        //Stores the size of the bar next to the current bar
        let comparedSize  =  bars[comparedI].sizey

        //Stores the x position of the current bar
        let comparingPos  =  bars[comparingI].pos.x

        //Stores the position of the bar next to the current bar
        let comparedPos   =  bars[comparedI].pos.x

        //Sets the color of the bar that is being compared to red
        bars[comparingI].color = color(255, 0, 0)

        //Checks whether the size of the current bar we are on is bigger than the next barr
        if (comparingSize > comparedSize) {

          //If yes the bars will switch places
          bars[comparingI].pos.x  =  comparedPos
          bars[comparedI].pos.x   =  comparingPos

        } else {

          //Turns the current bar black because it will no longer be compared
          bars[comparingI].color = color(0)

        }

        //Goes onto the next bar
        index++

      } else {

        //Solution for last bar staying red when no longer compared
        bars[bars.findIndex(bar => bar.pos.x > w - 2 * wide)].color = 'black'

        //Restarts the sorting
        index = 0

      }

      //Declares the value that will hold how many bars are on the correct place
      let totalCorrect = 0

      //Loop that will add to the totalCorrect value
      for (var i = 0; i < bars.length; i++) {

        //Checks if the position corresponds with the right height
        if (bars[i].pos.x == wide * i && bars[i].sizey == (i + 2) * (floor(10 * ((i + 2) * ( (h - 10) / (w / wide) ))))/10 ) {

          totalCorrect++

        }

      }

      //If all the bars are on the right place
      if (totalCorrect == width / wide) {

        //If yes then it will change the color of the bars to green

        //Sets the framerate to 30, so the bars don't get colored as fast
        frameRate(30)

        //From smallest to biggest, it colors the bars
        //The amount of bars that are colored depend on the colorIndex
        for (var i = 0; i < colorIndex; i++) {

          //Changes the color of a bar
          bars[i].color = color(0, 255, 0)

        }

        //Adds to the colorIndex as long as it hasn't gotten to the max amount of bars
        if (colorIndex < w / wide) {

          colorIndex ++

        }

      }

    }

  }

  if (insertion == true) {

    //Makes the canvas's background the color of backgroundColor
    background(backgroundColor)

    //Draws each barr
    for (var i = 0; i < bars.length; i++) {
      bars[i].draw()
    }

    //Bubble sorting
    if (index < bars.length - 1) {

      //Stores the index of the current bar that is being compared
      let comparingI    =  bars.findIndex(bar => bar.pos.x == index * wide)
      //Stores the index of the bar to the right of the current bar that is being compared
      let comparedI     =  bars.findIndex(bar => bar.pos.x == index * wide + wide)

      //Stores the size of the current bar
      let comparingSize =  bars[comparingI].sizey

      //Stores the size of the bar next to the current bar
      let comparedSize  =  bars[comparedI].sizey

      //Stores the x position of the current bar
      let comparingPos  =  bars[comparingI].pos.x

      //Stores the x position of the bar next to the current bar
      let comparedPos   =  bars[comparedI].pos.x

      //Checks whether the size of the current bar we are on is bigger than the next barr
      if (comparingSize > comparedSize) {

        //If yes the bars will switch places
        bars[comparingI].pos.x  =  comparedPos
        bars[comparedI].pos.x   =  comparingPos

        for (var i = 0; i < (comparingPos) / wide; i++) {

          //Stores the index of the bar before the current bar that is being compared
          let newComparingI    =  bars.findIndex(bar => bar.pos.x == (index * wide) - ((i + 0) * wide))

          //Stores the index of the bar to the left of the new current bar that is being compared
          let newComparedI     =  bars.findIndex(bar => bar.pos.x == (index * wide) - ((i + 1) * wide))

          //Stores the size of the new current bar
          let newComparingSize =  bars[newComparingI].sizey

          //Stores the size of the bar next to the new current bar
          let newComparedSize  =  bars[newComparedI].sizey

          //Stores the x position of the new current bar
          let newComparingPos  =  bars[newComparingI].pos.x

          //Stores the x position of the bar next to the new current bar
          let newComparedPos   =  bars[newComparedI].pos.x

          //Checks the size of both bars
          if (newComparingSize < newComparedSize) {

            //If new current bar is smalle, then it switches
            bars[newComparingI].pos.x  =  newComparedPos
            bars[newComparedI].pos.x   =  newComparingPos

          } else {


            break

          }

        }

      }

      //Goes onto the next bar
      index++

    }

    colors()


  }

  if (quick == true) {

    //Makes the canvas's background the color of backgroundColor
    background(backgroundColor)

    //Draws each barr
    for (var i = 0; i < bars.length; i++) {
      bars[i].draw()
    }

  if (partition == false) {
  for (var g = 0; g < 1; g++) {  frameRate(2)

      let partitionIndex = Math.floor(Math.random() * (w / wide))

      let rightSide = []
      let leftSide  = []

      for (var i = 0; i < bars.length; i++) {
        let currentBar = bars.findIndex(bar => bar.pos.x == i * wide)

        //console.log(i, partitionIndex, bars.findIndex(bar => bar.pos.x == i * wide));

        if (currentBar != partitionIndex) {

          if (bars[currentBar].sizey < bars[partitionIndex].sizey) {
            leftSide.push(bars[currentBar])
          }


          if (bars[currentBar].sizey > bars[partitionIndex].sizey) {
            rightSide.push(bars[currentBar])
          } else if (bars[currentBar].sizey == bars[partitionIndex].sizey) {
            if (Math.random() < 0.5) {
              rightSide.push(bars[currentBar])
            } else {
              leftSide.push(bars[currentBar])
            }
          }

        }
      }

      //console.log(bars[partitionIndex], leftSide, rightSide);


      for (var i = 0; i < leftSide.length; i++) {
        leftSide[i].pos.x = i * wide
      }

      for (var i = 0; i < rightSide.length; i++) {
        rightSide[i].pos.x = (i + partitionIndex) * wide
      }

      bars[partitionIndex].pos.x = ((w / wide) - 1) * wide

      /*for (var i = 0; i < bars.length; i++) {
      console.log(bars[i].pos.x);
    }*/

    //console.log(bars[partitionIndex].pos.x);


    partitions++

    if (partitions == partitions_max) {
      partition = true
    }}

  }

  if (partition == true){
    frameRate(60)

    //Bubble sorting
    if (index < bars.length - 1) {

      //Stores the index of the current bar that is being compared
      let comparingI    =  bars.findIndex(bar => bar.pos.x == index * wide)

      //Stores the index of the bar to the right of the current bar that is being compared
      let comparedI     =  bars.findIndex(bar => bar.pos.x == index * wide + wide)
      //console.log(index * wide + wide, index*wide);

      //Stores the size of the current bar
      let comparingSize =  bars[comparingI].sizey

      //Stores the size of the bar next to the current bar
      let comparedSize  =  bars[comparedI].sizey

      //Stores the x position of the current bar
      let comparingPos  =  bars[comparingI].pos.x

      //Stores the x position of the bar next to the current bar
      let comparedPos   =  bars[comparedI].pos.x

      //Checks whether the size of the current bar we are on is bigger than the next barr
      if (comparingSize > comparedSize) {

        //If yes the bars will switch places
        bars[comparingI].pos.x  =  comparedPos
        bars[comparedI].pos.x   =  comparingPos

        //Insertion Sorting
        for (var i = 0; i < (comparingPos) / wide; i++) {

          //Stores the index of the bar before the current bar that is being compared
          let newComparingI    =  bars.findIndex(bar => bar.pos.x == (index * wide) - ((i + 0) * wide))

          //Stores the index of the bar to the left of the new current bar that is being compared
          let newComparedI     =  bars.findIndex(bar => bar.pos.x == (index * wide) - ((i + 1) * wide))

          //Stores the size of the new current bar
          let newComparingSize =  bars[newComparingI].sizey

          //Stores the size of the bar next to the new current bar
          let newComparedSize  =  bars[newComparedI].sizey

          //Stores the x position of the new current bar
          let newComparingPos  =  bars[newComparingI].pos.x

          //Stores the x position of the bar next to the new current bar
          let newComparedPos   =  bars[newComparedI].pos.x

          //Checks the size of both bars
          if (newComparingSize < newComparedSize) {

            //If new current bar is smalle, then it switches
            bars[newComparingI].pos.x  =  newComparedPos
            bars[newComparedI].pos.x   =  newComparingPos

          } else {


            break

          }

        }

      }

      //Goes onto the next bar
      index++

    }

    colors()

  }

}


}

function colors() {
  let totalCorrect = 0


  for (var i = 0; i < bars.length; i++) {

    if (bars[i].pos.x == wide * i && bars[i].sizey == (floor(10 * ((i + 2) * ( (h - 10) / (w / wide) ))))/10 ) {

      totalCorrect++

    }

  }

  if (totalCorrect == w / wide) {
    frameRate(30)

    for (var i = 0; i < colorIndex; i++) {
      bars[i].color = color(0, 255, 0)
    }

    if (colorIndex < w / wide) {
      colorIndex ++
    }
  }

  if (totalCorrect != w/wide) {
    sec = 0
    sec = Math.floor(frameCount/60)
  }

  text("Time: " + sec + "s", 100, 450)

}

function setupBars() {

  //Defines the array by pushing a new object into the array
  for (var i = 0; i < w / wide; i++) {
    bars.push(new bar(wide * i, i + 2))

    if(bars[i].pos.x != wide * i) {
      console.log("PANIC");
    }
  }

  //This part does the shuffling
  //Goes through the array from the end and picks a random index to switch its x position with
  for (var i = bars.length - 1; i > 0; i--) {

    //Declares all the varibale that are going to be used
    let j, x, y

    //Picks a random number within the index
    j = Math.floor(Math.random() * (i + 1))

    //Stores the position of each object
    x = bars[i].pos.x
    y = bars[j].pos.x

    //Switches the position of both objects to eachother
    bars[i].pos.x = y
    bars[j].pos.x = x

  }

}

function mouseClicked() {

  //Checks every button at the main ment
  for (var i = 0; i < buttons.length; i++) {

    //Checks if the mouse has been click inside the button
    if (buttons[i].click()) {

      //Checks the index to know what button was pressed
      switch (i) {

        case 0:

        //Changes the booleans to draw the right sort in the canvas
        mainMenu = false
        bubble = true
        insertion = false
        quick = false
        break;

        case 1:

        //Changes the booleans to draw the right sort in the canvas
        mainMenu = false
        bubble = false
        insertion = true
        quick = false
        break;

        case 2:

        //Changes the booleans to draw the right sort in the canvas
        mainMenu = false
        bubble = false
        insertion = false
        quick = true
        break;

        default:

      }

    }

  }

}
