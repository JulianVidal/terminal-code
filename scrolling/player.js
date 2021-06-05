class Player {

    constructor(x, y) {
        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.grv = createVector(0, gravity);
        this.dir = 0;

        this.idle = true;
        this.idle_Index = 0;
        this.idle_Animation_Speed = 1.5;

        this.walk = true;
        this.walk_Index = 0;
        this.walk_Animation_Speed = .8;

        this.box = new Hitbox(this.pos.x, this.pos.y, scale, scale * 2);
    }

    applyForce(force) {
        this.acc.add(force);
    }

    update() {

        let bottom = this.pos.y / scale;
        bottom = Math.ceil(bottom - 1);
        let newVel, newPos, newAcc;

        newAcc = this.acc.y + this.grv.y;
        newVel = this.vel.y + newAcc;
        newPos = this.pos.y + newVel;

        /*console.log(player.pos.y, 'PREVIOUS')
        console.log(bottom)
        console.log(newPos, 'PREDICTION')*/

        while (tileMap[bottom + 2 + mapPosY] && tileMap[bottom + 2 + mapPosY][mapPosX + 6] != 1 && tileMap[bottom + 2 + mapPosY] && tileMap[bottom + 2 + mapPosY][mapPosX + 6] != 5) {
            bottom++;
        }

        if (!tileMap[bottom + 2]) {
            bottom += 5;
        }

        if (newPos > ((bottom) * scale)) {
            //this.acc.y = -gravity;
            this.vel.y = 0;
            this.pos.y = (bottom) * scale;

        } else {

            this.box.update(this.pos.x, this.pos.y, scale, scale * 2);

            /*if (this.vel.y > scale / 4) {
                this.vel.y = 0;
            }*/

            this.applyForce(this.grv);
            this.vel.add(this.acc);
            this.vel.limit(35);
            this.pos.add(this.vel);
        }


        if (player.pos.y > height + 10) {
            gameOver = true;
        }


    }

    draw() {
        /*fill(255);
        rect(this.pos.x, this.pos.y, scale, 2 * scale);*/
        this.box.update(this.pos.x, this.pos.y, scale, scale * 2);
        this.box.draw('WIRE', color(255));

        if (this.dir == 0) {

            //image(characterImg, this.pos.x, this.pos.y, scale, scale * 2);

            if (this.idle) {

                this.idle_Index += this.idle_Animation_Speed;
                let index = floor(this.idle_Index) % character_Idle_Animation.length;

                image(character_Idle_Animation[index], this.pos.x, this.pos.y, scale, scale * 2);

            } else {

                this.walk_Index += this.walk_Animation_Speed;
                let index = floor(this.walk_Index) % character_Walk_Animation.length;
                image(characterImg, this.pos.x, this.pos.y, scale, scale * 2);

                //image(character_Walk_Animation[index], this.pos.x, this.pos.y, scale, scale * 2);

            }

        } else {

            if (this.idle) {

                this.idle_Index += this.idle_Animation_Speed;
                let index = floor(this.idle_Index) % character_Idle_Animation.length;

                image(character_Idle_Inverted_Animation[index], this.pos.x, this.pos.y, scale, scale * 2);

            } else {
                this.walk_Index += this.walk_Animation_Speed;
                let index = floor(this.walk_Index) % character_Walk_Animation.length;
                image(character_InvImg, this.pos.x, this.pos.y, scale, scale * 2);

                // image(character_Walk_Inverted_Animation[index], this.pos.x, this.pos.y, scale, scale * 2);
            }


            //image(character_InvImg, this.pos.x, this.pos.y, scale, scale * 2);

        }

        //this.box.draw('WIRE', 255);

    }

}