const prompt = require('prompt-sync')()
const { forEach, adjust, add, clone, tap, prop, cond, equals, not, always, T } = require('ramda')

console.reset = () => process.stdout.write('\033c')

const winConditions = [
  [0,1,2]
]
// board[0] board[1] board[2]
// board[0] board[3] board[6]
// board[0] board[4] board[8]
//
// board[3] board[4] board[5]
// board[6] board[7] board[8]
//
// board[] board[7] board[8]

const checkWin = (board) => {
  // let winner = false
  // const testConditions = (acc, val) => cond([
  //   [equals(true), always(true)],
  //   [equals]
  // ])(val)
  // reduce(testConditions, false, winConditions)
  // forEach(condition => {
  //   equals(board[condition[0]], board[condition[1]])
  //   winner =
  // }, winConditions)
  return true
}

const badMove = board => {
  console.log('Bad square! Try again')
  return board
}
const validMove = (board, square) => board[square - 1] === 0
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

const userMove = (board, position, val) => cond([
  [equals(false), always(badMove(board))],
  [equals(true), always(adjust(add(val), parseInt(position) - 1, board))]
])(validMove(board, position))

const startGame = (board, history) => {
  console.reset()
  let turn = 1
  let quit = false
  while(!quit && checkWin(board)) {
    console.log(renderBoard(board))
    const pos = prompt("Position: ")
    if(pos === 'Q' || pos === null) { quit = true }
    const oldBoard = clone(board)
    board = userMove(board, pos, turn)
    if(not(equals(oldBoard, board))) { console.reset(); turn = turn === 1 ? 2 : 1 }
  }
}


startGame([0,0,0,0,0,0,0,0,0], [])
