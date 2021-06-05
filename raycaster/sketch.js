let player;
let walls = [];

const mapWidth    = 300;
const mapHeight   = 500;
const sceneWidth  = 400;
const fov         = 60;

const playerVel   = 3;

function setup(){
  createCanvas(mapWidth + sceneWidth, mapHeight);
  player = new person(mapWidth/2, mapHeight/2);


  walls[0] = new wall(0, 0,  mapWidth, 0);
  walls[1] = new wall(0, 0, 0, mapHeight);
  walls[2] = new wall(0, mapHeight, mapWidth, mapHeight);
  walls[3] = new wall(mapWidth, mapHeight, mapWidth, 0);



  /*for (var i = 4; i < 7; i++) {
    walls.push( new wall(Math.random() * mapWidth, Math.random() * mapHeight, Math.random() * mapWidth, Math.random() * mapHeight));
  }*/
}

function draw() {
  background(0);
  fill(200, 0, 0);
  rect(mapWidth, 0, sceneWidth, height / 2);
  fill(0, 200, 0);
  rect(mapWidth, height / 2, sceneWidth, height / 2);

  for (var i = 0; i < player.rays.length; i++) {
    let d = player.rays[i].record.dist(player.pos)
    let playerAngle = player.heading;
    let angle = player.rays[i].heading.heading() - playerAngle;
    //let l = d / 2;
    //let h = map(l, 0, sceneWidth, height, 0);
    d *= cos(angle);
    let w = (sceneWidth / player.rays.length);
    let dsq = d * d;
    let wsq = sceneWidth * sceneWidth;
    let h = map(d, 0, sceneWidth , height, 0);
    let c = map(dsq, 0, wsq, 240, 0);
   if (player.rays[i].record.x != -1 && player.rays[i].record.y != -1 ) {
      fill(c);
      rectMode(CENTER);
      noStroke();
      rect(mapWidth + (w * i) + w / 2 + 1, mapHeight / 2, w + 1, h);
      rectMode(CORNER);
    }
  }

  if (keyIsDown(LEFT_ARROW)) {
    player.pos.x -= playerVel;
    player.setPos(player.pos.x--, player.pos.y);
  }

  if (keyIsDown(RIGHT_ARROW)) {
    player.pos.x += playerVel;
    player.setPos(player.pos.x++, player.pos.y);
  }

  if (keyIsDown(DOWN_ARROW)) {
    player.pos.y += playerVel;
    player.setPos(player.pos.x, player.pos.y++);
  }

  if (keyIsDown(UP_ARROW)) {
    player.pos.y -= playerVel;
    player.setPos(player.pos.x, player.pos.y);
  }

  if (keyIsDown(65)) {
    player.setHeading(-0.02);
  }

  if (keyIsDown(68)) {
    player.setHeading(0.02);
  }

  for (let wall of walls) {
    wall.show();
  }

  player.draw();
}
