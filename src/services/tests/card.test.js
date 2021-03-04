import { addCardService, editCardService } from '../card'
import { createBoardService } from '../board'

import { getBoardFromStorage } from '../../helpers/board'

// TODO: Add beforeAll, afterEach properly
const mockBoardName = 'trello'
const mockColumns = ['todo', 'progress', 'done']
createBoardService(mockBoardName, mockColumns)

describe('services/card', () => {
  describe('addCardService', () => {
    it('should create new card', () => {
      const currentCardList = getBoardFromStorage().cards
      const mockCardObject = {
        title: 'Mock title',
        description: 'Mock description',
        columnId: 'asd-123'
      }

      return addCardService(mockCardObject).then(newData => {
        expect(newData.cards.length).toBe(currentCardList.length + 1)
        newData.cards.map(item => {
          expect(item).toHaveProperty('id')
          expect(item).toHaveProperty('title')
          expect(item).toHaveProperty('description')
          expect(item).toHaveProperty('columnId')
        })
      })
    })
  })

  describe('editCardService', () => {
    it('should update selected card info', () => {
      const currentCardList = getBoardFromStorage().cards
      const mockUpdatedCard = {
        id: currentCardList[0].id,
        title: 'Updated title',
        description: 'updated description',
        columnId: currentCardList[0].columnId
      }

      return editCardService(mockUpdatedCard).then(resp => {
        expect(resp.cards[0]).toMatchObject({
          id: mockUpdatedCard.id,
          title: mockUpdatedCard.title,
          description: mockUpdatedCard.description,
          columnId: mockUpdatedCard.columnId
        })
        // make sure not adding, but updating card
        expect(resp.cards.length).toBe(currentCardList.length)
      })

    })
  })
})