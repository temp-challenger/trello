import PropTypes from 'prop-types';

import './style.css'

function Column({ name, children }) {
  return (
    <div className="column-wrapper">
      <p className="label">{name}</p>
      {children}
    </div>
  )
}

Column.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.node
}

export default Column
