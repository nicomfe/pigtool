import React from 'react'
import { connect } from 'react-redux'

import { logout as logoutAction } from '../../stores/auth'
import TopMenu from '../../components/menu/TopMenu'
import LeftMenu from '../../components/menu/LeftMenu'
import ProfileMenu from '../../components/menu/ProfileMenu'
import Title from '../../components/menu/Title'

class MenuContainer extends React.Component {

  handleLogout = () => {
    this.props.logout()
  }

  render() {
    return (
      <div>
        <TopMenu>
          <div>
            <LeftMenu />
            <Title />
            <ProfileMenu handleLogout={this.handleLogout} />
          </div>
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
  logout: () => { dispatch(logoutAction()) },
})

export default connect(mapStateToProps, mapDispatchToProps)(MenuContainer)
