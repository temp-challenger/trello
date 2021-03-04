import { v4 as uuidv4 } from 'uuid';

import { getBoardFromStorage } from '../helpers/board'

import { STORAGE_KEY } from '../constants/services'

export const createBoardService = (boardName, columns) => {
  const columnsObject = columns.map(column => {
    return {
      name: column,
      id: uuidv4()
    }
  })

  const cards = []

  const board = {
    id: uuidv4(),
    name: boardName,
    columns: columnsObject,
    cards
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(board))

  return new Promise((res, rej) => {
    return res(getBoardFromStorage().id)
  })
}

export const getBoardService = (id) => {
  const board = getBoardFromStorage()
  return new Promise((res, rej) => {
    return board.id === id
      ? res(board)
      : rej()
  })
}
