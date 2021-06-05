class Coin {
    constructor(x, y, sizex, sizey, mapX, mapY) {
        this.pos = createVector(x, y);
        this.sizex = sizex;
        this.sizey = sizey;
        this.box = new Hitbox(x, y, sizex, sizey);
        this.touch = true;
        this.mapX = mapX;
        this.mapY = mapY;
    }

    collide() {

        tileMap[this.mapY][this.mapX + mapPosX] = 0;

        coinAmount++;
    }   
}