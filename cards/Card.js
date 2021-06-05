export class Card {
  constructor (symbol, suit) {
    this.value = {
      num: isNaN(symbol) ? (symbol.toUpperCase() === 'A' ? { a: 1, b: 11 } : 10) : parseInt(symbol),
      symbol: symbol
    }
    this.suit = suit

    this.height = 200
    this.width = 120
  }

  drawCard (canvas, x, y) {
    canvas.globalColor = '#EEE'
    canvas.rectangle(x, y, this.width, this.height)
    this.drawSymbol(x, y, canvas)
  }

  drawSymbol (x, y, canvas) {
    switch (this.suit) {
      case 'hearts':
        canvas.globalColor = '#F00'
        canvas.heart(x, y, 1)
        break
    }
  }

}
