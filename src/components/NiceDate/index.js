import React from 'react'
import Moment from 'moment'

const NiceDate = (props) => {
  const { date, format } = props
  const moment = new Moment(date)

  const getFormattedDate = () => {
    return moment.format(format)
  }

  return <span>{getFormattedDate()}</span>
}

NiceDate.propTypes = {
  date: React.PropTypes.string,
  format: React.PropTypes.string,
}

NiceDate.defaultProps = {
  format: 'DD/MM/YYYY',
}

export default NiceDate
