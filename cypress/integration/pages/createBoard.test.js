/// <reference types="cypress" />
import { getBoardFromStorage } from '../../../src/helpers/board'

context('pages/Create Board', () => {
  const mockBoardName = 'Cypress Create Board'
  const mockColumns = 'Cypress, Test, Columns'
  beforeEach(() => {
    cy.visit('/')
  })

  it('should create new board', () => {

    const expectedColumns = mockColumns.split(',')

    cy.get('[data-testid=BoardNameInput]').type(mockBoardName)
    cy.get('[data-testid=BoardColumnsInput]').type(mockColumns)
    cy.get('[data-testid=SubmitBoardButton]').click().should(() => {
      const board = getBoardFromStorage()

      expect(board.columns.length).to.eq(expectedColumns.length)

      board.columns.map((column, index) => {
        expect(column.name).to.eq(expectedColumns[index])
        expect(column).to.have.property('id')
      })
    })
  })
})