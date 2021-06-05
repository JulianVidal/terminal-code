import { Deck } from './Deck.js'

export class Game {
  constructor () {
    this.deck = new Deck()
    this.ProbDeck = new Deck()
    this.dealer = []
    this.player = []
  }

  start () {
    this.dealer.unshift(this.deck.randomCard())
    this.dealer.unshift(this.deck.randomCard())

    this.player.unshift(this.deck.randomCard())
    this.player.unshift(this.deck.randomCard())

    console.log('Dealer ', this.dealer)
    console.log('Player ', this.player)

    console.log('Player Bust', this.checkBustChance(this.player))
    // console.log('Dealer Bust', this.checkBustChance(this.dealer))
    console.log('Dealer Win if player stands', this.checkDealerChance(this.player, this.dealer))
  }

  deal (person) {
    person.unshift(this.deck.randomCard())
    if (this.checkBust(person)) {
      console.log('Bust')
    }
    console.log('Player Bust', this.checkBustChance(this.player))
    // console.log('Dealer Bust', this.checkBustChance(this.dealer))
    console.log('Dealer Win if player stands', this.checkDealerChance(this.player, this.dealer))

    if (this.checkBust(person)) console.log('Bust')
  }

  checkBust (person) {
    let amount = 0
    for (const card of person) {
      amount += card.value.num.a ? card.value.num.a : card.value.num
    }
    return amount > 21
  }

  checkBustChance (person) {
    let cardsValue = 0
    for (const card of person) {
      cardsValue += card.value.num.a ? card.value.num.a : card.value.num
    }

    const bustValue = 21 - cardsValue

    let cardBust = 0

    for (const card of this.deck.cards) {
      if ((card.value.num.a ? card.value.num.a : card.value.num) > bustValue) {
        cardBust++
      }
    }

    return (cardBust / this.deck.cards.length) * 100
  }

  checkDealerChance(player, dealer) {
    let playerCardsValue = 0
    for (const card of player) {
      playerCardsValue += card.value.num.a ? card.value.num.a : card.value.num
    }

    const winValue = playerCardsValue - (dealer[0].value.num.a ? dealer[0].value.num.a : dealer[0].value.num)
    const bustValue = 21 - (dealer[0].value.num.a ? dealer[0].value.num.a : dealer[0].value.num)

    let cardWin = 0
    for (const card of this.deck.cards) {
      if ((card.value.num.a ? card.value.num.a : card.value.num) < bustValue && (card.value.num.a ? card.value.num.a : card.value.num) > winValue) {
        cardWin++
      }
    }

    return (cardWin / this.deck.cards.length) * 100
  }
}
