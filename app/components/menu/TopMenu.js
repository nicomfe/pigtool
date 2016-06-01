import React from 'react'
import AppBar from 'react-toolbox/lib/app_bar'

import css from './styles.scss'

class TopMenu extends React.Component {

  render() {
    return (
      <AppBar fixed flat className={css.topMenu}>
        {React.cloneElement(this.props.children, { ...this.props })}
      </AppBar>
    )
  }
}

TopMenu.propTypes = {
  children: React.PropTypes.element,
}

export default TopMenu
