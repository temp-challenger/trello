import { useState } from 'react'
import { useHistory } from "react-router-dom";

import { createBoardService } from '../../services/board'

import { PAGE_URLS } from '../../constants/url'

import './style.css'

function CreateBoard() {
  let history = useHistory();

  const [boardName, setBoardName] = useState('')
  const [columns, setColumns] = useState('')

  function handleCreateBoardClick(e) {
    e.preventDefault()
    const columnArray = columns.split(',')
    createBoardService(boardName, columnArray)
      .then(createdBoardId => {
        if (createdBoardId) {
          const redirectUrl = PAGE_URLS.BOARD.replace(':boardId', createdBoardId)
          history.push(redirectUrl)
        }
      })
      .catch(e => {
        window.location.reload()
      })
  }

  return (
    <form noValidate={false} onSubmit={handleCreateBoardClick}>
      <div className="board-input-wrapper">
        <input
          required
          minLength="3"
          placeholder="Board Name"
          value={boardName}
          onChange={(e) => setBoardName(e.target.value)}
          data-testid="BoardNameInput"
        />
        <label>Please seperate board columns with ,</label>
        <textarea
          required
          minLength="2"
          placeholder="Todo, Progress, Done"
          value={columns}
          onChange={(e) => setColumns(e.target.value)}
          data-testid="BoardColumnsInput"
        />
        <button type="submit" data-testid="SubmitBoardButton">Create Board</button>
      </div>
    </form>
  )
}

export default CreateBoard
