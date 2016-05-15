import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'

import PigForm from './PigForm'
import PigsList from './PigsList'
import css from './styles.scss'
import SearchBar from '../search'

class PigsPage extends React.Component {
  constructor() {
    super()
    this.state = {
      filterText: '',
    }
  }

  onSearchChange = (text) => {
    this.setState({
      filterText: text,
    })
  }

  render() {
    const { handleSave, pigs } = this.props
    const { filterText } = this.state
    return (
      <div className={css.pigsPage}>
        <div className={css.pigsForm}>
          <PigForm onSubmit={handleSave} />
        </div>
        <div className={css.pigsList}>
          <SearchBar filterText={filterText} onChange={this.onSearchChange} />
          <PigsList pigs={pigs} filterText={filterText} />
        </div>
      </div>
    )
  }
}

PigsPage.propTypes = {
  handleSave: React.PropTypes.func.isRequired,
  pigs: ImmutablePropTypes.map.isRequired,
}

export default PigsPage
