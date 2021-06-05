import { Board } from './Board.js'
import { minmax } from './minmax.js'

export class Game {
  constructor (canvas, board) {
    this.canvas = canvas
    this.board = new Board(canvas, canvas.width, canvas.height, board)
    this.turn = 'cross'
  }

  draw () {
    this.canvas.globalColor = '#EEE'
    this.canvas.background()
    this.board.drawBoard()
  }

  play (x, y) {
    if (this.board[this.turn](x, y)) {
      this.checkWin(this.board.state) ?console.log( this.turn + ' Won') : null
      this.turn = this.turn === 'cross' ? 'circle' : 'cross'
    }
  }

  click (x, y) {
    const boardx = Math.floor(x / (this.canvas.width / 3))
    const boardy = Math.floor(y / (this.canvas.height / 3))

    if (this.board[this.turn](boardx, boardy)) {
      if (this.turn === 'circle') {
        this.turn = 'cross'
      } else {
        console.log(minmax(this.board.state, 9, true))
        this.board.state = minmax(this.board.state, 9, true).state
        this.board.drawBoard()
        this.checkWin(this.board.state) ? console.log(' Won') : null
      }
    }

  }

  checkWin (board) {
    for (let i = 0; i < board.length; i++) {
      if (board[i][0] !== 0 && board[i][0] === board[i][1] && board[i][1] === board[i][2]) return true
      if (board[0][i] !== 0 && board[0][i] === board[1][i] && board[1][i] === board[2][i]) return true
    }
    if (board[0][0] !== 0 && board[0][0] === board[1][1] && board[1][1] === board[2][2]) return true
    if (board[0][2] !== 0 && board[0][2] === board[1][1] && board[1][1] === board[2][0]) return true
    return false
  }
}
