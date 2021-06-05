import { Canvas } from './Canvas.js'
import { Game } from './Game.js'
import { draw } from './draw.js'

window.canvas = new Canvas(500, 500)

window.game = new Game()

// window.game.start()

// window.canvas.loop(() => { draw(window.canvas, window.game) })
draw(window.canvas, window.game)