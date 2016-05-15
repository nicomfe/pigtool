import React from 'react'
import AppBar from 'react-toolbox/lib/app_bar'

import css from './styles'

class TopMenu extends React.Component {

  render() {
    const { handleLogout } = this.props
    return (
      <AppBar fixed flat className={css.topMenu}>
        {React.cloneElement(this.props.children, { ...this.props })}
        <a href onClick={ handleLogout }>Logout</a>
      </AppBar>
    )
  }
}

TopMenu.propTypes = {
  handleLogout: React.PropTypes.func.isRequired,
  children: React.PropTypes.element,
}

export default TopMenu
