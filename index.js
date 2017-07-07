const prompt = require('prompt-sync')()
const { adjust, add, tap, prop, cond, equals, always, T } = require('ramda')

const checkWin = (board) => true
const displaySquare = board => square => cond([
  [equals(1), always('X')],
  [equals(2), always('O')],
  [T, always(' ')]
])(board[square])
const renderBoard = (board) => {
  const dis = displaySquare(board)
  return (
    `
     ${dis(0)}|${dis(1)}|${dis(2)}
     -----
     ${dis(3)}|${dis(4)}|${dis(5)}
     -----
     ${dis(6)}|${dis(7)}|${dis(8)}
    `
  )
}
const userMove = (board, position, val) => adjust(add(val), parseInt(position) - 1, board)
const startGame = (board, history) => {
  var turn = 1
  while(checkWin(board)) {
    console.log(renderBoard(board))
    board = userMove(board, prompt("Position: "), turn)
    turn = turn === 1 ? 2 : 1
  }
}


startGame([0,0,0,0,0,0,0,0,0], [])
