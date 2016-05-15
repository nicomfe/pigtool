import React from 'react'
import { connect } from 'react-redux'

import { logout as logoutAction } from '../../stores/auth'
import TopMenu from '../../components/menu/TopMenu'
import LeftMenu from '../../components/menu/LeftMenu'

class MenuContainer extends React.Component {

  handleLogout = () => {
    this.props.logout()
  }

  render() {
    return (
      <div>
        <TopMenu handleLogout={this.handleLogout}>
          <LeftMenu />
        </TopMenu>
      </div>
    )
  }
}

MenuContainer.propTypes = {
  logout: React.PropTypes.func.isRequired,
}

const mapStateToProps = () => ({

})

const mapDispatchToProps = (dispatch) => ({
  logout: () => {dispatch(logoutAction())},
})

export default connect(mapStateToProps, mapDispatchToProps)(MenuContainer)
