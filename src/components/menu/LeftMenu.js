import React from 'react'
import Drawer from 'react-toolbox/lib/drawer'
import Button from 'react-toolbox/lib/button'

import css from './styles.scss'

class LeftMenu extends React.Component {
  constructor() {
    super()
    this.state = {
      active: false,
    }
  }

  handleToggle = () => {
    this.setState({
      active: !this.state.active,
    })
  }

  render() {
    const { active } = this.state
    return (
      <div>
        <Button flat raised onClick={this.handleToggle} icon="menu" className={css.menuButton} />
        <Drawer className={css.leftMenuContent} active={active} onOverlayClick={this.handleToggle}>
          <a label="Chanchas" href="/sows">Chanchas</a>
        </Drawer>
      </div>
    )
  }
}

export default LeftMenu
