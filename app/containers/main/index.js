import React from 'react'

import MenuContainer from '../menu'
import css from './styles.scss'

class MainContainer extends React.Component {

  render() {
    const { children } = this.props
    return (
      <div>
        <MenuContainer />
        <div className={css.content}>
          {children}
        </div>
      </div>
    )
  }
}

MainContainer.propTypes = {
  children: React.PropTypes.element,
}

export default MainContainer
