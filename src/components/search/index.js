import React from 'react'

class SearchBar extends React.Component {

  handleSubmit = (event) => {
    event.preventDefault()
  }

  handleChange = () => {
    const { onChange } = this.props
    onChange(this.refs.searchInput.value)
  }

  render() {
    const { filterText = '' } = this.props
    return (
      <form onSubmit={this.handleSubmit} >
        <input
          ref="searchInput"
          type="text"
          placeholder="Buscar..."
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
