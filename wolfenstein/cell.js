class cell {
  constructor(x, y, size, type){
    this.pos   = createVector(x, y);
    this.type  = type;
    this.size  = size
    this.lines =
      [
      [
       createVector(x, y),
       createVector(x + size, y)
      ],
      [
       createVector(x + size, y),
       createVector(x + size, y + size)
      ],
      [
       createVector(x + size, y + size),
       createVector(x, y + size)
      ],
      [
       createVector(x, y + size),
       createVector(x, y)
      ]
      ]

    this.color = color(0);

    if (this.type == 1) {
      this.color = color(0, 0, 255);
    } else if (this.type == 2){
      this.color = color(255, 0, 0);
    }
  }

  show() {
    stroke(100, 100)
    fill(this.color)
    rect(this.pos.x, this.pos.y, this.size, this.size);
  }
}
