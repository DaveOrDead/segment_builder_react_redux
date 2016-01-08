import Button from '../components/Button'
import RuleBuilder from './RuleBuilder'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as SegmentBuilderActions from '../actions/segmentbuilder'
import { bindActionCreators } from 'redux'

function mapStateToProps(rules) {
    console.log('map state rules = ', rules);
    return {
        rules: rules
    };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(SegmentBuilderActions, dispatch)
    }
}

class SegmentBuilder extends Component {

    render() {
        const { rules, actions } = this.props;
        console.log('rules = ', rules);

        return (
            <section>

                <div>Added { rules.length } rules</div>

                { rules.map( (rule) =>

                    // <RuleBuilder key={ruleKey} ruleKey={ruleKey} rule={rules[ruleKey]} />
                    <div>{rule.ruleTypeId}</div>

                )}

                <button onClick={ actions.addRule } >Create Rule</button>

            </section>
        )
    }
}

SegmentBuilder.propTypes = {
  rules: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired // formerly dispatch: and func
};

export default connect(mapStateToProps, mapDispatchToProps)(SegmentBuilder);
