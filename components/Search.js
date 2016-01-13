import React, { Component, PropTypes } from 'react'

class Search extends Component {
  render() {
    const { value, handleChange, isHidden } = this.props;
    return <input type="search" value={value} placeholder="I am a search" onChange={(event) => handleChange(event.target.value)} hidden={isHidden} />;
  }
}

Search.propTypes = {
  value: React.PropTypes.string,
  handleChange: React.PropTypes.func
};

Search.defaultProps = {
  value: '',
  handleChange: function() {/* NOOP */}
}

export default Search
