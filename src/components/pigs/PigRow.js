import React from 'react'
import ListItem from 'react-toolbox/lib/list/ListItem'
import ListDivider from 'react-toolbox/lib/list/ListDivider'

import NiceDate from '../NiceDate'
import css from './styles.scss'

class PigRow extends React.Component {

  constructor() {
    super()
    this.state = {
      showContent: false,
    }
  }

  handleItemClick = () => {
    const { showContent } = this.state
    this.setState({
      showContent: !showContent,
    })
  }

  render() {
    const { tagNumber, date, precio } = this.props
    const { showContent } = this.state
    return (
      <div className={css.pigRow} onClick={this.handleItemClick}>
        <ListItem
          avatar="/images/sow-icon.svg"
          caption={tagNumber}
          className={css.listItem}
        />
        <div className={showContent ? css.showItemContent : css.hideItemContent}>
          <div>
            Fecha: <NiceDate date={date} />
          </div>
          <div>
            Precio: {precio}
          </div>
        </div>
        <ListDivider className={css.divider} />
      </div>
    )
  }
}

PigRow.propTypes = {
  tagNumber: React.PropTypes.string,
  date: React.PropTypes.string,
  precio: React.PropTypes.string,
}

export default PigRow
