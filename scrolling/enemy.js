class Enemy {
    constructor(x, y, sizex, sizey) {
        this.pos = createVector(x, y);
        this.sizex = sizex;
        this.sizey = sizey;
        this.box = new Hitbox(x, y, sizex, sizey);
        this.touch = true;
    }

    collide() {
        
        gameOver = true;
    }
}