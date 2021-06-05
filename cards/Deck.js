import { Card } from './Card.js'

export class Deck {
  constructor () {
    this.cards = []

    this.symbols = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
    this.suits = ['spades', 'heards', 'diamonds', 'clubs']

    for (const symbol of this.symbols) {
      for (const suit of this.suits) {
        this.cards.push(new Card(symbol, suit))
      }
    }
  }

  randomCard () {
    return this.cards.splice(Math.floor(Math.random() * this.cards.length), 1)[0]
  }
}
