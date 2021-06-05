let posX, posY, dirX, dirY, planeX, planeY;

const mapWidth  = 24;
const mapHeight = 24;

const texHeight = 64;
const texWidth  = 64;

const moveSpeed = 0.15;

const rotSpeed = 0.04;



/*const buffer = [];

let texture;

let textures = [];*/


const tileMap = 
[
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1],
    [1, 0, 0, 0, 2, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 2, 0, 0, 3, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 2, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 2, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 2, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 2, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 2, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 2, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 2, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 2, 0, 0, 3, 0, 0, 0, 0, 2, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 2, 0, 0, 3, 0, 0, 0, 0, 2, 0, 3, 0, 0, 3, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 2, 0, 0, 3, 0, 0, 0, 0, 2, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 2, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

function preload() {
    //texture = loadImage("BrickTexture.png");
}

function setup() {
    createCanvas(windowWidth - 20, windowHeight - 20);

    posX = 12 ;
    posY = 12;
    
    dirX = -1;
    dirY = 0;

    planeX = 0;
    planeY = 0.66;

    /*for (let i = 0; i < height; i++) {
        buffer[i] = []
    }

    textures[0] = texture;*/
}

function draw() {
    background(0);

    let w = width;
    for (let x = 0; x < w; x++) {
        const cameraX = 2 * x / w - 1;
        const rayDirX = dirX + planeX * cameraX;
        const rayDirY = dirY + planeY * cameraX;
 
        let mapX = floor(posX);
        let mapY = floor(posY);

        let sideDistX, sideDistY;

        const deltaDistX = abs(1 / rayDirX);
        const deltaDistY = abs(1 / rayDirY);

        let stepX, stepY;

        let hit = 0;
        
        let side;

        let perpWallDist;

        if (rayDirX < 0) {
            stepX = -1;
            sideDistX = (posX - mapX) * deltaDistX;
        } else {
            stepX = 1;
            sideDistX = (mapX + 1.0 - posX) * deltaDistX;

        }

        if (rayDirY < 0) {
            stepY = -1;
            sideDistY = (posY - mapY) * deltaDistY;
        } else {
            stepY = 1;
            sideDistY = (mapY + 1.0 - posY) * deltaDistY;
        }

        while (hit == 0) {
            if (sideDistX < sideDistY) {
                sideDistX += deltaDistX;
                mapX += stepX;
                side = 0;
            } else {
                sideDistY += deltaDistY;
                mapY += stepY;
                side = 1;
            }
            if (tileMap[mapX][mapY] > 0) {
                hit = 1;
            }
        }

        if (side == 0) {
            perpWallDist = (mapX - posX + (1 - stepX) / 2) / rayDirX;
        } else {
            perpWallDist = (mapY - posY + (1 - stepY) / 2) / rayDirY;
        }

        let lineHeight = floor((height * 2) / perpWallDist);
        let drawStart = -lineHeight / 2 + height / 2;
        let drawEnd = lineHeight / 2 + height / 2

        if (drawStart < 0) {
            drawStart = 0;
        }

        if (drawEnd >= height) {
            drawEnd = height - 1;
        }
        rectMode(CENTER);
        switch (tileMap[mapX][mapY]) {
            case 1:
                if (side == 1) {
                    fill(0, 0, 150);  
                }  else {
                    fill(0, 0, 255);  
                }
                break;
            case 2:
                if (side == 1) {
                    fill(150, 0, 0);
                } else {
                    fill(255, 0, 0);
                }
                break;
            case 3:
                if (side == 1) {
                    fill(0, 150, 0);
                } else {
                    fill(0, 255, 0);
                }
                break;
        }

        let wide = width / w;
        noStroke();
        rect(x * wide, height / 2 - 50, wide, lineHeight); 

        /*let texNum = tileMap[mapX][mapY] - 1;

        let wallX;

        if (side == 0) {
            wallX = posY + perpWallDist * rayDirY;
        } else {
            wallX = posX + perpWallDist * rayDirX;
        }

        let texX = floor(wallX * texWidth);

        if (side == 0 && rayDirX > 0) {
            texX = texWidth - texX -1;
        }
        if (side == 1 && rayDirY < 0) {
            texX = texWidth - texX - 1;
        }

        texX = floor(texX);

        for (let y = drawStart; y < drawEnd; y++) {
            const d = y * 256 - height * 128 + lineHeight * 128;
            const texY = floor(((d * texHeight) / lineHeight) / 256);
            //console.log(texY);
            let color = textures[texNum].get(texX, texY);
            //console.log(color);
            buffer[y][x] = color;
        }

*/

    }

    if (keyIsDown(UP_ARROW)) {
        if (tileMap[floor(posX + dirX * moveSpeed)][floor(posY)] == false) {
            posX += dirX * moveSpeed;
        }

        if (tileMap[floor(posX)][floor(posY + dirY * moveSpeed)] == false) {
            posY += dirY * moveSpeed;
        }
    }

    if (keyIsDown(DOWN_ARROW)) {
        if (tileMap[floor(posX - dirX * moveSpeed)][floor(posY)] == false) {
            posX -= dirX * moveSpeed;
        }

        if (tileMap[floor(posX)][floor(posY - dirY * moveSpeed)] == false) {
            posY -= dirY * moveSpeed;
        }
    }

    if (keyIsDown(RIGHT_ARROW)) {
        let oldDirX = dirX;
        dirX = dirX * cos(-rotSpeed) - dirY * sin(-rotSpeed);
        dirY = oldDirX * sin(-rotSpeed) + dirY * cos(-rotSpeed);

        let oldPlaneX = planeX;
        planeX = planeX * cos(-rotSpeed) - planeY * sin(-rotSpeed);
        planeY = oldPlaneX * sin(-rotSpeed) + planeY * cos(-rotSpeed);
    }

    if (keyIsDown(LEFT_ARROW)) {
        let oldDirX = dirX;
        dirX = dirX * cos(-rotSpeed) - dirY * sin(rotSpeed);
        dirY = oldDirX * sin(rotSpeed) + dirY * cos(rotSpeed);

        let oldPlaneX = planeX;
        planeX = planeX * cos(rotSpeed) - planeY * sin(rotSpeed);
        planeY = oldPlaneX * sin(rotSpeed) + planeY * cos(rotSpeed);
    }

}