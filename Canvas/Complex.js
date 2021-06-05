class Complex {
    constructor(real, imaginary) {
        this.r = real;
        this.i = imaginary;
        this.mod = this.modulus();
    }

    add(real, img) {
        this.r += real;
        this.i += img;
    }

    static add(c1, c2) {
        return new Complex(c1.r + c2.r, c1.i + c2.i);
    }

    static mult(c1, c2) {
       let newReal, newImg;

        newReal = (c1.r * c2.r) + (c1.i * c2.i * -1);
        newImg  = c1.i * c2.r + c1.r * c2.i;

        return new Complex(newReal, newImg);
    }

    modulus() {
        return Math.sqrt(this.r * this.r + this.i * this.i)
    }
}