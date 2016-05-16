import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import List from 'react-toolbox/lib/list/List'

import PigRow from './PigRow'
import css from './styles.scss'

class PigsList extends React.Component {

  render() {
    const { pigs, filterText } = this.props
    return (
      <List className={css.pigsList} selectable ripple>
        {pigs.valueSeq()
          .filter((pig) => filterText === '' || pig.get('tagNumber').startsWith(filterText))
          .map((pig) =>
            <PigRow
              key={pig.get('id')}
              tagNumber={pig.get('tagNumber')}
              date={pig.get('date')}
              precio={pig.get('purchasedPrice')}
            />
        )}
      </List>
    )
  }
}

PigsList.propTypes = {
  pigs: ImmutablePropTypes.map.isRequired,
  filterText: React.PropTypes.string,
}

export default PigsList
