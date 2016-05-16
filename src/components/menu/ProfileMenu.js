import React from 'react'

import css from './styles.scss'

class ProfileMenu extends React.Component {

  render() {
    const { handleLogout } = this.props
    return (
      <div className={css.profileMenu}>
        <a href onClick={handleLogout}>Logout</a>
      </div>
    )
  }
}

ProfileMenu.propTypes = {
  handleLogout: React.PropTypes.func.isRequired,
}

export default ProfileMenu
