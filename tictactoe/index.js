import { Canvas } from './Canvas.js'
import { Game } from './Game.js'

window.addEventListener('click', e => { game.click(e.clientX, e.clientY) })
window.addEventListener('keypress', e => {
  window.game.board.reset()
  window.game.draw()
})

window.canvas = new Canvas(500, 500)

window.game = new Game(window.canvas)

window.game.draw()
