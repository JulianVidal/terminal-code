let walls = []
let clouds = []
let birds = []
let dino


let framesWall = 30
let rateWall = 45

let framesCloud = 30
let rateCloud = 120

let framesBird = framesWall + 25

let score = 0


let spriteDinoImage
let spriteDinoData
let animationDino = []

let spriteCactusImage

let spriteCloudImage

let spriteSandImage
let spriteSand2Image
let spriteSandpos
let spriteSandvel = 3

let gameOver = false

function preload() {


  spriteDinoImage = loadImage('sprite/dino.png')

  spriteDinoData = loadJSON('sprite/dino.json')


  spriteCactusImage = loadImage('sprite/cactus.png')


  spriteCloudImage = loadImage('sprite/cloud.png')


  spriteSandImage = loadImage('sprite/sand.png')

  spriteSand2Image = loadImage('sprite/sand.png')

}

function setup() {

  spriteSandposx = 0
  spriteSand2posx = 700

  imageMode(CENTER)
  rectMode(CENTER)

  createCanvas(700,400)

  dino = new player()

 let spriteDinoFrames = spriteDinoData.frames

  for (let i = 0; i < spriteDinoFrames.length; i++) {
    let pos = spriteDinoFrames[i].position
    let img = spriteDinoImage.get(pos.x, pos.y, pos.w, pos.h)
    animationDino.push(img)
  }

}

function draw() {

  background(200)

  rectMode(CORNER)
  imageMode(CORNER)
  fill('#7777FF')
  rect(0, 0,  width , height/2 - 13)
  image(spriteSandImage, spriteSandposx, height/2 - 13, width, height - (height/2 - 13))
  image(spriteSand2Image, spriteSand2posx, height/2 - 13, width, height - (height/2 - 13))

    spriteSand2posx -= spriteSandvel

    spriteSandposx -= spriteSandvel

  if (spriteSandposx < -width) {
    spriteSandposx = spriteSand2posx + 700
  }

  if (spriteSand2posx < -width) {
    spriteSand2posx = spriteSandposx + 700
  }




  rectMode(CENTER)
  imageMode(CENTER)

  if (frameCount == framesWall){
      walls.push(new wall())
      framesWall += rateWall
    }

  if (frameCount == framesCloud) {
    clouds.push(new cloud())
    clouds[clouds.length - 1].setup()
    framesCloud += rateCloud
  }

  if (frameCount == framesBird) {
    if (Math.random() < 0.3){
    birds.push(new bird())
  }
  framesBird += rateWall

  }


  for (let i = walls.length; i > 0; i--) {
    walls[i - 1].draw()
    walls[i - 1].update()
    //walls[i - 1].collision()
    walls[i - 1].remove(i - 1)
  }

  spriteSandvel = 5 + frameCount/1000

  for (let i = clouds.length; i > 0; i--) {
    clouds[i - 1].draw()
    clouds[i - 1].update()
    clouds[i - 1].remove(i - 1)
  }


  for (let i = birds.length; i > 0; i--) {
    birds[i - 1].draw()
    birds[i - 1].update()
    birds[i - 1].collision()
    birds[i - 1].remove(i - 1)
  }

  if (dino.pos.y < 166) {
  dino.draw()
} else {
  image(animationDino[0], dino.pos.x + 1, 167, 48, 48)

}

  dino.fall()
  dino.up()

  score += .1
  textSize(18)
  fill(0)
  noStroke()
  text('score:', 15, 25)
  text(Math.round(score), 75, 25)
}

function keyTyped() {
  if (key == ' ') {
    dino.jump()
  }
  if (key == ' ' && gameOver == true) {
    for (var i = 0; i < walls.length; i++) {
      walls.splice(0, walls.length)
    }
    for (var i = 0; i < birds.length; i++) {
      birds.splice(0, birds.length)
    }
    loop()
    score = 0
    gameOver = false
  }
}
