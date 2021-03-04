import { STORAGE_KEY } from '../constants/services'

export const getBoardFromStorage = () =>
  JSON.parse(window.localStorage.getItem(STORAGE_KEY))

export const getColumnList = () => getBoardFromStorage().columns

export const getColumnNameById = (columnId) =>
  getColumnList().find(column => column.id === columnId)

export const getCardsByColumn = (columnId) =>
  getBoardFromStorage().cards.filter(item => item.columnId === columnId)
