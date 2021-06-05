class Block {
    constructor(x, y, sizeX, sizeY) {
        this.box = new Hitbox(x, y, sizeX, sizeY);
        this.touch = false;
    }

    collide() {
        let collisions = collision(player.box, this.box);

        if (collisions.bottom) {

            /*if (player.vel.y > 28) {
                player.pos.y -= scale;
            }*/

            player.vel.y = 0;
            player.acc.y = 0;

            if (keyIsDown(87) && !crashb) {
                player.vel.y = -scale / 2;
                player.applyForce(createVector(0, -2));
            }


            crashb = true;
        }

        if (collisions.right) {
            crashr = true;
        }

        if (collisions.top && player.vel.y < 0) {
            player.vel.y = 0;
            player.acc.y = 0;

            if ((player.pos.y % scale) === 2) {

                player.pos.y += (player.pos.y % scale);
                player.pos.y += scale;

            } else {

                player.pos.y += (player.pos.y % scale);

            }
        }

        if (collisions.left) {
            crashl = true;
        }

        if (collisions.top) {
            crasht = true;
        }
    }
}