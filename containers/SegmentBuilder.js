import Dropdown from '../components/Dropdown'
import Button from '../components/Button'
import RuleBuilder from './RuleBuilder'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as SegmentBuilderActions from '../actions/segmentbuilder'
import { bindActionCreators } from 'redux'


function mapStateToProps(state) {

    return {
        rules: state.RuleGroups[0].Rules,
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
                <Dropdown items={ruleTypes} defaultValue={ruleTypes[0].id} handleSelectionChanged={ (ruleType) => actions.addInitialRule(ruleType.id, 0) } />
                )
            }

        return (

            <section>

                { rules.map( (rule) =>

                    <RuleBuilder key={rule.id} rule={rule} />

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
