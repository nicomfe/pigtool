import React from 'react'
import Moment from 'moment'

const NiceDate = (props) => {
  const { date, format } = props
  const moment = date ? new Moment(date) : null

  const getFormattedDate = () => {
    return moment ? moment.format(format) : null
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
