import { getColumnList, getColumnNameById } from '../../../../helpers/board'

function SelectedCard({
  title,
  onTitleChange,
  description,
  onDescriptionChange,
  onSubmit,
  onCancel,
  currentColumnId,
  onColumnChange,
}) {
  return (
    <form onSubmit={onSubmit}>
      <div>
        <input
          required
          minLength="2"
          value={title}
          onChange={(e) => onTitleChange(e)} />
        <input
          required
          minLength="3"
          value={description}
          onChange={(e) => onDescriptionChange(e)} />
        <select
          id="columns"
          onChange={(e) => onColumnChange(e)}
          value={getColumnNameById(currentColumnId).id}
        >
          {getColumnList().map(({ name, id }) =>
            <option key={id} value={id}>{name}</option>
          )}
        </select>
        <button>Submit</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </form>
  )
}

export default SelectedCard
