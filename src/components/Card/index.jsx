import PropTypes from 'prop-types';

import './style.css'

function Card({ title, description, onClick }) {
  return (
    <div className="card-wrapper" onClick={onClick && onClick}>
      <p className="title">{title}</p>
      <p className="description">{description}</p>
    </div>
  )
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  onClick: PropTypes.func
}

export default Card
