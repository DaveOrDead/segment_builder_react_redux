import Dropdown from '../components/Dropdown'
import Button from '../components/Button'
import RuleBuilder from './RuleBuilder'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as SegmentBuilderActions from '../actions/segmentbuilder'
import { bindActionCreators } from 'redux'


function mapStateToProps(state) {

    return {
        rules: state.rules,
        ruleTypes: state.ruleTypes
    };
}


function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(SegmentBuilderActions, dispatch)
    }
}


class SegmentBuilder extends Component {

    render() {

        const { rules, actions, ruleTypes } = this.props;
        let element;

        if(rules.length === 0) {

            element = (
                <Dropdown items={ruleTypes} selectedId="-1" handleSelectionChanged={ (ruleType) => actions.addRule(ruleType.Id) } />
                )
            }

        return (

            <section>

                { rules.map( (rule) =>

                    <RuleBuilder key={rule.id} ruleKey={rule.ruleQualifierId} rule={rule} />

                )}

               { element }


            </section>
        )
    }
}

SegmentBuilder.propTypes = {
    rules: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(SegmentBuilder);
