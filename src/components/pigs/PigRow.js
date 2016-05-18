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
    const { tagNumber, birthDate, purchasedPrice, fatherTag, motherTag, boughtDate } = this.props
    const { showContent } = this.state
    return (
      <div className={css.pigRow}>
        <ListItem
          avatar="/images/sow-icon.svg"
          caption={tagNumber}
          className={css.listItem}
          onClick={this.handleItemClick}
        />
        <div className={showContent ? css.showItemContent : css.hideItemContent}>
          <div className={css.column}>
            <div>
              Fecha Nac.: <span><NiceDate date={birthDate} /></span>
            </div>
            <div>
              Padre: <span>{fatherTag}</span>
            </div>
            <div>
              Madre: <span>{motherTag}</span>
            </div>
          </div>
          <div className={css.column}>
            <div>
              Compra: <span><NiceDate date={boughtDate} /></span>
            </div>
            <div>
              Precio: <span>{purchasedPrice}</span>
            </div>
          </div>
        </div>
        <ListDivider className={css.divider} />
      </div>
    )
  }
}

PigRow.propTypes = {
  tagNumber: React.PropTypes.string,
  birthDate: React.PropTypes.string,
  purchasedPrice: React.PropTypes.string,
  fatherTag: React.PropTypes.string,
  motherTag: React.PropTypes.string,
  boughtDate: React.PropTypes.string,
}

export default PigRow
