import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { getBoardService } from '../../services/board'
import { addCardService, editCardService } from '../../services/card'
import { getCardsByColumn } from '../../helpers/board'

import Column from '../../components/Column'
import Card from '../../components/Card'

import SelectedCard from "./components/SelectedCard";
import './style.css'

function Board() {
  const { boardId } = useParams()

  const [board, setBoard] = useState({})
  const [cardInfo, setCardInfo] = useState({})
  const [showSelectedCard, setShowSelectedCard] = useState(false)

  useEffect(() => {
    getBoardService(boardId)
      .then(resp => {
        setBoard(resp)
      })
  }, [boardId])

  function handleAddCardButtonClick(columnId) {
    setShowSelectedCard(true)
    setCardInfo({ title: '', description: '', columnId })
  }

  function handleSubmitCard(e) {
    cardInfo.id
      ? submitUpdateCard(e)
      : submitNewCard(e)
  }

  function submitNewCard(e) {
    e.preventDefault()
    setCardInfo({ ...cardInfo, title: '', description: '' })
    setShowSelectedCard(false)
    const newCardObject = {
      columnId: cardInfo.columnId,
      title: cardInfo.title,
      description: cardInfo.description
    }

    addCardService(newCardObject).then(resp => {
      resp && setBoard(resp)
    })
  }

  function submitUpdateCard(e) {
    e.preventDefault()
    const cardObj = {
      id: cardInfo.id,
      title: cardInfo.title,
      description: cardInfo.description,
      columnId: cardInfo.columnId
    }
    editCardService(cardObj)
      .then(resp => {
        setBoard(resp)
        setShowSelectedCard(false)
      })
  }

  function handleCardClick(card) {
    setCardInfo(card)
    setShowSelectedCard(true)
  }

  const renderSelectedCard = () => (
    showSelectedCard &&
    <SelectedCard
      title={cardInfo.title}
      description={cardInfo.description}
      currentColumnId={cardInfo.columnId}
      onSubmit={(e) => handleSubmitCard(e)}
      onCancel={() => setShowSelectedCard(false)}
      onTitleChange={(e) => setCardInfo({ ...cardInfo, title: e.target.value })}
      onDescriptionChange={(e) => setCardInfo({ ...cardInfo, description: e.target.value })}
      onColumnChange={(e) => setCardInfo({ ...cardInfo, columnId: e.target.value })}
    />
  )

  const renderColumnCards = (columnId) =>
    getCardsByColumn(columnId).map(card =>
      <Card
        key={card.id}
        title={card.title}
        description={card.description}
        onClick={() => handleCardClick(card)}
      />
    )

  return (
    <div>
      <p>{board.name} Board</p>
      {renderSelectedCard()}
      <div className="column-list">
        {board && board.columns && board.columns.map(column =>
          <Column key={column.id} id={column.id} name={column.name}>
            <button disabled={showSelectedCard} onClick={() => handleAddCardButtonClick(column.id)}>
              Add Card
            </button>
            {renderColumnCards(column.id)}
          </Column>
        )}
      </div>
    </div>
  )
}

export default Board
