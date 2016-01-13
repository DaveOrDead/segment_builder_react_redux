import React, { Component, PropTypes } from 'react'

class Textbox extends Component {
  render() {
    const { value, handleChange, isHidden } = this.props;
    return <input type="text" value={value} onChange={(event) => handleChange(event.target.value)} hidden={isHidden} />;
  }
}

Textbox.propTypes = {
  value: React.PropTypes.string,
  handleChange: React.PropTypes.func
};

Textbox.defaultProps = {
  value: '',
  handleChange: function() {/* NOOP */}
}

export default Textbox
