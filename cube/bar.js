class bar {
    constructor(x, y, z, t, a) {
        this.pos = createVector(x, y, z);
        this.angle = a;
        this.thick = t;
    }

    draw() {
      normalMaterial();
      const h = abs(sin(this.angle / 2)) * 300 + 100;

      box(this.thick, h, this.thick);
      this.angle += 0.02;
    }
}