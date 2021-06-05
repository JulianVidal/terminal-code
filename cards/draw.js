import { Card } from './Card.js'

const card = new Card('1', 'hearts')

export function draw (canvas, game) {
  canvas.globalColor = '#007700'
  canvas.background()
  card.drawCard(canvas, (canvas.width / 2) - (120 / 2), 4 * canvas.height / 7)
}
