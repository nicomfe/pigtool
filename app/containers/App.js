import React from 'react'

const AppContainer = (props) => {
  return (
    <div>
      {props.children}
    </div>
  )
}

AppContainer.propTypes = {
  children: React.PropTypes.element.isRequired,
}

export default AppContainer

