import React from 'react'
import Input from 'react-toolbox/lib/input'

class SearchBar extends React.Component {

  handleSubmit = (event) => {
    event.preventDefault()
  }

  handleChange = (value) => {
    const { onChange } = this.props
    onChange(value)
  }

  render() {
    const { filterText = '' } = this.props
    return (
      <form onSubmit={this.handleSubmit} >
        <Input
          type="text"
          label="Buscar"
          icon="search"
          onChange={this.handleChange}
          value={filterText}
        />
      </form>
    )
  }
}

SearchBar.propTypes = {
  onChange: React.PropTypes.func.isRequired,
  filterText: React.PropTypes.string,
}

export default SearchBar
