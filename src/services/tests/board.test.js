import { createBoardService, getBoardService } from '../board'
import { getBoardFromStorage } from '../../helpers/board'

describe('services / board', () => {
  describe('createBoardService', () => {
    it('should create valid board object', () => {
      const mockBoardName = 'trello'
      const mockColumns = ['todo', 'progress', 'done']

      createBoardService(mockBoardName, mockColumns)

      const result = getBoardFromStorage()

      expect(result).toHaveProperty('id')
      expect(result).toHaveProperty('name')
      expect(result).toHaveProperty('columns')
      result.columns.map(column => {
        expect(column).toHaveProperty('id')
        expect(column).toHaveProperty('name')
      })
    })
  })

  describe('getBoardService', () => {
    it('should return board data', () => {

      const mockBoardName = 'trello'
      const mockColumns = ['todo', 'progress', 'done']

      // Create board first
      createBoardService(mockBoardName, mockColumns)

      const board = getBoardFromStorage()

      return getBoardService(board.id)
        .then(response => {
          expect(response.name).toBe(mockBoardName)
          response.columns.map((column, index) => {
            expect(column.name).toBe(mockColumns[index])
          })
        })
        .catch(e => console.error(e))
    })
  })
})
