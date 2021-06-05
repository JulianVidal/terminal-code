export function minmax (state, depth, turn) {
  if (depth <= 0 || checkWin(state) !== 0) {
    return { num: checkWin(state), state: state }
  }
  if (turn) {
    let max = -Infinity
    let maxState
    let maxDepth = -Infinity
    for (let y = 0; y < state.length; y++) {
      for (let x = 0; x < state[y].length; x++) {
        const nextState = JSON.parse(JSON.stringify(state))
        if (nextState[y][x] === 0) {
          nextState[y][x] = 2
          const val = minmax(nextState, depth - 1, false)
          const oldMax = max
          max = Math.max(max, val.num)
          if (max !== oldMax) maxState = nextState
          if (maxDepth < depth - 1 && max === oldMax) maxState = nextState
        }
      }
    }

    return { num: max, state: maxState }
  } else {
    let min = Infinity
    let minState
    let minDepth = -Infinity

    for (let y = 0; y < state.length; y++) {
      for (let x = 0; x < state[y].length; x++) {
        const nextState = JSON.parse(JSON.stringify(state))
        if (nextState[y][x] === 0) {
          nextState[y][x] = 1
          const val = minmax(nextState, depth - 1, true)
          const oldMin = min
          min = Math.min(min, val.num)
          if (min !== oldMin) {
            minState = nextState
            minDepth = depth - 1
          }
          if (minDepth < depth - 1 && min === oldMin) minState = nextState
        }
      }
    }
    return { num: min, state: minState }
  }
}

window.checkWin = function (board) {
  for (let i = 0; i < board.length; i++) {
    if (board[i][0] !== 0 && board[i][0] === board[i][1] && board[i][1] === board[i][2]) return board[i][0] === 1 ? -1 : 1
    if (board[0][i] !== 0 && board[0][i] === board[1][i] && board[1][i] === board[2][i]) return board[0][1] === 1 ? -1 : 1
  }
  if (board[0][0] !== 0 && board[0][0] === board[1][1] && board[1][1] === board[2][2]) return board[1][1] === 1 ? -1 : 1
  if (board[0][2] !== 0 && board[0][2] === board[1][1] && board[1][1] === board[2][0]) return board[1][1] === 1 ? -1 : 1
  return 0
}