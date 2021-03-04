import { v4 as uuidv4 } from 'uuid';

import { getBoardFromStorage } from '../helpers/board'

import { STORAGE_KEY } from '../constants/services'

export const addCardService = (card) => {
  const board = getBoardFromStorage()
  board.cards.push({
    id: uuidv4(),
    ...card
  })

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(board))

  return new Promise(res => {
    res(getBoardFromStorage())
  })
}

export const editCardService = (card) => {
  const board = getBoardFromStorage()
  const currentCardIndex = board.cards.findIndex(item => item.id === card.id)
  board.cards[currentCardIndex] = card

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(board))

  return new Promise(res => {
    res(getBoardFromStorage())
  })
}
