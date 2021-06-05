class Vector {

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.mag = this.magnitude(x, y);
        this.ang = this.angle(x, y);

        this.limiter = Infinity;
    }

    add(x, y) {
        const limit = this.magnitude(this.x + x, this.y + y) > this.limiter;

        if (!limit && (x.x === undefined || x.y === undefined)) {
            this.x += x;
            this.y += y;

            this.mag = this.magnitude(this.x, this.y);
            this.ang = this.angle(this.x, this.y);
        } else if (!limit && x.x !== undefined && x.y !== undefined) {
            this.x += x.x;
            this.y += x.y;

            this.mag = this.magnitude(this.x, this.y);
            this.ang = this.angle(this.x, this.y);
        }
    }

    static add(v1, v2) {
        let x, y;
        x = v1.x + v2.x;
        y = v1.y + v2.y;

        return new Vector(x, y);
    }

    limit(limit) {
        this.limiter = limit;
    }

    magnitude(x, y) {
        return Math.sqrt( x * x + y * y );
    }

    angle(x, y) {
        return Math.atan(y / x);
    }

}

function createVector(x, y) {
    return new Vector(x || 1, y || 1);
}