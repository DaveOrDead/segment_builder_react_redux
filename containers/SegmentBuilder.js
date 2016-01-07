import Button from '../components/Button'
import RuleBuilder from './RuleBuilder'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as SegmentBuilderActions from '../actions/segmentbuilder'
import { bindActionCreators } from 'redux'



class SegmentBuilder extends Component {
  render() {
    const { rules, actions } = this.props;
    console.log(rules);
    return <section>
      { Object.keys(rules).map( (ruleKey) => <RuleBuilder key={ruleKey} ruleKey={ruleKey} rule={rules[ruleKey]} /> ) }
      <Button text=" OR... " handleClick={ actions.addRule } />
    </section>
  }
}

// SegmentBuilder.propTypes = {
//   rules: PropTypes.object.isRequired,
//   dispatch: PropTypes.func.isRequired
// };

// SegmentBuilder.contextTypes = {
//     dispatch: ProtoTypes.func
// };

function mapStateToProps(state) {
    console.log('howdy');
    console.log(state.rules);
  return {
    rules: state.rules
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(SegmentBuilderActions, dispatch)
    // dispatch: dispatch
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SegmentBuilder);
