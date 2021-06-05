function food() {
  this.size = 10
  this.x = round10(random(this.size, width - this.size))
  this.y = round10(random(this.size, height - this.size))
  this.pos = createVector(this.x, this.y)

  this.draw = function () {
    fill("#0FF")
    rect(this.pos.x, this.pos.y, this.size, this.size)
  }
}

function round10(x)
{
  return (x % 10) >= 5 ? parseInt(x / 10) * 10 + 10 : parseInt(x / 10) * 10;
}
