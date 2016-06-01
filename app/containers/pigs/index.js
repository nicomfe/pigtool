import React from 'react'
import { connect } from 'react-redux'
import ImmutablePropTypes from 'react-immutable-proptypes'

import { fetchPigs, getAllPigs, createSow } from '../../stores/pigs'
import PigsPage from '../../components/pigs/PigsPage'

class PigsContainer extends React.Component {

  componentWillMount() {
    const { getPigs } = this.props
    getPigs()
  }

  handleSave = (data) => {
    const { addSow } = this.props
    addSow(data)
  }

  render() {
    const { pigs } = this.props
    return <PigsPage handleSave={this.handleSave} pigs={pigs} />
  }
}

PigsContainer.propTypes = {
  getPigs: React.PropTypes.func.isRequired,
  pigs: ImmutablePropTypes.map,
  addSow: React.PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
  return {
    pigs: getAllPigs(state),
  }
}

const mapDispatchToProps = (dispatch) => ({
  getPigs: () => { dispatch(fetchPigs()) },
  addSow: (data) => { dispatch(createSow(data)) },
})

export default connect(mapStateToProps, mapDispatchToProps)(PigsContainer)
