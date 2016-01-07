import React, { Component, PropTypes } from 'react'

class Button extends Component {
  render() {
    const { text, handleClick } = this.props;
    return <button onClick={handleClick}>{text}</button>;
  }
}

Button.propTypes = {
  text: PropTypes.string,
  handleClick: PropTypes.func
};

Button.defaultProps = {
  text: '',
  handleClick: function() {/* NOOP */}
}

export default Button
