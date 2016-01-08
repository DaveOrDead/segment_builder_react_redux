import React, { Component, PropTypes } from 'react'

class Dropdown extends Component {
  render() {

    const { items, selectedId, getId, getName } = this.props;

    return <select onChange={(event) => this.change(event)} value={selectedId}>
        <option value="-1" disabled>Define a rule based on...</option>
      { items.map((item) =>
          <option key={getId(item)} value={getId(item)}>{getName(item)}</option>
        ) }
    </select>;
  }

  change(event) {
    for(var i in this.props.items) {
      var item = this.props.items[i];
      if(item.id != event.target.value) continue;

      this.props.handleSelectionChanged(item);
      return;
    }
  }
}

Dropdown.propTypes = {
  items: PropTypes.array,
  selectedId: PropTypes.string,
  getId: PropTypes.func,
  getName: PropTypes.func,
  handleSelectionChanged: PropTypes.func
};

Dropdown.defaultProps = {
  items: [],
  selectedId: undefined,
  getId: function (item) { return item.id; },
  getName: function (item) { return item.name; },
  handleSelectionChanged: function(item) { /* NOOP */ }
};

export default Dropdown
