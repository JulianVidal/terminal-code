let h, w;

let player;

let mapPosX = 0;
let mapPosY = 0;

let changeDir = false;

const scale = 40;

const gravity = 2;

let coinAmount = 0;

let gameOver = false;

let crasht = false;
let crashb = false;
let crashr = false;
let crashl = false;

let a = 0;

let levels;

let enemySmooth = 2;
let enemySpeed = 2;
let enemyHalf = false;
let half = true;

let grassImg; // 1
let coinImg; // 2
let cloudImg; // 3
let enemyImg, enemy_InvImg; // 4
let brickImg; // 5
let characterImg, character_InvImg;

let character_WalkImg, character_Walk_InvImg;
let character_IdleImg, character_Idle_InvImg;

let character_WalkData;
let character_IdleData;

let character_Walk_Animation = [];
let character_Walk_Inverted_Animation = [];

let character_Idle_Animation = [];
let character_Idle_Inverted_Animation = [];

let tiles;

let tileMap;
let enemyMap;

function preload() {

    grassImg = loadImage('sprites/grass.png');
    brickImg = loadImage('sprites/brick.png');

    characterImg = loadImage('sprites/Characters/personV2.png');
    character_InvImg = loadImage('sprites/Characters/personV2_Inverted.png');


    coinImg = loadImage('sprites/coin.png');

    cloudImg = loadImage('sprites/cloud.png');

    enemyImg = loadImage('sprites/character.png');
    enemy_InvImg = loadImage('sprites/character_Inverted.png');

    character_WalkImg = loadImage('sprites/Animations/personV2_Walking.png');
    character_Walk_InvImg = loadImage('sprites/Animations/personV2_Walking_Inverted.png');
    character_WalkData = loadJSON('sprites/Animations/Character_Walk.json')


    character_IdleImg = loadImage('sprites/Animations/personV2_Idle.png');
    character_Idle_InvImg = loadImage('sprites/Animations/PersonV2_Idle_Inverted.png');
    character_IdleData = loadJSON('sprites/Animations/Character_Idle.json')


    levels = loadJSON('levels.json');
}

function setup() {

    tileMap = JSON.parse(JSON.stringify({
        map: levels.level_1.map,
    }));

    tileMap = tileMap.map;
    enemyMap = levels.level_1.enemyMap;

    createCanvas(scale * 15, scale * 12);

    frameRate(15);

    h = scale * tileMap.length;

    w = scale * tileMap[0].length;

    player = new Player(scale * 6, scale * 8);

    for (let i = 0; i < character_IdleData.frames.length; i++) {
        const frame = character_IdleData.frames[i];
        const pos = frame.position;
        let img = character_IdleImg.get(pos.x, pos.y, pos.w, pos.h);
        character_Idle_Animation.push(img);
    }

    for (let i = 0; i < character_IdleData.frames.length; i++) {
        const frame = character_IdleData.frames[i];
        const pos = frame.position;
        let img = character_Idle_InvImg.get(pos.x, pos.y, pos.w, pos.h);
        character_Idle_Inverted_Animation.push(img);
    }


    for (let i = 0; i < character_WalkData.frames.length; i++) {
        const frame = character_WalkData.frames[i];
        const pos = frame.position;
        let img = character_WalkImg.get(pos.x, pos.y, pos.w, pos.h);
        character_Walk_Animation.push(img);
    }

    for (let i = 0; i < character_WalkData.frames.length; i++) {
        const frame = character_WalkData.frames[i];
        const pos = frame.position;
        let img = character_Walk_InvImg.get(pos.x, pos.y, pos.w, pos.h);
        character_Walk_Inverted_Animation.push(img);
    }
}

function draw() {
    //console.log(player.vel.y)
    background(color(120, 170, 255));

    tiles = [];

    for (let y = 0; y < h / scale; y++) {
        tiles[y] = [];
        for (let x = -scale; x < w / scale; x++) {

            if (tileMap[y + mapPosY] && tileMap[y + mapPosY][x + mapPosX]) {

                if (tileMap[y + mapPosY][x + mapPosX] > 0) {

                    switch (tileMap[y + mapPosY][x + mapPosX]) {
                        case 1:
                            tiles[y][x] = new Block(x * scale, y * scale, scale, scale);
                            image(grassImg, x * scale, y * scale, scale, scale);
                            tiles[y][x].box.draw('WIRE', 255);
                            break;

                        case 2:
                            let posX, posY, size;

                            posX = x * scale + scale / 4;
                            posY = y * scale + (3 * sin(a + (x / y)));
                            size = 3 * scale / 4;

                            tiles[y][x] = new Coin(posX, posY, size, size, x, y);
                            image(coinImg, posX, posY, size, size);
                            tiles[y][x].box.draw('WIRE', 255)
                            break;

                        case 3:
                            image(cloudImg, x * scale, y * scale, scale * 2.5, scale * 2.5);
                            break;

                        case 4:
                            tiles[y][x] = new Enemy(x * scale, y * scale, scale, scale);
                            tiles[y - 1][x] = new Enemy(x * scale, y * scale - scale, scale, scale);

                            if (changeDir == false) {

                                if (enemyHalf) {
                                    image(enemyImg, (x * scale + scale / enemySmooth), y * scale - scale, scale, scale * 2);

                                } else {
                                    image(enemyImg, x * scale, y * scale - scale, scale, scale * 2);

                                }
                            } else {
                                if (enemyHalf) {

                                    image(enemy_InvImg, (x * scale - scale / enemySmooth), y * scale - scale, scale, scale * 2);


                                } else {

                                    image(enemy_InvImg, x * scale, y * scale - scale, scale, scale * 2);

                                }

                            }
                            //tiles[y][x].box.draw('WIRE', 255);
                            //tiles[y - 1][x].box.draw('WIRE', 255);

                            break;

                        case 5:
                            tiles[y][x] = new Block(x * scale, y * scale, scale, scale);
                            tiles[y][x].box.draw('WIRE', 255);
                            image(brickImg, x * scale, y * scale, scale, scale);
                            break;

                        default:
                            break;
                    }

                }

            }

        }

    }
    if (player.vel.y != 0) {
        player.idle = false;
    }
    player.draw();

    noStroke();
    fill(0);
    textSize(32);
    text(`Coins: ${coinAmount}`, 5, 34);

    textSize(24)
    text(`Frames: ${Math.round(frameRate())}`, width - 130, 26);

    if (!gameOver) {

        if (changeDir) {
            let y = -1,
                x = -1;
            tileMap.forEach(cols => {
                x = 0;
                y++;
                cols.forEach(element => {
                    x++;

                    if (tileMap[y][x] == 4 && frameCount % enemySpeed == 0 && (tileMap[y + 1][x - 1] == 1 || tileMap[y + 1][x - 1] == 5) && tileMap[y][x - 1] == 0) {
                        if (half == true) {
                            tileMap[y][x] = 0;
                            tileMap[y][x - 1] = 4;
                            enemyMap[y][x - 1] = enemyMap[y][x];
                            enemyMap[y][x] = 0;
                            enemyHalf = false;
                            changeDir = true;
                            //half = false;
                        } else {
                            enemyHalf = true;
                            half = true;
                        }
                    } else if (tileMap[y][x] == 4 && frameCount % enemySpeed == 0 && tileMap[y + 1][x - 1] != 1 && tileMap[y + 1][x - 1] != 5) {

                        enemyMap[y][x] = 0;
                        changeDir = false;

                    } else if (tileMap[y][x] == 4 && frameCount % enemySpeed == 0 && tileMap[y][x - 1] != 0) {

                        enemyMap[y][x] = 0;
                        changeDir = false;

                    }

                });
            });
        } else {
            let y = tileMap.length,
                x = tileMap[0].length;
            tileMap.forEach(cols => {
                x = tileMap[0].length;
                y--;
                cols.forEach(element => {
                    x--;

                    if (tileMap[y][x] == 4 && frameCount % enemySpeed == 0 && (tileMap[y + 1][x + 1] == 1 || tileMap[y + 1][x + 1] == 5) && tileMap[y][x + 1] == 0) {
                        if (half == true) {
                            tileMap[y][x] = 0;
                            tileMap[y][x + 1] = 4;
                            enemyMap[y][x + 1] = enemyMap[y][x];
                            enemyMap[y][x] = 0;
                            enemyHalf = false;
                            changeDir = false;
                            //half = false;
                        } else {
                            enemyHalf = true;
                            half = true;
                        }

                    } else if (tileMap[y][x] == 4 && frameCount % enemySpeed == 0 && tileMap[y + 1][x + 1] != 1 && tileMap[y + 1][x + 1] != 6) {

                        enemyMap[y][x] = 1;
                        changeDir = true;

                    } else if (tileMap[y][x] == 4 && frameCount % enemySpeed == 0 && tileMap[y][x + 1] != 0) {

                        enemyMap[y][x] = 1;
                        changeDir = true;
                    }


                });
            });
        }



        player.update();

        crasht = false;
        crashb = false;
        crashr = false;
        crashl = false;

        let mapPositionY = (player.pos.y / scale) + 2;
        mapPositionY = Math.floor(mapPositionY);

        if (mapPositionY > 11) {
            mapPositionY = 11;
        }

        collideWith(mapPositionY, 6, 1); // Bottom
        collideWith(mapPositionY - 3, 6, 0); // Top

        collideWith(mapPositionY, 5, 0); // Back Bottom
        collideWith(mapPositionY - 1, 5, 0); // Back Med
        collideWith(mapPositionY - 2, 5, 0); // Back Top

        collideWith(mapPositionY, 7, 0); // Front Bottom
        collideWith(mapPositionY - 1, 7, 0); // Front Med
        collideWith(mapPositionY - 2, 7, 0); // Front Top

        collideWith(mapPositionY - 2, 6, 1); // Inside Top
        collideWith(mapPositionY - 1, 6, 1); // Inside med

        if (keyIsDown(68) && !crashr) {
            mapPosX++;
            player.idle = false;
        }

        if (keyIsDown(65) && !crashl) {
            mapPosX--;
            player.idle = false;
        }

        if (keyIsDown(68)) {
            player.dir = 0;
        }

        if (keyIsDown(65)) {
            player.dir = 1;
        }

        if (!(keyIsDown(65) && !crashl) && !(keyIsDown(68) && !crashr)) {
            player.idle = true;
        }

        if (crashb) {
            player.applyForce(createVector(0, -gravity));

        }


        a += 0.5;

    } else if (gameOver == true) {
        player.idle_Animation_Speed = 0;

        textSize(64);
        fill(255);
        stroke(0);
        strokeWeight(3);
        text('Game Over', width / 2 - 180, height / 2);

        strokeWeight(2);
        textSize(24);
        text('Press space to restart', width / 2 - 120, height / 2 + 65);


    }

}

function keyPressed() {
    if (key == ' ' && gameOver == true) {
        gameOver = false;
        player = new Player(scale * 6, scale * 9);
        mapPosX = 0;
        mapPosY = 0;

        tileMap = JSON.parse(JSON.stringify({
            map: levels.level_1.map,
        }));

        tileMap = tileMap.map;

        player.idle_Animation_Speed = 0.8;

        coinAmount = 0;
    }

    if (key == 'c') {
        let dir = 1;
        if (player.dir == 1) {
            dir = -1;
        }

        if (tileMap[floor(player.pos.y / scale + 1)][mapPosX + 6 + (2 * dir)] == 4 && tileMap[floor(player.pos.y / scale + 1)][mapPosX + 6 + (1 * dir)] == 0) {
            tileMap[floor(player.pos.y / scale + 1)][mapPosX + 6 + (2 * dir)] = 0;
        }
    }
}

function collideWith(y, x, coin) {
    if (tiles[y]) {

        if (tiles[y][x]) {

            if (tiles[y][x].touch == true && coin == 1) {

                tiles[y][x].collide()

            } else if (!tiles[y][x].touch) {
                tiles[y][x].collide()

            }

        }
    }
}