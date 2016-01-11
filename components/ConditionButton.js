import React, { Component, PropTypes } from 'react'

class ConditionButton extends Component {
  render() {
    const { text, handleClick, isDisabled } = this.props;

    return <button className="condition-button" disabled={isDisabled} onClick={handleClick}>{text}</button>;
  }
}

ConditionButton.propTypes = {
  text: PropTypes.string,
  handleClick: PropTypes.func
};

ConditionButton.defaultProps = {
  text: '',
  handleClick: function() {/* NOOP */}
}

export default ConditionButton
